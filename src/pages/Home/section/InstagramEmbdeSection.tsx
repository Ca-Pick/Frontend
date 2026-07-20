import {
  Box,
  Typography,
  Button,
  IconButton
} from '@mui/material';
import { useState } from 'react';
import { colors } from '../../../theme/colors';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CarouselIndicators from '../../../components/CarouselIndicators'
import { InstagramEmbed } from '../../../components/InstagramEmbed';
import { HeartToggle } from '../../../components/HeartToggle';

interface InstagramEmbdeSectionProps {
  category: 'birthday' | 'celebration' | 'academic';
  onDetailClick?: () => void;
}

// 더미 데이터 - API 연동 시 이 부분만 교체하면 됨
const DUMMY_CURATION_DATA = {
  birthday: [
    {
      cakeId: 1,
      instagramEmbed: "https://www.instagram.com/p/DFxF4K8yG6D/"
    },
    {
      cakeId: 3,
      instagramEmbed: "https://www.instagram.com/p/DaR64RlMKE1/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
    }
  ],
  celebration: [
    {
      cakeId: 2,
      instagramEmbed: "https://www.instagram.com/p/DaDC3ckTr7v/?utm_source=ig_web_copy_link"
    },
    {
      cakeId: 4,
      instagramEmbed: "https://www.instagram.com/p/DY1O9Vlsp1G/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
    }
  ],
  academic: [
    {
      cakeId: 5,
      instagramEmbed: "https://www.instagram.com/p/DY6Oq7evBJg/"
    },
    {
      cakeId: 6,
      instagramEmbed: "https://www.instagram.com/p/DVnW9tCkZHs/"
    }
  ],
};

function InstagramEmbdeSection({ onDetailClick, category }: InstagramEmbdeSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = DUMMY_CURATION_DATA[category] || [];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const handleCarouselChange = (index: number) => {
    setCurrentIndex(index);
  };

  const categoryLabel = {
    birthday: '최고의 생일이 되기를 #생일 케이크',
    celebration: '오늘 같은 날 필요한 건? #기념일 케이크',
    academic: '새로운 페이지를 응원해! #입학 #졸업 케이크'
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
        {categoryLabel[category]}
      </Typography>
      <Box sx={{
        width: '100%', display: 'flex', flexDirection: 'column', gap: 1, border: '1px solid #E0E0E0', borderRadius: '16px', boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.04), 0 0 4px 3px rgba(51, 51, 51, 0.02)', position: 'relative', pb: 1, overflow: 'hidden'
      }}>
        <Box sx={{
          width: '100%',
          display: 'flex',
          transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transform: `translateX(-${currentIndex * 100}%)`,
        }}>
          {items.map((item) => (
            <Box key={item.cakeId} sx={{ minWidth: '100%' }}>
              <InstagramEmbed url={item.instagramEmbed} />
            </Box>
          ))}
        </Box>
        <Box sx={{
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          width: '100%',
          px: 2,
        }}>
          <Box sx={{ width: '41px', height: '37px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: `1px solid ${colors.divider}`, borderRadius: '6px' }} >
            <HeartToggle />
          </Box>
          <Button size="large" variant="contained" color="secondary" fullWidth onClick={onDetailClick} sx={{ flex: 1 }}>
            상세보기
          </Button>
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
      <CarouselIndicators current={currentIndex} total={items.length} onChange={handleCarouselChange} />
    </Box>
  );
}
export default InstagramEmbdeSection;