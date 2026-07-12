import { useState } from 'react';
import { Stack } from '@mui/material';
import { Home } from './Home';
import { OrderCreate } from './OrderCreate';
import { Saved } from './Saved';
import { MyPage } from './MyPage';
import { BottomTabNavigation } from '../components/BottomTabNavigation';

type TabType = 'home' | 'order' | 'saved' | 'mypage';

export default function MainPage() {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  return (
    <Stack
      sx={{
        width: 375,
        backgroundColor: 'white',
        margin: '0 auto',
        overflow: 'hidden',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      }}
    >
      {/* 탭 콘텐츠 */}
      {activeTab === 'home' && <Home />}
      {activeTab === 'order' && <OrderCreate />}
      {activeTab === 'saved' && <Saved />}
      {activeTab === 'mypage' && <MyPage />}

      {/* 하단 탭 네비게이션 */}
      <BottomTabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </Stack>
  );
}
