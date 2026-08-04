import { Box, Alert } from '@mui/material';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { LoginForm } from './section/LoginForm';
import { isLoggedIn } from '../../utils/cookieUtils';
import { clearPendingHeartAction } from '../../utils/pendingHeartAction';

export function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const error = searchParams.get('error');
  const redirect = searchParams.get('redirect');
  const fromState = location.state?.from;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // 이미 로그인되어 있으면 저장된 redirect URL로 이동, 없으면 홈으로
    if (isLoggedIn()) {
      const finalRedirect = redirect || fromState || '/';
      navigate(finalRedirect, { replace: true });
    }
  }, [navigate, redirect, fromState]);

  useEffect(() => {
    // redirect URL이나 fromState를 localStorage에 저장 (로그인 후 사용하기 위해)
    const urlToSave = redirect || fromState;
    if (urlToSave) {
      localStorage.setItem('loginRedirectUrl', urlToSave);
    }
  }, [redirect, fromState]);

  useEffect(() => {
    // 브라우저 자체 뒤로가기(제스처/버튼)로 로그인 화면을 벗어나는 경우 -
    // 화면 내 뒤로가기 버튼(handleGoHome)을 거치지 않으므로 여기서도 로그인 취소로 간주해
    // 대기 중인 좋아요 액션을 폐기한다. 그대로 두면 나중에 다른 화면에서 로그인했을 때
    // 이미 취소한 좋아요가 그대로 재실행되는 버그가 생긴다.
    const handlePopState = () => {
      if (!isLoggedIn()) {
        localStorage.removeItem('loginRedirectUrl');
        clearPendingHeartAction();
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
      }}
    >
      {/* 에러 메시지 */}
      {error && (
        <Box sx={{ p: 2 }}>
          <Alert severity="error" sx={{ borderRadius: '8px' }}>
            로그인에 실패했습니다. 다시 시도해주세요.
          </Alert>
        </Box>
      )}

      {/* 로그인 폼 */}
      <Box sx={{ flex: 1 }}>
        <LoginForm />
      </Box>
    </Box>
  );
}
