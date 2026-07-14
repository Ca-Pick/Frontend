import { Box, Stack } from '@mui/material';
import { colors } from '../../theme/colors';
import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchSavedItems, toggleLike } from '../../api/saved';
import { SavedHeader } from './section/SavedHeader';
import { SavedGrid } from './section/SavedGrid';
import { SavedFilteredHeader } from './section/SavedFilteredHeader';

export function Saved() {
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

  return (
    <Stack sx={{ width: '100%', height: '100vh', backgroundColor: colors.background }}>
      <SavedHeader
        sortBy={sortBy}
        onSortChange={setSortBy}
        onBack={() => console.log('Back clicked')}
      />
      <SavedFilteredHeader
        onBack={() => console.log('Back clicked')}
        tags={selectedTags}
        onRemoveTag={handleRemoveTag}
        onEditTags={() => console.log('Edit tags clicked')}
      />
      <Box
        sx={{
          flex: 1,
          px: 2,
          py: 1,
          overflowY: 'auto',
          backgroundColor: 'white',
        }}
      >
        <SavedGrid
          items={items}
          isLoading={isLoading}
          error={error}
          onLike={handleLike}
          onDetailClick={handleDetailClick}
        />
      </Box>
    </Stack>
  );
}
