import { Box, Snackbar, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { HeroSection } from './section/HeroSection';
import InstagramEmbdeSection from './section/InstagramEmbdeSection';
import { HomeDetail } from './section/HomeDetail';
import { useNavigate, useLocation } from 'react-router-dom';

type HomeView = 'home' | 'detail';

interface HomeProps {
  onDetailViewChange?: (isDetail: boolean) => void;
}

export function Home({ onDetailViewChange }: HomeProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  const [view, setView] = useState<HomeView>('home');
  const [selectedCakeId, setSelectedCakeId] = useState<number>();
  const scrollBeforeDetailRef = useRef(0);
  const [withdrawSuccessOpen, setWithdrawSuccessOpen] = useState(
    Boolean((location.state as { withdrawSuccess?: boolean } | null)?.withdrawSuccess)
  );

  // 탈퇴 완료 안내를 한 번만 표시하고 history state에서 제거
  useEffect(() => {
    if ((location.state as { withdrawSuccess?: boolean } | null)?.withdrawSuccess) {
      navigate('.', { replace: true, state: null });
    }
  }, []);

  // 스크롤 위치 복원
  useEffect(() => {
    setTimeout(() => {
      const savedPosition = sessionStorage.getItem('scroll-home');
      if (savedPosition) {
        window.scrollTo(0, parseInt(savedPosition, 10));
      }
    }, 100);
  }, []);

  // 스크롤 위치 저장
  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        sessionStorage.setItem('scroll-home', String(window.scrollY));
      }, 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const handleDetailClick = (cakeId?: number) => {
    scrollBeforeDetailRef.current = window.scrollY;
    setSelectedCakeId(cakeId);
    setView('detail');
    onDetailViewChange?.(true);
    window.scrollTo(0, 0);
  };

  const handleBackFromDetail = () => {
    setView('home');
    onDetailViewChange?.(false);
  };

  // 상세페이지에서 홈으로 돌아왔을 때, 상세 진입 전 스크롤 위치로 복원
  useEffect(() => {
    if (view === 'home') {
      window.scrollTo(0, scrollBeforeDetailRef.current);
    }
  }, [view]);

  if (view === 'detail') {
    return (
      <HomeDetail
        cakeId={selectedCakeId}
        onBack={handleBackFromDetail}
      />
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <HeroSection onNavigateToOrder={() => navigate('/order')}/>
      <InstagramEmbdeSection category="birthday" onDetailClick={handleDetailClick} />
      <InstagramEmbdeSection category="celebration" onDetailClick={handleDetailClick} />
      <InstagramEmbdeSection category="academic" onDetailClick={handleDetailClick} />

      <Snackbar
        open={withdrawSuccessOpen}
        autoHideDuration={3000}
        onClose={() => setWithdrawSuccessOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Box
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.80)',
            color: '#fff',
            padding: '4px 16px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '94px',
          }}
        >
          <Typography variant="label_4">탈퇴가 완료되었습니다.</Typography>
        </Box>
      </Snackbar>
    </Box>
  );
}
