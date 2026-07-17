import {
  Box,
  Typography,
  Chip,
  IconButton
} from '@mui/material';
import { useState } from 'react';
import { colors } from '../../../theme/colors';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CarouselIndicators from '../../../components/CarouselIndicators'
import { InstagramEmbed } from '../../../components/InstagramEmbed';
import cherryBtn from '../../../assets/images/cherry.svg';

// 더미 데이터
const INSTAGRAM_URLS = [
  "https://www.instagram.com/p/DFxF4K8yG6D/",
  "https://www.instagram.com/p/DaDC3ckTr7v/",
  "https://www.instagram.com/p/Dasa2n6CYLA/",
];

function InstagramEmbdeSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? INSTAGRAM_URLS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === INSTAGRAM_URLS.length - 1 ? 0 : prev + 1));
  };

  const handleCarouselChange = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <Box
      sx={{
        width: '100%',
        px: 2,
        py: 3,
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
        gap: 2,
      }}
    >
      <Typography variant="t2_b" color={colors.common.black._states.main}>
        추천 레퍼런스 큐레이션
      </Typography>
      <Box sx={{
        width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', border: '1px solid #eeeeee', borderRadius: '16px', boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.04), 0 0 4px 3px rgba(51, 51, 51, 0.02)', position: 'relative', pb: '12px', overflow: 'hidden'
      }}>
        <Box sx={{
          width: '100%',
          display: 'flex',
          transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transform: `translateX(-${currentIndex * 100}%)`,
        }}>
          {INSTAGRAM_URLS.map((url) => (
            <Box key={url} sx={{ minWidth: '100%' }}>
              <InstagramEmbed url={url} />
            </Box>
          ))}
        </Box>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', px:1 }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center',}}>
            <Chip label="#인기" variant="static" />
            <Chip label="#인기" variant="static" />
            <Chip label="#인기" variant="static" />
          </Box>
          <Box component="img" src={cherryBtn} />
          <IconButton
            onClick={handlePrevious}
            sx={{
              position: 'absolute',
              left: 3.789,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: colors.secondary._states.hover,
              borderRadius: '50%',
              padding: '5px',
              '&:hover': {
                backgroundColor: colors.secondary._states.selected,
              },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            onClick={handleNext}
            sx={{
              position: 'absolute',
              right: 4.211,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: colors.secondary._states.hover,
              borderRadius: '50%',
              padding: '5px',
              '&:hover': {
                backgroundColor: colors.secondary._states.selected,
              },
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box>
      <CarouselIndicators current={currentIndex} total={INSTAGRAM_URLS.length} onChange={handleCarouselChange} />
    </Box>
  );
}
export default InstagramEmbdeSection;