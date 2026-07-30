import { Box, Snackbar, Alert, CircularProgress } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { HeroSection } from './section/HeroSection';
import InstagramEmbdeSection from './section/InstagramEmbdeSection';
import { HomeDetail } from './section/HomeDetail';
import { useNavigate, useLocation } from 'react-router-dom';
import { consumePendingHeartAction, setPendingHeartToast } from '../../utils/pendingHeartAction';
import { saveCake, unsaveCake } from '../../api/services/saveService';
import { getMyInfo } from '../../api/services/memberService';
import { setSavedCakeInCache } from '../../hooks/queries/useSavedCakes';

type HomeView = 'home' | 'detail';

interface HomeProps {
  onDetailViewChange?: (isDetail: boolean) => void;
}

export function Home({ onDetailViewChange }: HomeProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  const [view, setView] = useState<HomeView>('home');
  const [selectedCakeId, setSelectedCakeId] = useState<number>();
  const scrollBeforeDetailRef = useRef(0);
  const [withdrawSuccessOpen, setWithdrawSuccessOpen] = useState(
    Boolean((location.state as { withdrawSuccess?: boolean } | null)?.withdrawSuccess)
  );
  // 로그인 리다이렉트로 홈에 도착한 경우, 목적지로 이동시키기 전까지는 실제 홈 콘텐츠 대신
  // 스피너만 보여준다 - 로그인 성공 화면에 홈이 잠깐 스쳐 보이는 걸 막기 위함
  const [isCheckingRedirect, setIsCheckingRedirect] = useState(
    () => !!localStorage.getItem('loginRedirectUrl')
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

  const redirectCheckStartedRef = useRef(false);

  useEffect(() => {
    // StrictMode 개발 모드에서 effect가 두 번 실행되는데, localStorage 읽기+삭제가
    // 파괴적(destructive)이라 ref 가드 없이 두 번 돌면 첫 실행이 지운 값을 두 번째 실행이
    // 못 보게 되어 로그인 성공 후에도 리다이렉트가 누락됨 - 실제 실행은 한 번만 타도록 막는다
    if (redirectCheckStartedRef.current) return;
    redirectCheckStartedRef.current = true;

    const restorePendingStateAndRedirect = async () => {
      // 로그인 후 redirect URL 체크
      const redirectUrl = localStorage.getItem('loginRedirectUrl');

      // redirectUrl이 있을 때만 pending action 처리 (로그인 직후만)
      if (redirectUrl) {
        // 값이 남아있다고 무조건 되돌려보내지 않는다 - 로그인 없이 뒤로가기 등으로 홈에
        // 도착한 경우까지 다시 저장함/마이페이지로 보내면 401 → 로그인 루프가 재현됨.
        // 실제로 로그인됐는지 서버로 확인한 뒤에만 리다이렉트한다.
        localStorage.removeItem('loginRedirectUrl');

        const loggedIn = await getMyInfo(true)
          .then(() => true)
          .catch(() => false);

        if (!loggedIn) {
          setIsCheckingRedirect(false);
          return;
        }

        const pendingHeartAction = consumePendingHeartAction();
        if (pendingHeartAction) {
          try {
            if (pendingHeartAction.action === 'save') {
              await saveCake(pendingHeartAction.referenceId);
              setPendingHeartToast(pendingHeartAction.referenceId);
              // 저장된 케이크 캐시에 직접 반영 (mutation 훅을 거치지 않으므로 여기서 캐시를 채워야 함)
              setSavedCakeInCache(queryClient, pendingHeartAction.referenceId, true);
            } else {
              await unsaveCake(pendingHeartAction.referenceId);
              setSavedCakeInCache(queryClient, pendingHeartAction.referenceId, false);
            }
          } catch (error) {
            console.error('로그인 후 찜 상태 복원 실패:', error);
          }
        }

        navigate(redirectUrl);
      }
    };

    restorePendingStateAndRedirect();
  }, [navigate]);

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

  if (isCheckingRedirect) {
    return (
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

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
        <Alert severity="success" onClose={() => setWithdrawSuccessOpen(false)}>
          탈퇴가 완료되었습니다.
        </Alert>
      </Snackbar>
    </Box>
  );
}
