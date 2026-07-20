// API 연동 시 이 파일의 데이터는 API 응답으로 대체됩니다
export const DETAIL_DUMMY_DATA = {
  success: true,
  data: {
    address: "서울특별시 강남구 강남대로122길 30-10 1층 달꼬미 논현점",
    cakelists: [
      {
        cakeId: 3,
        instagramEmbed: "https://www.instagram.com/p/DaR64RlMKE1/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
      },
      {
        cakeId: 4,
        instagramEmbed: "https://www.instagram.com/p/DY1O9Vlsp1G/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
      }
    ],
    instagramEmbed: "https://www.instagram.com/p/DaR64RlMKE1/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    instagramUrl: "https://www.instagram.com/dalccomi/",
    latitude: 37.51,
    longitude: 127.02,
    name: "달꼬미",
    tags: [
      "강남",
      "친구",
      "연인",
      "기본형",
      "파스텔",
      "심플",
      "귀여운",
      "리본",
      "핑크리본",
      "꽃",
      "플라워",
      "생화",
      "장미",
      "핑크",
      "화이트",
      "크림",
      "물방울크림",
      "버블크림",
      "레터링",
      "생일",
      "러블리",
      "단아한",
      "미니멀"
    ]
  },
  timestamp: "2026-07-17T02:30:06"
};

export type DetailData = typeof DETAIL_DUMMY_DATA;
export type CakeDetail = {
  address: string;
  cakelists: Array<{
    cakeId: number;
    instagramEmbed: string;
  }>;
  instagramEmbed: string;
  instagramUrl: string;
  latitude: number;
  longitude: number;
  name: string;
  price: string;
  schedule: string;
  tags: string[];
};
