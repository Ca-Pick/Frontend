import { Box, Alert } from '@mui/material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { LoginForm } from './section/LoginForm';

export function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const error = searchParams.get('error');
  const redirect = searchParams.get('redirect');

  useEffect(() => {
    // 이미 로그인되어 있으면 저장된 redirect URL로 이동, 없으면 홈으로
    if (document.cookie.includes('access_token')) {
      if (redirect) {
        navigate(redirect);
      } else {
        navigate('/');
      }
    }
  }, [navigate, redirect]);

  useEffect(() => {
    // redirect URL을 localStorage에 저장 (로그인 후 사용하기 위해)
    if (redirect) {
      localStorage.setItem('loginRedirectUrl', redirect);
    }
  }, [redirect]);

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
