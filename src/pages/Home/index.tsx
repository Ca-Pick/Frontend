import { Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { HeroSection } from './section/HeroSection';
import InstagramEmbdeSection from './section/InstagramEmbdeSection';
import { HomeDetail } from './section/HomeDetail';
import { useNavigate } from 'react-router-dom';
import { consumePendingHeartAction, setPendingHeartToast } from '../../utils/pendingHeartAction';
import { saveCake, unsaveCake } from '../../api/services/saveService';

type HomeView = 'home' | 'detail';

export function Home() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  const [view, setView] = useState<HomeView>('home');
  const [selectedCakeId, setSelectedCakeId] = useState<number>();

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

  useEffect(() => {
    let cancelled = false;

    const restorePendingStateAndRedirect = async () => {
      // 로그인 후 redirect URL 체크
      const redirectUrl = localStorage.getItem('loginRedirectUrl');

      // redirectUrl이 있을 때만 pending action 처리 (로그인 직후만)
      if (redirectUrl) {
        const pendingHeartAction = consumePendingHeartAction();
        if (pendingHeartAction && !cancelled) {
          try {
            if (pendingHeartAction.action === 'save') {
              await saveCake(pendingHeartAction.referenceId);
              setPendingHeartToast(pendingHeartAction.referenceId);
              // 저장된 케이크 캐시 갱신
              queryClient.invalidateQueries({ queryKey: ['savedCakes'] });
            } else {
              await unsaveCake(pendingHeartAction.referenceId);
              // 저장된 케이크 캐시 갱신
              queryClient.invalidateQueries({ queryKey: ['savedCakes'] });
            }
          } catch (error) {
            console.error('로그인 후 찜 상태 복원 실패:', error);
          }
        }

        if (cancelled) return;

        localStorage.removeItem('loginRedirectUrl');
        navigate(redirectUrl);
      }
    };

    restorePendingStateAndRedirect();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const handleDetailClick = (cakeId?: number) => {
    setSelectedCakeId(cakeId);
    setView('detail');
  };

  const handleBackFromDetail = () => {
    setView('home');
  };

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
    </Box>
  );
}
