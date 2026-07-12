import { Box, Typography } from '@mui/material';
import { colors } from '../theme/colors';
import { LiSmile, LiHeart, LiSearch } from './Icons';

const imgLiHouse = "https://www.figma.com/api/mcp/asset/93165c89-1e7e-4894-a6a3-19e3a1a41af1";

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
      <Box sx={{ width: 24, height: 24 }}>
        {typeof icon === 'string' ? (
          <Box component="img" src={icon} sx={{ width: '100%', height: '100%' }} />
        ) : (
          icon
        )}
      </Box>
      <Typography
        variant="caption"
        sx={{
          color: colors.text.primary,
          fontWeight: 500,
          fontSize: '13px',
        }}
      >
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
        borderTop: `1px solid ${colors.divider}`,
        backgroundColor: colors.common.white._states.main,
        padding: '8px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 72,
      }}
    >
      <TabItem icon={imgLiHouse} label="홈" isActive={activeTab === 'home'} onClick={() => onTabChange?.('home')} />
      <TabItem icon={<LiSearch />} label="주문서 작성" isActive={activeTab === 'order'} onClick={() => onTabChange?.('order')} />
      <TabItem icon={<LiHeart />} label="저장함" isActive={activeTab === 'saved'} onClick={() => onTabChange?.('saved')} />
      <TabItem icon={<LiSmile />} label="마이" isActive={activeTab === 'mypage'} onClick={() => onTabChange?.('mypage')} />
    </Box>
  );
}
