import { useEffect, useState, type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getMyInfo } from '../api/services/memberService';
import { getAuthenticated, setAuthenticated } from '../utils/authState';

interface ProtectedRouteProps {
  children: ReactNode;
}

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

function initialStatus(): AuthStatus {
  const cached = getAuthenticated();
  if (cached === true) return 'authenticated';
  if (cached === false) return 'unauthenticated';
  return 'loading';
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  // 이미 인증 여부를 확인한 적이 있으면(캐시된 값이 있으면) 화면 이동 시마다
  // 재검증하는 동안 빈 화면(null)을 다시 보여주지 않고, 캐시된 상태를 그대로 유지한 채
  // 백그라운드에서만 재검증한다. 그래야 마이페이지 -> 이용약관처럼 보호된 라우트끼리
  // 이동할 때 화면이 깜빡이지 않는다.
  const [status, setStatus] = useState<AuthStatus>(initialStatus);

  useEffect(() => {
    let cancelled = false;
    if (getAuthenticated() === null) {
      setStatus('loading');
    }

    getMyInfo(true)
      .then(() => {
        if (cancelled) return;
        setAuthenticated(true);
        setStatus('authenticated');
      })
      .catch(() => {
        if (cancelled) return;
        setAuthenticated(false);
        setStatus('unauthenticated');
      });

    return () => {
      cancelled = true;
    };
  }, [location.pathname]);

  if (status === 'loading') {
    return null;
  }

  if (status === 'unauthenticated') {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
}
