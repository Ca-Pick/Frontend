import { useEffect, useRef, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { consumePendingHeartAction, setPendingHeartToast } from '../utils/pendingHeartAction';
import { saveCake, unsaveCake } from '../api/services/saveService';
import { getMyInfo } from '../api/services/memberService';
import { setSavedCakeInCache } from '../hooks/queries/useSavedCakes';

interface LoginRedirectGateProps {
  children: ReactNode;
  // isChecking을 이 컴포넌트가 자체 state로 들고 useEffect로 상위에 알려주면, 상위가 그 값을
  // (예: 하단 탭 숨김에) 같이 쓰려 할 때 useEffect는 커밋 이후에나 실행되므로 첫 렌더에는
  // 상위가 아직 이전 값을 들고 있어 한 프레임 어긋난다 - 그래서 state 자체를 상위가 소유하고
  // 여기서는 controlled로만 받아써서, 컨텐츠 가림과 하단 탭 숨김이 항상 같은 렌더에서 맞아떨어지게 한다.
  isChecking: boolean;
  setIsChecking: Dispatch<SetStateAction<boolean>>;
}

// 소셜 로그인은 항상 사이트 루트(origin)로만 돌아오고, 실제 목적지(마이페이지/저장함/검색·상세 등)는
// 이 컴포넌트가 로그인 확인 후 client-side navigate로 다시 이동시킨다. 목적지로 이동하기 전까지는
// 라우트 콘텐츠 영역만 로딩으로 가린다.
export function LoginRedirectGate({ children, isChecking, setIsChecking }: LoginRedirectGateProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const startedRef = useRef(false);

  useEffect(() => {
    // StrictMode 개발 모드에서 effect가 두 번 실행되는데, localStorage 읽기+삭제가
    // 파괴적(destructive)이라 ref 가드 없이 두 번 돌면 첫 실행이 지운 값을 두 번째 실행이
    // 못 보게 되어 로그인 성공 후에도 리다이렉트가 누락됨 - 실제 실행은 한 번만 타도록 막는다
    if (startedRef.current) return;
    startedRef.current = true;

    const redirectUrl = localStorage.getItem('loginRedirectUrl');
    if (!redirectUrl) return;

    const restorePendingStateAndRedirect = async () => {
      // 값이 남아있다고 무조건 되돌려보내지 않는다 - 로그인 없이 뒤로가기 등으로 도착한
      // 경우까지 다시 마이페이지/저장함 등으로 보내면 401 → 로그인 루프가 재현됨.
      // 실제로 로그인됐는지 서버로 확인한 뒤에만 리다이렉트한다.
      localStorage.removeItem('loginRedirectUrl');

      const loggedIn = await getMyInfo(true)
        .then(() => true)
        .catch(() => false);

      if (!loggedIn) {
        setIsChecking(false);
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

      // 소셜 로그인 완료 후 이 페이지는 origin('/')이 방금 새로 로드된 것 - 목적지를
      // replace로 덮어써버리면 뒤로가기 시 우리 앱이 아니라 OAuth 제공자의(이미 만료된)
      // 인증 페이지로 튕긴다. 현재 항목을 먼저 '/'로 확정해두고 그 위에 목적지를 push해서
      // 뒤로가기가 우리 앱의 홈으로 돌아오게 만든다.
      window.history.replaceState(null, '', '/');
      navigate(redirectUrl);
      setIsChecking(false);
    };

    restorePendingStateAndRedirect();
  }, [navigate, queryClient]);

  if (isChecking) {
    return (
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 8,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
}
