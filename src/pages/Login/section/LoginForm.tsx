import { Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import imglogoText from '../../../assets/logos/logo_text.svg';
import imgNaverLogin from '../../../assets/button/naver_login.svg';
import imgKakaoLogin from '../../../assets/button/kakao_login.svg';
import { clearPendingHeartAction } from '../../../utils/pendingHeartAction';

export function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const oauthBaseUrl = import.meta.env.VITE_OAUTH_BASE_URL || 'http://localhost:8080';
  // 로그인 성공 시 돌아갈 곳과 동일한 출처 - 검색/상세(주문서)에서 왔으면 그 화면으로,
  // 큐레이션/저장함/마이페이지에서 왔으면(from이 있어도) 그냥 홈으로 보낸다
  const redirectTarget = searchParams.get('redirect') || location.state?.from;

  const handleKakaoLogin = () => {
    window.location.href = `${oauthBaseUrl}/oauth2/authorization/kakao?redirect_uri=${encodeURIComponent(window.location.origin)}`;
  };

  const handleNaverLogin = () => {
    window.location.href = `${oauthBaseUrl}/oauth2/authorization/naver?redirect_uri=${encodeURIComponent(window.location.origin)}`;
  };

  const handleGoHome = () => {
    // 남아있으면 홈 진입 시 저장함/마이페이지로 자동 리다이렉트되어 다시 401 로그인
    // 화면으로 튕기는 루프가 생기는 값을 지워준다
    localStorage.removeItem('loginRedirectUrl');
    // 로그인을 취소하는 것이므로, 대기 중이던 좋아요 액션도 함께 폐기한다 -
    // 지우지 않으면 나중에 전혀 다른 화면에서 로그인했을 때 이 액션이 그대로 재실행되는 버그가 생김
    clearPendingHeartAction();
    // 검색/상세(주문서 흐름)에서 온 경우만 그 화면으로 복귀 - 큐레이션/저장함/
    // 마이페이지에서 온 경우는 로그인 포기 시 그냥 홈으로 보낸다
    if (redirectTarget && redirectTarget.startsWith('/order')) {
      navigate(redirectTarget, { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  };


  return (
    <Box
      sx={{
        display: 'flex',
        height: '645px',
        padding: '25px 16px 51px 16px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '143px',
        position: 'relative',
      }}
    >
      {/* 홈으로 이동 버튼 */}
      <IconButton
        onClick={handleGoHome}
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          color: '#333',
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <Box
        component="img"
        src={imglogoText}
        alt="Ca-Pick Logo"
        sx={{
          objectFit: 'cover',
        }}
      />
      <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
        {/* 카카오톡 로그인 버튼 */}
        <Box
          component="button"
          onClick={handleKakaoLogin}
          sx={{
            width: '100%',
            height: '48px',
            padding: 0,
            border: 'none',
            borderRadius: '8px',
            overflow: 'hidden',
            cursor: 'pointer',
            backgroundColor: 'transparent',
          }}
        >
          <Box
            component="img"
            src={imgKakaoLogin}
            alt="카카오 로그인"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </Box>

        {/* 네이버 로그인 버튼 */}
        <Box
          component="button"
          onClick={handleNaverLogin}
          sx={{
            width: '100%',
            height: '48px',
            padding: 0,
            border: 'none',
            borderRadius: '8px',
            overflow: 'hidden',
            cursor: 'pointer',
            backgroundColor: 'transparent',
          }}
        >
          <Box
            component="img"
            src={imgNaverLogin}
            alt="네이버 아이디로 로그인"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </Box>

      </Box>
    </Box>
  );
}
