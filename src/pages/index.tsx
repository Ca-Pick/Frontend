import { Stack } from '@mui/material';
import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Home } from './Home';
import { OrderCreate } from './OrderCreate';
import { Saved } from './Saved';
import { MyPage } from './MyPage';
import { Login } from './Login';
import { BottomTabNavigation } from '../components/BottomTabNavigation';
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

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/desserts/:cakeId" element={<ProductDetail onBack={() => navigate(-1)} />} />
        <Route path="/order/*" element={<OrderCreate onDetailViewChange={onDetailViewChange} />} />
        <Route path="/saved" element={<Saved onTabChange={() => {}} />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/login" element={<Login />} />
        {/* 기타 경로는 홈으로 리다이렉트 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!isDetailView && location.pathname !== '/login' && <BottomTabNavigation activeTab={activeTab} onTabChange={() => {}} />}
    </>
  );
}

export default function MainPage() {
  const [isDetailView, setIsDetailView] = useState(false);

  return (
    <Stack
      sx={{
        width: 375,
        backgroundColor: 'white',
        margin: '0 auto',
      }}
    >
      <LayoutWrapper isDetailView={isDetailView} onDetailViewChange={setIsDetailView} />
    </Stack>
  );
}
