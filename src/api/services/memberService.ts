import type { UserInfoResponse } from '../../types/api';
import { authClient } from '../client';

// 마이페이지 조회 (내 정보)
export const getMyInfo = async (): Promise<UserInfoResponse> => {
  const response = await authClient.get('/user/me');
  return response.data;
};
