import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { colors } from '../theme/colors';
import cherryBtn from '../assets/images/cherry.svg';

interface TabItemProps {
  icon?: string | React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

function TabItem({ icon, label, isActive = false, onClick }: TabItemProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        cursor: 'pointer',
        opacity: isActive ? 1 : 0.7,
        transition: 'opacity 0.2s',
        '&:hover': {
          opacity: 1,
        },
      }}
    >
      <Box sx={{ width: 24, height: 24, pointerEvents: 'none' }}>
        {typeof icon === 'string' ? (
          <Box component="img" src={icon} sx={{ width: '100%', height: '100%' }} />
        ) : (
          icon
        )}
      </Box>
      <Typography variant="label_4" sx={{ color: '#000' }}>
        {label}
      </Typography>
    </Box>
  );
}

export const BOTTOM_TAB_HEIGHT = 72;

type TabType = 'home' | 'order' | 'saved' | 'mypage';

interface BottomTabNavigationProps {
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
}

export function BottomTabNavigation({ activeTab, onTabChange }: BottomTabNavigationProps) {
  const navigate = useNavigate();

  const handleTabClick = (tab: TabType) => {
    onTabChange?.(tab);
    switch (tab) {
      case 'home':
        navigate('/');
        break;
      case 'order':
        navigate(sessionStorage.getItem('orderLastPath') || '/order');
        break;
      case 'saved':
        navigate('/saved');
        break;
      case 'mypage':
        navigate('/mypage');
        break;
    }
  };

  return (
    <Box
      sx={{
        position: 'sticky',
        bottom: 0,
        zIndex: 100,
        borderTop: `1px solid ${colors._components.table.border}`,
        backgroundColor: '#F5F5F5',
        padding: '8px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: BOTTOM_TAB_HEIGHT,
        flexShrink: 0,
      }}
    >
      <TabItem icon={<HomeIcon />} label="홈" isActive={activeTab === 'home'} onClick={() => handleTabClick('home')} />
      <TabItem icon={<SearchIcon />} label="검색" isActive={activeTab === 'order'} onClick={() => handleTabClick('order')} />
      <TabItem icon={cherryBtn} label="저장" isActive={activeTab === 'saved'} onClick={() => handleTabClick('saved')} />
      <TabItem icon={<SentimentSatisfiedAltIcon />} label="마이" isActive={activeTab === 'mypage'} onClick={() => handleTabClick('mypage')} />
    </Box>
  );
}
