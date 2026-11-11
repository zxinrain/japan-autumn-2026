"""Publish an all-day iCalendar feed from the current public itinerary."""
import argparse
from datetime import date, datetime, timedelta, timezone
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SITE = "https://zxinrain.github.io/japan-autumn-2026/"


def escape(value):
    return str(value).replace("\\", "\\\\").replace("\r\n", "\n").replace("\r", "\n").replace("\n", "\\n").replace(";", "\\;").replace(",", "\\,")


def fold(line):
    parts = []
    chunk = ""
    size = 0
    for char in line:
        length = len(char.encode("utf-8"))
        if size + length > 75:
            parts.append(chunk)
            chunk, size = " ", 1
        chunk += char
        size += length
    return "\r\n".join([*parts, chunk])


def build(trip, timestamp):
    start = date.fromisoformat(trip["departure"])
    lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Japan Autumn 2026//Travel Itinerary//ZH",
             "CALSCALE:GREGORIAN", "X-WR-CALNAME:广岛与北九州 2026"]
    for index, original in enumerate(trip["days"]):
        day = start + timedelta(days=index)
        entry = original
        if index == trip["keyDays"]["kunisaki"] and trip.get("defaultKunisakiPlan") == "beppu":
            entry = {**original, **trip["alternative"]}
        city = entry["city"]
        if entry["title"].startswith("宫岛完整日"):
            city = "宫岛／广岛"
        elif index == trip["keyDays"]["kunisaki"] and trip.get("defaultKunisakiPlan") != "beppu":
            city = "国东半岛"
        elif city == "香港":
            city = "福冈 → 香港"
        summary = f"{city}｜{entry['title']}"
        stay = next((s["cn"] for s in trip["stays"] if s["in"] <= day.isoformat() < s["out"]), None)
        url = SITE + "#itinerary?date=" + day.isoformat()
        description = [f"{label}｜{entry[key]}" for key, label in (
            ("am", "上午"), ("noon", "中午"), ("pm", "下午"), ("night", "夜晚"), ("transport", "交通")
        ) if entry.get(key)]
        if stay:
            description.append(f"住宿｜{stay}")
        description.append(url)
        lines.extend([
            "BEGIN:VEVENT",
            f"UID:japan-autumn-2026-day-{index + 1}@zxinrain.github.io",
            f"DTSTAMP:{timestamp}",
            f"LAST-MODIFIED:{timestamp}",
            f"DTSTART;VALUE=DATE:{day:%Y%m%d}",
            f"DTEND;VALUE=DATE:{day + timedelta(days=1):%Y%m%d}",
            f"SUMMARY:{escape(summary)}",
            f"DESCRIPTION:{escape(chr(10).join(description))}",
            f"URL:{url}",
            "TRANSP:TRANSPARENT",
            "END:VEVENT",
        ])
    return ("\r\n".join(map(fold, [*lines, "END:VCALENDAR"])) + "\r\n").encode("utf-8")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("output", type=Path, nargs="?", default=ROOT / "itinerary.ics")
    args = parser.parse_args()
    trip = json.loads((ROOT / "trip.json").read_text())
    timestamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    args.output.write_bytes(build(trip, timestamp))
