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
    window.scrollTo(0, 0);
  };

  const handleBackFromDetail = () => {
    setView('home');
  };

  // view가 바뀔 때마다(마운트 시 포함) 상위(MainPage)의 하단탭 표시 여부를 항상 동기화한다.
  // 핸들러에서만 개별 호출하면, 로그인 화면 등으로 이동하며 Home이 언마운트될 때 상위의
  // isDetailView가 true로 남아있다가 Home이 view='home'으로 다시 마운트돼도 리셋되지 않아
  // 하단탭이 계속 숨겨진 채로 남는 버그가 생긴다.
  useEffect(() => {
    onDetailViewChange?.(view === 'detail');
  }, [view]);

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
