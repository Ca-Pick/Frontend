import type {
  SavedCakesResponse,
  SaveCakeResponse,
  DeleteCakeResponse,
} from '../../types/api';
import { authClient } from '../client';

// 저장한 케이크 목록 조회
export const getSavedCakes = async (): Promise<SavedCakesResponse> => {
  // 비회원이어도(하트 상태 확인 차 항상 호출되므로) 401 시 재발급/리다이렉트 없이 조용히 실패
  const response = await authClient.get('/save', { skipAuthRedirect: true } as any);
  return response.data;
};

// 케이크 저장 (좋아요)
export const saveCake = async (referenceId: number): Promise<SaveCakeResponse> => {
  const response = await authClient.post(`/save/${referenceId}/like`, {});
  return response.data;
};

// 케이크 저장 취소 (좋아요 취소)
export const unsaveCake = async (referenceId: number): Promise<DeleteCakeResponse> => {
  const response = await authClient.delete(`/save/${referenceId}/like`);
  return response.data;
};
