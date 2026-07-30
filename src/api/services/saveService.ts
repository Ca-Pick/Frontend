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

// 케이크 저장 (좋아요) - 401은 HeartToggle이 자체 처리(로그인 이동 + pendingHeartAction 기록)하므로
// 인터셉터의 자동 재발급/리다이렉트는 꺼서 중복 이동을 막는다
export const saveCake = async (referenceId: number): Promise<SaveCakeResponse> => {
  const response = await authClient.post(`/save/${referenceId}/like`, {}, { skipAuthRedirect: true } as any);
  return response.data;
};

// 케이크 저장 취소 (좋아요 취소) - 이유는 saveCake 참고
export const unsaveCake = async (referenceId: number): Promise<DeleteCakeResponse> => {
  const response = await authClient.delete(`/save/${referenceId}/like`, { skipAuthRedirect: true } as any);
  return response.data;
};
