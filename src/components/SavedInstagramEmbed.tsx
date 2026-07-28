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
  onDetailClick?: (cakeId?: number) => void;
  cakes: typeof FALLBACK_CAKES | any[];
  showChips?: boolean;
}

const InstagramCarousel = React.memo(({ currentIndex, onDetailClick, cakes, showChips = false }: InstagramCarouselProps) => {
  const currentCake = cakes.length > 0 ? cakes[0] : null;

  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
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
        pt: 1,
      }}>
        {cakes.map((cake) => (
          <Box key={cake.cakeId} sx={{ minWidth: '100%' }}>
            <InstagramEmbed url={cake.instagramEmbed} width="100%" />
          </Box>
        ))}
      </Box>

      {showChips && cakes.length > 0 && cakes[0]?.cakeDetailTags && (
        <Box sx={{
          pt: 1, px:2, display: 'flex', maxWidth: '279px', alignItems: 'flex-start', alignContent: 'flex-start', gap: 1, flexWrap: 'wrap'
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
          {currentCake && (
            <HeartToggle
              referenceId={currentCake.cakeId}
              initialSaved={currentCake.saved}
            />
          )}
        </Box>
        <Button size="large" variant="contained" color="secondary" fullWidth onClick={() => onDetailClick?.(currentCake?.cakeId)} sx={{ flex: 1 }}>
          상세보기
        </Button>
      </Box>
    </Box>
  );
});

interface SavedInstagramEmbedProps {
  onDetailClick?: (cakeId?: number) => void;
  showCarousel?: boolean;
  cakes?: typeof FALLBACK_CAKES | any[];
  showChips?: boolean;
}

function SavedInstagramEmbed({ onDetailClick, showCarousel = true, cakes = FALLBACK_CAKES, showChips = false }: SavedInstagramEmbedProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dotCount = showCarousel ? Math.ceil(cakes.length / 2) : cakes.length;

  useEffect(() => {
    setCurrentIndex(0);
  }, [cakes]);

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
    ? (currentIndex * 2 < cakes.length ? [cakes[currentIndex * 2]] : [])
    : (currentIndex < cakes.length ? [cakes[currentIndex]] : []);
  const bottomCake = showCarousel
    ? ((currentIndex * 2 + 1) < cakes.length ? [cakes[currentIndex * 2 + 1]] : [])
    : [];

  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}>
      {topCake.length > 0 && <InstagramCarousel currentIndex={0} onDetailClick={onDetailClick} cakes={topCake} showChips={showChips} />}
      {cakes.length > 0 && (
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
      )}
      {showCarousel && bottomCake.length > 0 && <InstagramCarousel currentIndex={0} onDetailClick={onDetailClick} cakes={bottomCake} showChips={showChips} />}
    </Box>
  );
}

export default SavedInstagramEmbed;