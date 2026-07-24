import type {
  SearchRequest,
  SearchResponse,
  RecommendedResponse,
  DetailResponse,
  DetailTagsResponse,
} from '../../types/api';
import { publicClient, authClient } from '../client';

// 1️⃣ 케이크 검색
export const searchDesserts = async (params?: SearchRequest): Promise<SearchResponse> => {
  const response = await publicClient.post('/reference/search', params || {});
  return response.data;
};

// 2️⃣ 추천 케이크 조회 (카테고리별)
export const getRecommendedDesserts = async (): Promise<RecommendedResponse> => {
  try {
    // authClient 사용 (쿠키 자동 전송 → 저장 상태 포함)
    const response = await authClient.get('/reference/recommend');
    return response.data;
  } catch (error) {
    // 오류 시 publicClient로 fallback (쿠키 없이 조회)
    const response = await publicClient.get('/reference/recommend');
    return response.data;
  }
};

// 3️⃣ 상세정보 조회
export const getDessertDetail = async (cakeId: number): Promise<DetailResponse> => {
  const response = await publicClient.get(`/reference/${cakeId}`);
  return response.data;
};

// 4️⃣ 디테일 태그 조회 (필터링용)
export const getDetailTags = async (): Promise<DetailTagsResponse> => {
  const response = await publicClient.get('/reference/detailtags');
  return response.data;
};
