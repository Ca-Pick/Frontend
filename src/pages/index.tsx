import { Box, Stack } from '@mui/material';
import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Home } from './Home';
import { OrderCreate } from './OrderCreate';
import { Saved } from './Saved';
import { MyPage } from './MyPage';
import { Login } from './Login';
import { BottomTabNavigation, BOTTOM_TAB_HEIGHT } from '../components/BottomTabNavigation';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { LoginRedirectGate } from '../components/LoginRedirectGate';
import { ProductDetail } from './OrderCreate/detail';

type TabType = 'home' | 'order' | 'saved' | 'mypage';

function LayoutWrapper({ isDetailView, onDetailViewChange }: { isDetailView: boolean; onDetailViewChange: (isDetail: boolean) => void }) {
  const location = useLocation();
  const navigate = useNavigate();

  const getActiveTabFromPath = (): TabType => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path.startsWith('/order')) return 'order';
    if (path === '/saved') return 'saved';
    if (path === '/mypage') return 'mypage';
    return 'home';
  };

  const activeTab = getActiveTabFromPath();
  const isDessertDetailRoute = location.pathname.startsWith('/desserts/');
  // isDetailView는 홈('/')과 주문서('/order')만 갱신하는 값이라, 저장함/마이페이지 등
  // 다른 화면으로 이동해도 리셋되지 않고 남아있을 수 있다(로그인 리다이렉트 후 좋아요 →
  // 저장함으로 바로 이동하는 흐름 등). 그 값을 실제로 소유한 화면에 있을 때만 반영한다.
  const ownsDetailView = location.pathname === '/' || location.pathname.startsWith('/order');
  const showBottomTab = (!ownsDetailView || !isDetailView) && !isDessertDetailRoute && location.pathname !== '/login';

  return (
    <>
      <Box
        sx={{
          flex: 1,
          minHeight: showBottomTab ? `calc(100vh - ${BOTTOM_TAB_HEIGHT}px)` : '100vh',
        }}
      >
        <LoginRedirectGate>
          <Routes>
            <Route path="/" element={<Home onDetailViewChange={onDetailViewChange} />} />
            <Route path="/desserts/:cakeId" element={<ProductDetail onBack={() => navigate(-1)} />} />
            <Route path="/order/*" element={<OrderCreate onDetailViewChange={onDetailViewChange} />} />
            <Route path="/saved" element={<ProtectedRoute><Saved onTabChange={() => {}} /></ProtectedRoute>} />
            <Route path="/mypage" element={<ProtectedRoute><MyPage /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            {/* 기타 경로는 홈으로 리다이렉트 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </LoginRedirectGate>
      </Box>

      {showBottomTab && <BottomTabNavigation activeTab={activeTab} onTabChange={() => {}} />}
    </>
  );
}

export default function MainPage() {
  const [isDetailView, setIsDetailView] = useState(false);

  return (
    <Stack
      sx={{
        width: 375,
        minHeight: '100vh',
        backgroundColor: 'white',
        margin: '0 auto',
      }}
    >
      <LayoutWrapper isDetailView={isDetailView} onDetailViewChange={setIsDetailView} />
    </Stack>
  );
}
