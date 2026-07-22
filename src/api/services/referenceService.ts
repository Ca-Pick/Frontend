import type {
  SearchRequest,
  SearchResponse,
  RecommendedResponse,
  DetailResponse,
  DetailTagsResponse,
} from '../../types/api';
import { publicClient } from '../client';

// 1️⃣ 케이크 검색
export const searchDesserts = async (params?: SearchRequest): Promise<SearchResponse> => {
  const response = await publicClient.post('/reference/search', params || {});
  return response.data;
};

// 2️⃣ 추천 케이크 조회 (카테고리별)
export const getRecommendedDesserts = async (): Promise<RecommendedResponse> => {
  const response = await publicClient.get('/reference/recommend');
  return response.data;
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
