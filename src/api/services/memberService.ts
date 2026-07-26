import type { UserInfoResponse } from '../../types/api';
import { authClient } from '../client';

// 마이페이지 조회 (내 정보)
// silent: true면 로그인 여부만 조용히 확인하는 용도 - 401이어도 토큰 재발급/로그인 페이지
// 하드 리다이렉트 없이 그대로 실패 처리한다 (ProtectedRoute 등에서 이미 자체적으로
// SPA 리다이렉트를 하기 때문에, 인터셉터의 하드 리다이렉트와 중복되어 화면이 두 번
// 렌더링되는 것을 막기 위함)
export const getMyInfo = async (silent = false): Promise<UserInfoResponse> => {
  const response = await authClient.get('/user/me', silent ? ({ skipAuthRedirect: true } as any) : undefined);
  return response.data;
};
