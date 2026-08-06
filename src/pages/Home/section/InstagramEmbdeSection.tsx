import {
  Box,
  Typography,
  Button,
  IconButton,
  CircularProgress
} from '@mui/material';
import { useState } from 'react';
import { colors } from '../../../theme/colors';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CarouselIndicators from '../../../components/CarouselIndicators'
import { InstagramEmbed } from '../../../components/InstagramEmbed';
import { HeartToggle } from '../../../components/HeartToggle';
import { useRecommendedDesserts } from '../../../hooks';

interface InstagramEmbdeSectionProps {
  category: 'birthday' | 'celebration' | 'academic';
  onDetailClick?: (cakeId?: number) => void;
}

function InstagramEmbdeSection({ onDetailClick, category }: InstagramEmbdeSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 3개 카테고리 섹션이 동일한 쿼리 키를 공유 → 요청이 1번으로 합쳐지고(dedupe)
  const { data, isLoading: loading, error: queryError } = useRecommendedDesserts();

  const items = data?.data[category] || [];
  const error = queryError ? '데이터를 불러올 수 없습니다' : null;

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

  const currentItem = items[currentIndex];

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
        width: '100%', display: 'flex', flexDirection: 'column', gap: 1, border: '1px solid #E0E0E0', borderRadius: '16px', boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.04), 0 0 4px 3px rgba(51, 51, 51, 0.02)', position: 'relative', pb: 1, overflow: 'hidden', minHeight: '400px'
      }}>
        {loading ? (
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '400px'
          }}>
            <CircularProgress />
          </Box>
        ) : error || items.length === 0 ? (
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '400px'
          }}>
            <Typography color="error">{error || '이용 가능한 데이터가 없습니다'}</Typography>
          </Box>
        ) : (
          <>
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
                {currentItem && (
                  <HeartToggle
                    referenceId={currentItem.cakeId}
                    initialSaved={currentItem.saved}
                  />
                )}
              </Box>
              <Button size="large" variant="contained" color="secondary" fullWidth onClick={() => onDetailClick?.(currentItem?.cakeId)} sx={{ flex: 1 }}>
                상세보기
              </Button>
            </Box>
          </>
        )}
      </Box>
      {!loading && items.length > 0 && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          {items.length > 1 && (
            <IconButton
              onClick={handlePrevious}
              sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.10)',
                borderRadius: '50%',
                padding: '5px',
                color: colors.secondary.main,
                '&:hover': {
                  backgroundColor: 'rgba(125, 125, 125, 0.60)',
                },
              }}
            >
              <ChevronLeftIcon sx={{ color: `${colors.secondary.main} !important` }}/>
            </IconButton>
          )}
          <CarouselIndicators current={currentIndex} total={items.length} onChange={handleCarouselChange} />
          {items.length > 1 && (
            <IconButton
              onClick={handleNext}
              sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.10)',
                borderRadius: '50%',
                padding: '5px',
                color: colors.secondary.main,
                '&:hover': {
                  backgroundColor: 'rgba(125, 125, 125, 0.60)',
                },
              }}
            >
              <ChevronRightIcon sx={{ color: `${colors.secondary.main} !important` }}/>
            </IconButton>
          )}
        </Box>
      )}
    </Box>
  );
}
export default InstagramEmbdeSection;