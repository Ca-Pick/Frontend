import { useEffect, useState, type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getMyInfo } from '../api/services/memberService';
import { setAuthenticated } from '../utils/authState';

interface ProtectedRouteProps {
  children: ReactNode;
}

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  const [status, setStatus] = useState<AuthStatus>('loading');

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');

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
