import { Box, Typography } from '@mui/material';
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

type TabType = 'home' | 'order' | 'saved' | 'mypage';

interface BottomTabNavigationProps {
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
}

export function BottomTabNavigation({ activeTab = 'home', onTabChange }: BottomTabNavigationProps) {
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
        height: 72,
      }}
    >
      <TabItem icon={<HomeIcon />} label="홈" isActive={activeTab === 'home'} onClick={() => onTabChange?.('home')} />
      <TabItem icon={<SearchIcon />} label="검색" isActive={activeTab === 'order'} onClick={() => onTabChange?.('order')} />
      <TabItem icon={cherryBtn} label="저장" isActive={activeTab === 'saved'} onClick={() => onTabChange?.('saved')} />
      <TabItem icon={<SentimentSatisfiedAltIcon />} label="마이" isActive={activeTab === 'mypage'} onClick={() => onTabChange?.('mypage')} />
    </Box>
  );
}
