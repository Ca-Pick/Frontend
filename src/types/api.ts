// 조회 요청
export type SearchRequest = {
  place?: string;
  target?: string;
  shape?: string;
  color?: string;
  mood?: string;
  detailTags?: string[];
};

// 검색 관련 타입
export type CakeData = {
  cakeId: number;
  instagramEmbed: string;
  saved: boolean;
  cakeDetailTags: string[];
  cakeDetailCount: number;
};

// 조회 결과
export type SearchResponse = {
  success: boolean;
  data: {
    cakes: CakeData[];
    tags: string[];
  };
  timestamp: string;
};

// 큐레이션의 추천 케이크 타입
export type RecommendedDessert = {
  cakeId: number;
  instagramEmbed: string;
  saved: boolean;
};

// 추천 큐레이션
export type RecommendedResponse = {
  success: boolean;
  data: {
    academic: RecommendedDessert[];
    birthday: RecommendedDessert[];
    celebration: RecommendedDessert[];
  };
  timestamp: string;
};

// 상세정보 타입
export type DessertDetail = {
  cakeId: number;
  name: string;
  address: string;
  instagramEmbed: string;
  instagramUrl: string;
  latitude: number;
  longitude: number;
  saved: boolean;
  tags: string[];
  cakelists: Array<{
    cakeId: number;
    instagramEmbed: string;
    saved: boolean;
  }>;
};

export type DetailResponse = {
  success: boolean;
  data: DessertDetail;
  timestamp: string;
};

// 필터 태그 타입
export type DetailTagsResponse = {
  success: boolean;
  data: {
    decorations: string[];
  };
  timestamp: string;
};

// 기존 호환성을 위한 별칭
export type ApiResponse = SearchResponse;

// 저장함 관련 타입
export type SavedCake = {
  cakeId: number;
  instagramEmbed: string;
  cakedetailtags: string[];
};

export type SavedCakesResponse = {
  success: boolean;
  data: {
    cakes: SavedCake[];
  };
  timestamp: string;
};

export type SaveCakeResponse = {
  success: boolean;
  data: {
    cakes: SavedCake[];
  };
  timestamp: string;
};

export type DeleteCakeResponse = {
  success: boolean;
  timestamp: string;
};

export type SaveApiError = {
  success: false;
  code: 'UNAUTHENTICATED' | 'REFERENCE_NOT_FOUND' | 'INTERNAL_SERVER_ERROR';
  message: string;
  timestamp: string;
};
