import {
  Box,
  Typography,
  Button,
  IconButton,
  CircularProgress
} from '@mui/material';
import { useState, useEffect } from 'react';
import { colors } from '../../../theme/colors';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CarouselIndicators from '../../../components/CarouselIndicators'
import { InstagramEmbed } from '../../../components/InstagramEmbed';
import { HeartToggle } from '../../../components/HeartToggle';
import { getRecommendedDesserts } from '../../../api/services/referenceService';
import type { RecommendedDessert } from '../../../types/api';

interface InstagramEmbdeSectionProps {
  category: 'birthday' | 'celebration' | 'academic';
  onDetailClick?: (cakeId?: number) => void;
}

function InstagramEmbdeSection({ onDetailClick, category }: InstagramEmbdeSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [items, setItems] = useState<RecommendedDessert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurations = async () => {
      try {
        setLoading(true);
        const data = await getRecommendedDesserts();
        const categoryItems = data.data[category] || [];
        setItems(categoryItems);
        setError(null);
      } catch (err) {
        console.error('홈 큐레이션 데이터 로드 실패:', err);
        setError('데이터를 불러올 수 없습니다');
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCurations();
  }, [category]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const handleCarouselChange = (index: number) => {
    setCurrentIndex(index);
  };

  const handleHeartToggle = (isSaved: boolean) => {
    // 저장 상태 업데이트 (선택사항)
    if (items[currentIndex]) {
      const updatedItems = [...items];
      updatedItems[currentIndex].saved = isSaved;
      setItems(updatedItems);
    }
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
                    onClick={handleHeartToggle}
                  />
                )}
              </Box>
              <Button size="large" variant="contained" color="secondary" fullWidth onClick={() => onDetailClick?.(currentItem?.cakeId)} sx={{ flex: 1 }}>
                상세보기
              </Button>
              {items.length > 1 && (
                <>
                  <IconButton
                    onClick={handlePrevious}
                    sx={{
                      position: 'absolute',
                      left: 3.789,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      backgroundColor: 'rgba(255, 255, 255, 0.60)',
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
                  <IconButton
                    onClick={handleNext}
                    sx={{
                      position: 'absolute',
                      right: 4.211,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      backgroundColor: 'rgba(255, 255, 255, 0.60)',
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
                </>
              )}
            </Box>
          </>
        )}
      </Box>
      {!loading && items.length > 0 && <CarouselIndicators current={currentIndex} total={items.length} onChange={handleCarouselChange} />}
    </Box>
  );
}
export default InstagramEmbdeSection;