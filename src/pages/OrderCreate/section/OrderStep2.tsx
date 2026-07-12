import { Box, Typography, TextField, Button, InputAdornment } from '@mui/material';
import { colors } from '../../../theme/colors';
import { QuestionChips } from '../../../components/QuestionChips';
import { useState } from 'react';
import CarouselIndicators from '../../../components/CarouselIndicators';
import { StepNavigation } from '../../../components/StepNavigation';
import SearchIcon from '@mui/icons-material/Search';

export function OrderStep2() {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const handleChipSelect = (chip: string) => {
        console.log('선택된 칩:', chip);
        setSelectedOption(chip);
    };
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Box
                sx={{
                    width: '100%',
                    height: '645px',
                    backgroundColor: colors.background,
                    px: 4,
                    py: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    textAlign: 'left'
                }}>
                <Typography variant="t4_b" sx={{ color: '#AEAEAE' }}>취향 선택</Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                    }}>
                    <QuestionChips
                        number={1}
                        title="어느 지역에서 구매하시나요?"
                        chips={['강남', '성수', '홍대/상수', '잠실/송파']}
                        onChipSelect={handleChipSelect}
                    />
                    <QuestionChips
                        number={2}
                        title="어떤 형태의 케이크를 원하시나요?"
                        chips={['기본', '도시락', '입체형']}
                        onChipSelect={handleChipSelect}
                    />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4
                    }}>
                    <CarouselIndicators />
                    <StepNavigation
                        onNext={() => console.log('다음')}
                        onPrev={() => console.log('이전')}
                    />
                </Box>
            </Box>
            <Box
                sx={{
                    width: '100%',
                    height: '645px',
                    backgroundColor: colors.background,
                    px: 4,
                    py: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    textAlign: 'left'
                }}>
                <Typography variant="t4_b" sx={{ color: '#AEAEAE' }}>취향 선택</Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                    }}>
                    <QuestionChips
                        number={3}
                        title="원하는 색감이 있나요?"
                        chips={['파스텔', '비비드', '모노톤', '상관없음']}
                        onChipSelect={handleChipSelect}
                    />
                    <QuestionChips
                        number={4}
                        title="원하는 분위기가 있나요?"
                        chips={['화려', '심플', '귀여운', '개성있는']}
                        onChipSelect={handleChipSelect}
                    />
                </Box>
                <CarouselIndicators />
                <StepNavigation
                    onNext={() => console.log('다음')}
                    onPrev={() => console.log('이전')}
                />
            </Box>

            <Box
                sx={{
                    width: '100%',
                    height: '645px',
                    backgroundColor: colors.background,
                    px: 4,
                    py: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    textAlign: 'left'
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
                    }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}>
                        <Typography variant="t4_b" sx={{ color: '#AEAEAE' }}>장식 선택</Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '4px',
                            }}>
                            <Typography variant="t1_b" color="textPrimary">특별히 원하는 장식이 있나요?</Typography>
                            <Typography variant="t3_b" x={{ color: '#9E9E9E' }}>검색해서 추가해보세요!</Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            height: '131px'
                        }}>
                        <TextField 
  placeholder="태그 검색"
  variant='outlined'
  fullWidth
  slotProps={{
    input: {
      endAdornment: (
        <InputAdornment position="end">
          <SearchIcon sx={{ color: '#000', cursor: 'pointer' }} />
        </InputAdornment>
      ),
    },
  }}
/>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4
                    }}>
                    <CarouselIndicators />
                    <Button variant="contained" color="primary" size="xlarge">완료</Button>
                </Box>
            </Box>
        </Box>
    );
}
