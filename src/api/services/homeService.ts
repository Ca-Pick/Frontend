import type { RecommendedResponse, RecommendedDessert } from '../../types/api';
import { publicClient } from '../client';

// 홈화면 카테고리별 큐레이션 데이터 조회
export const getHomeCurations = async (): Promise<RecommendedResponse> => {
  const response = await publicClient.get('/api/reference/recommend');
  return response.data;
};

// 카테고리별 큐레이션 데이터만 추출
export const getCurationByCategory = async (
  category: 'birthday' | 'celebration' | 'academic'
): Promise<RecommendedDessert[]> => {
  const data = await getHomeCurations();
  return data.data[category] || [];
};
