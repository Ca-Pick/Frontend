import { Box, Stack } from '@mui/material';
import { colors } from '../../theme/colors';
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const handleDetailClick = (id: string) => {
    console.log('Detail click:', id);
    // TODO: Navigate to detail page
  };

  const savedCount = items.length;

  // if (savedCount > 0) {
  //   return (
  //     <Box sx={{ width: '100%', backgroundColor: colors.background, minHeight: 'calc(100vh - 72px)' }}>
  //       <SavedHeader count={savedCount} />
  //       <Box sx={{ px: 4}}>
  //       <SavedInstagramEmbed cakes={items} /></Box>
  //     </Box>
  //   );
  // }

  return (
    <Box sx={{ width: '100%', backgroundColor: colors.background, minHeight: 'calc(100vh - 72px)', pt: 1 }}>
      <SavedHeader count={savedCount} />
      <NoSaved onNavigateToOrder={() => navigate('/order')} />
    </Box>
  );
}
