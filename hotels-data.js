/* Dates updated for the current itinerary; no historical prices carried forward. */
const HOTELS = [
  {
    "id": 0,
    "city": "hiroshima",
    "cn": "广岛喜来登大酒店",
    "en": "Sheraton Grand Hiroshima Hotel",
    "region": "广岛｜JR广岛站",
    "room": "Deluxe Twin／35㎡",
    "feature": "JR直连，豪华配套",
    "official": "https://www.marriott.com/en-us/hotels/hijsi-sheraton-grand-hiroshima-hotel/overview/",
    "ikyu": "https://www.ikyu.com/00001701/",
    "imageSource": "https://www.ikyu.com/00001701/",
    "ctripId": "705153",
    "stays": [
      [
        "2026-11-23",
        "2026-11-27"
      ],
      [
        "2026-12-16",
        "2026-12-17"
      ]
    ],
    "note": "首段与末段回访可选择同一家酒店；车站附近方便两次城际移动。"
  },
  {
    "id": 1,
    "city": "hiroshima",
    "cn": "广岛南门格兰比亚大酒店",
    "en": "Hotel Granvia Hiroshima South Gate",
    "region": "广岛｜广岛站南口",
    "room": "Superior Twin／30㎡",
    "feature": "较新，站上商业极方便",
    "official": "https://jrwest-hotels.jp/granvia-hiroshima-southgate/en/stay/",
    "ikyu": "https://www.ikyu.com/00003243/",
    "imageSource": "https://www.ikyu.com/00003243/",
    "ctripId": "122848015",
    "stays": [
      [
        "2026-11-23",
        "2026-11-27"
      ],
      [
        "2026-12-16",
        "2026-12-17"
      ]
    ],
    "note": "首段与末段回访可选择同一家酒店；车站附近方便两次城际移动。"
  },
  {
    "id": 2,
    "city": "hiroshima",
    "cn": "广岛希尔顿酒店",
    "en": "Hilton Hiroshima",
    "region": "广岛｜中心街区",
    "room": "Deluxe Twin／35㎡",
    "feature": "餐饮及市中心步行较好",
    "official": "https://www.hilton.com/en/hotels/hijshhi-hilton-hiroshima/",
    "ikyu": "https://www.ikyu.com/00002983/",
    "imageSource": "https://www.ikyu.com/00002983/",
    "ctripId": "97964943",
    "stays": [
      [
        "2026-11-23",
        "2026-11-27"
      ],
      [
        "2026-12-16",
        "2026-12-17"
      ]
    ],
    "note": "首段与末段回访可选择同一家酒店；车站附近方便两次城际移动。"
  },
  {
    "id": 3,
    "city": "takeo",
    "cn": "御宿竹林亭",
    "en": "Onyado Chikurintei",
    "region": "佐贺武雄｜御船山",
    "room": "和洋室 / 78㎡；两张床",
    "feature": "高级庭园旅馆，通常含早晚餐",
    "official": "https://www.chikurintei.jp/en/",
    "ikyu": "https://www.ikyu.com/00000735/",
    "imageSource": "https://www.ikyu.com/00000735/",
    "ctripId": "1498446",
    "stays": [
      [
        "2026-11-27",
        "2026-12-01"
      ]
    ],
    "note": "四晚温泉住宿，先确认晚餐变化；可在武雄市区酒店与高级旅馆间拆住。"
  },
  {
    "id": 4,
    "city": "takeo",
    "cn": "乌拉里武雄花园露台温泉度假酒店",
    "en": "URARI TAKEO Garden Terrace Spa Resorts",
    "region": "佐贺武雄｜温泉区",
    "room": "温泉双床／约50㎡",
    "feature": "真双床较易识别，需车接驳",
    "official": "https://www.uraritakeo.jp/",
    "ikyu": "https://www.ikyu.com/00003079/",
    "imageSource": "https://www.ikyu.com/00003079/",
    "ctripId": "6077950",
    "stays": [
      [
        "2026-11-27",
        "2026-12-01"
      ]
    ],
    "note": "四晚温泉住宿，先确认晚餐变化；可在武雄市区酒店与高级旅馆间拆住。"
  },
  {
    "id": 5,
    "city": "takeo",
    "cn": "御船山乐园酒店",
    "en": "Mifuneyama Rakuen Hotel",
    "region": "佐贺武雄｜御船山",
    "room": "西式Twin极少房",
    "feature": "红叶活动与温泉体验",
    "official": "https://mifuneyama.co.jp/en/honkan.html",
    "ikyu": "https://www.ikyu.com/00031090/",
    "imageSource": "https://www.ikyu.com/00031090/",
    "ctripId": "1498444",
    "stays": [
      [
        "2026-11-27",
        "2026-12-01"
      ]
    ],
    "note": "四晚温泉住宿，先确认晚餐变化；可在武雄市区酒店与高级旅馆间拆住。"
  },
  {
    "id": 6,
    "city": "nagasaki",
    "cn": "长崎万豪酒店",
    "en": "Nagasaki Marriott Hotel",
    "region": "长崎｜JR长崎站",
    "room": "2 Double／约36㎡",
    "feature": "两张双人床；高便利",
    "official": "https://www.marriott.com/en-us/hotels/ngsmc-nagasaki-marriott-hotel/overview/",
    "ikyu": "https://www.ikyu.com/00003191/",
    "imageSource": "https://www.ikyu.com/00003191/",
    "ctripId": "115931073",
    "stays": [
      [
        "2026-12-01",
        "2026-12-03"
      ]
    ],
    "note": "两晚住宿，以美术馆参观与跨城移动便利为重点。"
  },
  {
    "id": 7,
    "city": "nagasaki",
    "cn": "长崎格洛弗街英迪格酒店",
    "en": "Hotel Indigo Nagasaki Glover Street",
    "region": "长崎｜南山手",
    "room": "Standard Twin／约31㎡",
    "feature": "红砖历史建筑改造，需打车",
    "official": "https://nagasaki.hotelindigo.com/en/",
    "ikyu": "https://www.ikyu.com/00003252/",
    "imageSource": "https://www.ikyu.com/00003252/",
    "ctripId": "120039678",
    "stays": [
      [
        "2026-12-01",
        "2026-12-03"
      ]
    ],
    "note": "两晚住宿，以美术馆参观与跨城移动便利为重点。"
  },
  {
    "id": 8,
    "city": "nagasaki",
    "cn": "长崎希尔顿酒店",
    "en": "Hilton Nagasaki",
    "region": "长崎｜JR长崎站",
    "room": "Deluxe Twin／约31㎡",
    "feature": "便捷、硬件稳定",
    "official": "https://www.hilton.com/en/hotels/ngsjphi-hilton-nagasaki/",
    "ikyu": "https://www.ikyu.com/00002935/",
    "imageSource": "https://www.ikyu.com/00002935/",
    "ctripId": "76114194",
    "stays": [
      [
        "2026-12-01",
        "2026-12-03"
      ]
    ],
    "note": "两晚住宿，以美术馆参观与跨城移动便利为重点。"
  },
  {
    "id": 9,
    "city": "beppu",
    "cn": "星野集团 界 别府",
    "en": "Hoshino Resorts KAI Beppu",
    "region": "大分别府｜北滨",
    "room": "海景双床／床型逐档核实",
    "feature": "隈研吾，海景+温泉街，餐食组合重要",
    "official": "https://hoshinoresorts.com/en/hotels/kaibeppu/",
    "ikyu": null,
    "imageSource": "https://hoshinoresorts.com/en/hotels/kaibeppu/",
    "ctripId": "72321998",
    "stays": [
      [
        "2026-12-03",
        "2026-12-07"
      ]
    ],
    "note": "四晚可拆为界 别府与晴海各两晚；拆住后须重选查询日期。"
  },
  {
    "id": 10,
    "city": "beppu",
    "cn": "潮之宿晴海酒店",
    "en": "AMANE RESORT SEIKAI",
    "region": "大分别府｜海岸",
    "room": "Resort Twin／约51㎡",
    "feature": "海景私汤，JR稍远",
    "official": "https://www.amane-resort.com/",
    "ikyu": "https://www.ikyu.com/00001816/",
    "imageSource": "https://www.ikyu.com/00001816/",
    "ctripId": "1498634",
    "stays": [
      [
        "2026-12-03",
        "2026-12-07"
      ]
    ],
    "note": "四晚可拆为界 别府与晴海各两晚；拆住后须重选查询日期。"
  },
  {
    "id": 11,
    "city": "beppu",
    "cn": "别府全日空洲际度假酒店",
    "en": "ANA InterContinental Beppu Resort & Spa",
    "region": "大分别府｜山坡",
    "room": "Classic Twin／约49㎡",
    "feature": "大型豪华度假设施，市区需车",
    "official": "https://anaicbeppu.com/",
    "ikyu": "https://www.ikyu.com/00002626/",
    "imageSource": "https://www.ikyu.com/00002626/",
    "ctripId": "27391867",
    "stays": [
      [
        "2026-12-03",
        "2026-12-07"
      ]
    ],
    "note": "四晚可拆为界 别府与晴海各两晚；拆住后须重选查询日期。"
  },
  {
    "id": 12,
    "city": "kagoshima",
    "cn": "鹿儿岛喜来登酒店",
    "en": "Sheraton Kagoshima",
    "region": "鹿儿岛｜市电沿线",
    "room": "Deluxe 2 Double／两张双人床",
    "feature": "新酒店，靠电车、樱岛景观",
    "official": "https://www.marriott.com/en-us/hotels/kojsk-sheraton-kagoshima/overview/",
    "ikyu": "https://www.ikyu.com/00003045/",
    "imageSource": "https://www.ikyu.com/00003045/",
    "ctripId": "105156451",
    "stays": [
      [
        "2026-12-11",
        "2026-12-16"
      ]
    ],
    "note": "连续五晚，雾岛景点包车往返；优先核对连续入住的独立双床。"
  },
  {
    "id": 13,
    "city": "kagoshima",
    "cn": "鹿儿岛城山酒店",
    "en": "SHIROYAMA HOTEL kagoshima",
    "region": "鹿儿岛｜城山高地",
    "room": "樱岛View Twin／约27㎡",
    "feature": "景观+温泉出色，但市区需接驳",
    "official": "https://www.shiroyama-g.co.jp/stay/room/",
    "ikyu": "https://www.ikyu.com/00000213/",
    "imageSource": "https://www.ikyu.com/00000213/",
    "ctripId": "705443",
    "stays": [
      [
        "2026-12-11",
        "2026-12-16"
      ]
    ],
    "note": "连续五晚，雾岛景点包车往返；优先核对连续入住的独立双床。"
  },
  {
    "id": 14,
    "city": "fukuoka",
    "cn": "福冈丽思卡尔顿酒店",
    "en": "The Ritz-Carlton, Fukuoka",
    "region": "福冈｜天神大名",
    "room": "Deluxe 双床／约50㎡",
    "feature": "豪华酒店服务，核心商业区",
    "official": "https://www.ritzcarlton.com/en/hotels/fukrz-the-ritz-carlton-fukuoka/overview/",
    "ikyu": "https://www.ikyu.com/00003070/",
    "imageSource": "https://www.ikyu.com/00003070/",
    "ctripId": "106966995",
    "stays": [
      [
        "2026-12-07",
        "2026-12-11"
      ]
    ],
    "note": "四晚城市基地，需兼顾博多站与市内建筑游览。"
  },
  {
    "id": 15,
    "city": "fukuoka",
    "cn": "福冈一号酒店",
    "en": "ONE FUKUOKA HOTEL",
    "region": "福冈｜天神站",
    "room": "Terrace Twin／40㎡＋13㎡",
    "feature": "建筑与设计感强，地铁直连",
    "official": "https://onefukuokahotel.jp/en/rooms/terrace-twin/",
    "ikyu": "https://www.ikyu.com/00003268/",
    "imageSource": "https://www.ikyu.com/00003268/",
    "ctripId": "123465122",
    "stays": [
      [
        "2026-12-07",
        "2026-12-11"
      ]
    ],
    "note": "四晚城市基地，需兼顾博多站与市内建筑游览。"
  },
  {
    "id": 16,
    "city": "fukuoka",
    "cn": "博多都酒店",
    "en": "Miyako Hotel Hakata",
    "region": "福冈｜JR博多站",
    "room": "Superior Twin／约30㎡",
    "feature": "交通最便利，顶层温泉",
    "official": "https://www.miyakohotels.ne.jp/hakata/",
    "ikyu": "https://www.ikyu.com/00002619/",
    "imageSource": "https://www.ikyu.com/00002619/",
    "ctripId": "705197",
    "stays": [
      [
        "2026-12-07",
        "2026-12-11"
      ]
    ],
    "note": "四晚城市基地，需兼顾博多站与市内建筑游览。"
  }
];
