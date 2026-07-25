import { authClient } from '../client';
import { setAuthenticated } from '../../utils/authState';

// 로그아웃
export const logout = async (): Promise<void> => {
  try {
    await authClient.post('/auth/logout');
  } finally {
    setAuthenticated(false);
  }
};

// 회원탈퇴
export const withdraw = async (): Promise<void> => {
  await authClient.delete('/user/me');
  setAuthenticated(false);
};
