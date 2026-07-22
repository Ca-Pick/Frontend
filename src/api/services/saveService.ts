import type {
  SavedCakesResponse,
  SaveCakeResponse,
  DeleteCakeResponse,
} from '../../types/api';
import { authClient } from '../client';

// 저장한 케이크 목록 조회
export const getSavedCakes = async (): Promise<SavedCakesResponse> => {
  const response = await authClient.get('/save');
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
