import { Box, CircularProgress, Stack } from '@mui/material';
import { colors } from '../../theme/colors';
import { BOTTOM_TAB_HEIGHT } from '../../components/BottomTabNavigation';
import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useNavigationType } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchSavedItems, toggleLike } from '../../api/saved';
import { SavedHeader } from './section/SavedHeader';
import SavedInstagramEmbed, { EMBED_COUNT } from '../../components/SavedInstagramEmbed';
import { NoSaved } from './section/NoSaved';

interface SavedProps {
  onTabChange?: (tab: 'order') => void;
}

export function Saved({ onTabChange }: SavedProps) {
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const [selectedTags, setSelectedTags] = useState<string[]>(['생일', '생일']);
  const [sortBy, setSortBy] = useState<'popular' | 'recent'>('popular');
  const [localLikeState, setLocalLikeState] = useState<Record<string, boolean>>({});

  const { data, isLoading, error } = useQuery({
    queryKey: ['savedItems', sortBy, selectedTags],
    queryFn: () => fetchSavedItems(sortBy, selectedTags),
    staleTime: 1000 * 60 * 5,
  });

  const items = useMemo(() => {
    if (!data?.items) return [];
    return data.items.map(item => ({
      ...item,
      liked: localLikeState[item.id] ?? (item.liked || false),
    }));
  }, [data?.items, localLikeState]);

  const handleLike = async (id: string) => {
    setLocalLikeState(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
    try {
      await toggleLike(id);
    } catch (error) {
      setLocalLikeState(prev => ({
        ...prev,
        [id]: !prev[id],
      }));
      console.error('Failed to toggle like:', error);
    }
  };

  const handleRemoveTag = (tagToRemove: string, index: number) => {
    const newTags = selectedTags.filter((_, idx) => idx !== index);
    setSelectedTags(newTags);
  };

  const handleDetailClick = (cakeId?: number) => {
    if (cakeId) {
      // Saved는 실제 라우트 이동(/desserts/:cakeId)이라 view state 전환과 달리
      // 컴포넌트가 언마운트되므로, 스크롤 위치는 로컬 ref가 아니라 sessionStorage에 저장해야
      // 뒤로 돌아와서 다시 마운트됐을 때도 복원할 수 있다
      sessionStorage.setItem('scroll-saved', String(window.scrollY));
      navigate(`/desserts/${cakeId}`);
      window.scrollTo(0, 0);
    }
  };

  const savedCount = items.length;

  // 상세페이지에서 "뒤로가기"로 돌아와 다시 마운트됐을 때만 스크롤 복원 -
  // navigationType이 'POP'인 경우만 진짜 뒤로가기이고, 탭 클릭이나 로그인 후
  // 리다이렉트로 새로 진입한 경우(PUSH/REPLACE)는 예전에 저장해둔 값이 남아있어도 무시해야
  // 첫 진입인데 엉뚱한 위치로 스크롤되는 문제가 안 생긴다.
  // (목록이 다 그려진 뒤여야 스크롤 가능한 높이가 확보되므로 로딩이 끝난 뒤에 실행)
  useEffect(() => {
    if (!isLoading && navigationType === 'POP') {
      const savedScroll = sessionStorage.getItem('scroll-saved');
      if (savedScroll) {
        window.scrollTo(0, parseInt(savedScroll, 10));
      }
    }
  }, [isLoading, navigationType]);

  if (isLoading) {
    return (
      <Box
        sx={{
          width: '100%',
          minHeight: `calc(100vh - ${BOTTOM_TAB_HEIGHT}px)`,
          backgroundColor: colors.background,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (savedCount > 0) {
    return (
      <Box sx={{ width: '100%', backgroundColor: colors.background, minHeight: 'calc(100vh - 72px)' }}>
        <SavedHeader count={savedCount} />
        <Box sx={{ px: 4 }}>
          <SavedInstagramEmbed cakes={items} onDetailClick={handleDetailClick} />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', backgroundColor: colors.background, minHeight: 'calc(100vh - 72px)', pt: 1 }}>
      <SavedHeader count={savedCount} />
      <NoSaved onNavigateToOrder={() => navigate('/order')} />
    </Box>
  );
}
