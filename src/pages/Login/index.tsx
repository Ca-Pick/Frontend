import { Box, Alert } from '@mui/material';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { LoginForm } from './section/LoginForm';

export function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const error = searchParams.get('error');
  const redirect = searchParams.get('redirect');
  const fromState = location.state?.from;

  useEffect(() => {
    // 이미 로그인되어 있으면 저장된 redirect URL로 이동, 없으면 홈으로
    if (document.cookie.includes('access_token')) {
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
