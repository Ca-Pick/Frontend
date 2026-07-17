import { useState } from 'react';
import {
  Box,
  Button,
  IconButton
} from '@mui/material';
import { colors } from "../theme/colors";
import { InstagramEmbed } from '../components/InstagramEmbed';
import CarouselIndicators from '../components/CarouselIndicators'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import cherryBtn from '../assets/images/cherry.svg';

export const INSTAGRAM_URLS = [
  "https://www.instagram.com/p/DFxF4K8yG6D/",
  "https://www.instagram.com/p/DaR64RlMKE1/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  "https://www.instagram.com/p/DY1O9Vlsp1G/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
];

export const EMBED_COUNT = INSTAGRAM_URLS.length * 2;

const InstagramCarousel = ({ currentIndex, onDetailClick }: { currentIndex: number; onDetailClick?: () => void }) => (
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
        transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transform: `translateX(-${currentIndex * 100}%)`,
      }}>
        {INSTAGRAM_URLS.map((url) => (
          <Box key={url} sx={{ minWidth: '100%' }}>
            <InstagramEmbed url={url} width="100%" />
          </Box>
        ))}
      </Box>

    <Box sx={{
      display: 'flex',
      gap: 1,
      alignItems: 'center',
      width: '100%',
      px: 2,
      py: 1,
    }}>
      <Box component="img" src={cherryBtn} sx={{ padding: '6px 9px', border: `1px solid ${colors.divider}`, borderRadius: '6px' }} />
      <Button size="large" variant="contained" color="secondary" fullWidth onClick={onDetailClick} sx={{ flex: 1 }}>
        상세보기
      </Button>
    </Box>
  </Box>
);

interface SavedInstagramEmbedProps {
  onDetailClick?: () => void;
}

function SavedInstagramEmbed({ onDetailClick }: SavedInstagramEmbedProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = INSTAGRAM_URLS.length;

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalItems - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleCarouselChange = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}>
      <InstagramCarousel currentIndex={currentIndex} onDetailClick={onDetailClick} />
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
          sx={{
            backgroundColor: 'transparent',
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
        <CarouselIndicators current={currentIndex} total={INSTAGRAM_URLS.length} onChange={handleCarouselChange} />
        <IconButton
          onClick={handleNext}
          sx={{
            backgroundColor: 'transparent',
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
      <InstagramCarousel currentIndex={currentIndex} onDetailClick={onDetailClick} />
    </Box>
  );
}

export default SavedInstagramEmbed;