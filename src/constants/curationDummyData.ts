// API 연동 시 이 파일의 데이터는 API 응답으로 대체됩니다
export const CURATION_DUMMY_DATA = {
  data: {
    academic: [],
    birthday: [
      {
        cakeId: 1,
        instagramEmbed: "https://www.instagram.com/p/DFxF4K8yG6D/"
      },
      {
        cakeId: 3,
        instagramEmbed: "https://www.instagram.com/p/DaR64RlMKE1/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
      }
    ],
    celebration: [
      {
        cakeId: 2,
        instagramEmbed: "https://www.instagram.com/p/DaDC3ckTr7v/?utm_source=ig_web_copy_link"
      },
      {
        cakeId: 4,
        instagramEmbed: "https://www.instagram.com/p/DY1O9Vlsp1G/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
      }
    ]
  }
};

export type CurationData = typeof CURATION_DUMMY_DATA;
export type CakeItem = {
  cakeId: number;
  instagramEmbed: string;
};
