import { Box } from '@mui/material';
import { useEffect } from 'react';
import { HeroSection } from './section/HeroSection';
import InstagramEmbdeSection from './section/InstagramEmbdeSection';
import { useNavigate } from 'react-router-dom';


export function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // 로그인 후 redirect URL 체크
    const redirectUrl = localStorage.getItem('loginRedirectUrl');
    if (redirectUrl) {
      localStorage.removeItem('loginRedirectUrl');
      navigate(redirectUrl);
    }
  }, [navigate]);

  return (
    <Box sx={{ width: '100%' }}>
      <HeroSection onNavigateToOrder={() => navigate('/order')}/>
      <InstagramEmbdeSection category="birthday" />
      <InstagramEmbdeSection category="celebration" />
      <InstagramEmbdeSection category="academic" />
    </Box>
  );
}
