import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { consumePendingHeartAction, setPendingHeartToast } from '../utils/pendingHeartAction';
import { saveCake, unsaveCake } from '../api/services/saveService';
import { getMyInfo } from '../api/services/memberService';
import { setSavedCakeInCache } from '../hooks/queries/useSavedCakes';

interface LoginRedirectGateProps {
  children: ReactNode;
}

// 소셜 로그인은 항상 사이트 루트(origin)로만 돌아오고, 실제 목적지(마이페이지/저장함/검색·상세 등)는
// 이 컴포넌트가 로그인 확인 후 client-side navigate로 다시 이동시킨다. 목적지로 이동하기 전까지는
// 라우트 콘텐츠 영역만 로딩으로 가리고 하단 탭은 그대로 보이게 둔다(하단 탭까지 가리면 화면이
// 통째로 비어 보여 더 어색함) - "로그인 성공 -> 콘텐츠 영역 로딩 -> 목적지 화면" 순서로 보이게 하기 위함
export function LoginRedirectGate({ children }: LoginRedirectGateProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isChecking, setIsChecking] = useState(
    () => !!localStorage.getItem('loginRedirectUrl')
  );
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

      navigate(redirectUrl, { replace: true });
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
