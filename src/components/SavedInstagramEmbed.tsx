import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  IconButton,
  Chip
} from '@mui/material';
import { colors } from "../theme/colors";
import { InstagramEmbed } from '../components/InstagramEmbed';
import CarouselIndicators from '../components/CarouselIndicators'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { HeartToggle } from './HeartToggle';
import { getDetailTags } from '../api/services/referenceService';

export const INSTAGRAM_URLS = [
  "https://www.instagram.com/p/DFxF4K8yG6D/",
  "https://www.instagram.com/p/DaR64RlMKE1/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  "https://www.instagram.com/p/DY1O9Vlsp1G/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
];

const FALLBACK_CAKES = INSTAGRAM_URLS.map((url, index) => ({
  cakeId: index + 1,
  instagramEmbed: url,
  saved: false,
  cakeDetailTags: []
}));

export const EMBED_COUNT = INSTAGRAM_URLS.length * 2;

interface InstagramCarouselProps {
  currentIndex: number;
  onDetailClick?: () => void;
  cakes: typeof FALLBACK_CAKES | any[];
  showChips?: boolean;
}

const InstagramCarousel = React.memo(({ currentIndex, onDetailClick, cakes, showChips = false }: InstagramCarouselProps) => (
  <Box sx={{
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    pb: 1,
    backgroundColor: '#Fff',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.05), 0 0 4px 3px rgba(51, 51, 51, 0.05)',
    borderRadius: '16px',
    border: '1px solid #E0E0E0',
    position: 'relative',
    overflow: 'hidden'
  }}>
    <Box sx={{
      display: 'flex',
      width: '100%',
      transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      transform: `translateX(-${currentIndex * 100}%)`,
    }}>
      {cakes.map((cake) => (
        <Box key={cake.cakeId} sx={{ minWidth: '100%' }}>
          <InstagramEmbed url={cake.instagramEmbed} width="100%" />
        </Box>
      ))}
    </Box>

    {showChips && cakes.length > 0 && cakes[0]?.cakeDetailTags && (
      <Box sx={{
        px:2, display: 'flex', maxWidth: '279px', alignItems: 'flex-start', alignContent: 'flex-start', gap: 1, flexWrap: 'wrap'
      }}>
        {cakes[0].cakeDetailTags.map((tag: string) => (
          <Chip key={tag} label={`#${tag}`} variant="static" color="primary"/>
        ))}
      </Box>
    )}

    <Box sx={{
      display: 'flex',
      gap: 1,
      alignItems: 'center',
      width: '100%',
      px: 2,
      py: 1,
    }}>
      <Box sx={{ width: '41px', height: '37px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: `1px solid ${colors.divider}`, borderRadius: '6px' }} >
        <HeartToggle />
      </Box>
      <Button size="large" variant="contained" color="secondary" fullWidth onClick={onDetailClick} sx={{ flex: 1 }}>
        상세보기
      </Button>
    </Box>
  </Box>
));

interface SavedInstagramEmbedProps {
  onDetailClick?: () => void;
  showCarousel?: boolean;
  cakes?: typeof FALLBACK_CAKES | any[];
  showChips?: boolean;
}

function SavedInstagramEmbed({ onDetailClick, showCarousel = true, cakes = FALLBACK_CAKES, showChips = false }: SavedInstagramEmbedProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cakesWithTags, setCakesWithTags] = useState(cakes);
  const dotCount = showCarousel ? Math.ceil(cakesWithTags.length / 2) : cakesWithTags.length;

  useEffect(() => {
    if (showChips && cakesWithTags.length > 0) {
      getDetailTags()
        .then((response) => {
          const tagsToAdd = response.data.decorations || [];
          const updatedCakes = cakesWithTags.map((cake, index) => ({
            ...cake,
            cakeDetailTags: index === 0 ? tagsToAdd : cake.cakeDetailTags || []
          }));
          setCakesWithTags(updatedCakes);
        })
        .catch((error) => {
          console.error('태그 정보 로드 실패:', error);
        });
    }
  }, [showChips, cakesWithTags.length]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < dotCount - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleCarouselChange = (index: number) => {
    setCurrentIndex(index);
  };

  // dot별로 표시할 케이크 결정
  const topCake = showCarousel
    ? (currentIndex * 2 < cakesWithTags.length ? [cakesWithTags[currentIndex * 2]] : [])
    : (currentIndex < cakesWithTags.length ? [cakesWithTags[currentIndex]] : []);
  const bottomCake = showCarousel
    ? ((currentIndex * 2 + 1) < cakesWithTags.length ? [cakesWithTags[currentIndex * 2 + 1]] : [])
    : [];

  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}>
      {topCake.length > 0 && <InstagramCarousel currentIndex={0} onDetailClick={onDetailClick} cakes={topCake} showChips={showChips} />}
      <Box sx={{
        height: '40px',
        display: 'flex',
        gap: 1,
        alignItems: 'center',
        justifyContent: 'center',
        px: 2
      }}>
        <IconButton
          onClick={handlePrev}
          disabled={currentIndex === 0}
          sx={{
            backgroundColor: 'transparent',
            opacity: currentIndex === 0 ? 0.5 : 1,
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
        <CarouselIndicators current={currentIndex} total={dotCount} onChange={handleCarouselChange} />
        <IconButton
          onClick={handleNext}
          disabled={currentIndex === dotCount - 1}
          sx={{
            backgroundColor: 'transparent',
            opacity: currentIndex === dotCount - 1 ? 0.5 : 1,
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
      {showCarousel && bottomCake.length > 0 && <InstagramCarousel currentIndex={0} onDetailClick={onDetailClick} cakes={bottomCake} showChips={showChips} />}
    </Box>
  );
}

export default SavedInstagramEmbed;