import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { colors } from '../../../theme/colors';
import { QuestionChips } from '../../../components/QuestionChips';
import { useState, useEffect } from 'react';
import CarouselIndicators from '../../../components/CarouselIndicators';
import { StepNavigation } from '../../../components/StepNavigation';
import { TagSearch } from '../../../components/TagSearch';
import { useDetailTags } from '../../../hooks';

interface OrderStep2Props {
  currentStep?: number;
  onNext?: () => void;
  onPrev?: () => void;
  onComplete?: () => void;
  onCarouselChange?: (index: number) => void;
  selectedTags?: string[];
  onTagsChange?: (tags: string[]) => void;
  onRecipientChange?: (recipient: string) => void;
  onCakeTypeChange?: (type: string) => void;
  onColorChange?: (color: string) => void;
  onMoodChange?: (mood: string) => void;
  selectedRecipient?: string;
  selectedCakeType?: string;
  selectedColor?: string;
  selectedMood?: string;
  isLoading?: boolean;
}

export function OrderStep2({ currentStep = 2, onNext, onPrev, onComplete, onCarouselChange, selectedTags = [], onTagsChange, onRecipientChange, onCakeTypeChange, onColorChange, onMoodChange, selectedRecipient = '', selectedCakeType = '', selectedColor = '', selectedMood = '', isLoading = false }: OrderStep2Props) {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedChips, setSelectedChips] = useState<string[]>(selectedTags);

    const { data: tagsData, isLoading: tagsLoading, error: tagsError } = useDetailTags();
    const allAvailableChips = tagsData?.data.decorations || [];

    const handleChipSelect = (chip: string) => {
        console.log('선택된 칩:', chip);
        setSelectedOption(chip);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        // 실제 검색 로직은 여기에 추가
    };

    const handleSearch = () => {
        console.log('검색:', searchQuery);
    };

    const handleResultChipClick = (chip: string) => {
        setSelectedChips(prev => {
            let updated: string[];
            if (prev.includes(chip)) {
                updated = prev.filter(c => c !== chip);
            } else {
                updated = [...prev, chip];
            }
            onTagsChange?.(updated);
            return updated;
        });
    };

    const handleSelectedChipDelete = (chip: string) => {
        setSelectedChips(prev => {
            const updated = prev.filter(c => c !== chip);
            onTagsChange?.(updated);
            return updated;
        });
    };

    useEffect(() => {
        setSelectedChips(selectedTags);
    }, [selectedTags]);

    if (tagsError) {
        return (
            <Box
                sx={{
                    width: '100%',
                    height: 'calc(100vh - 72px)',
                    backgroundColor: colors.background,
                    px: 4,
                    py: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Alert severity="error">태그 데이터를 불러오는데 실패했습니다.</Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ width: '100%' }}>
            {currentStep === 2 && (
                <Box
                    sx={{
                        width: '100%',
                        height: 'calc(100vh - 72px)',
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
                            title="누구를 위한 케이크인가요?"
                            chips={['친구', '가족', '동료', '연인', '서포트']}
                            selectedValue={selectedRecipient}
                            onChipSelect={(chip) => {
                                handleChipSelect(chip);
                                onRecipientChange?.(chip);
                            }}
                        />
                        <QuestionChips
                            number={2}
                            title="어떤 형태의 케이크를 원하시나요?"
                            chips={['기본형', '도시락형', '입체형']}
                            selectedValue={selectedCakeType}
                            onChipSelect={(chip) => {
                                handleChipSelect(chip);
                                onCakeTypeChange?.(chip);
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 4
                        }}>
                        <CarouselIndicators current={1} total={4} onChange={onCarouselChange} />
                        <StepNavigation
                            onNext={() => onNext?.()}
                            onPrev={() => onPrev?.()}
                            nextDisabled={!selectedRecipient || !selectedCakeType}
                        />
                    </Box>
                </Box>
            )}

            {currentStep === 3 && (
                <Box
                    sx={{
                        width: '100%',
                        height: 'calc(100vh - 72px)',
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
                            chips={['파스텔', '비비드', '모노톤']}
                            selectedValue={selectedColor}
                            onChipSelect={(chip) => {
                                handleChipSelect(chip);
                                onColorChange?.(chip);
                            }}
                        />
                        <QuestionChips
                            number={4}
                            title="원하는 분위기가 있나요?"
                            chips={['화려', '심플', '귀여운', '개성있는']}
                            selectedValue={selectedMood}
                            onChipSelect={(chip) => {
                                handleChipSelect(chip);
                                onMoodChange?.(chip);
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 4
                        }}>
                        <CarouselIndicators current={2} total={4} onChange={onCarouselChange} />
                        <StepNavigation
                            onNext={() => onNext?.()}
                            onPrev={() => onPrev?.()}
                            nextDisabled={!selectedColor || !selectedMood}
                        />
                    </Box>
                </Box>
            )}

            {currentStep === 4 && (
                <Box
                    sx={{
                        width: '100%',
                        height: 'calc(100vh - 72px)',
                        backgroundColor: colors.background,
                        px: 4,
                        py: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        textAlign: 'left'
                    }}>
                    {tagsLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <>
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
                                            gap: 1,
                                        }}>
                                        <Typography variant="t1_b" color="textPrimary">특별히 원하는 장식이 있나요?</Typography>
                                        <Typography variant="t3_b" sx={{ color: '#9E9E9E' }}>검색해서 추가해보세요!</Typography>
                                    </Box>
                                </Box>
                                <TagSearch
                                    searchQuery={searchQuery}
                                    onSearchChange={handleSearchChange}
                                    onSearch={handleSearch}
                                    allChips={allAvailableChips}
                                    selectedChips={selectedChips}
                                    onResultChipClick={handleResultChipClick}
                                    onSelectedChipDelete={handleSelectedChipDelete}
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 4
                                }}>
                                <CarouselIndicators current={3} total={4} onChange={onCarouselChange} />
                                <StepNavigation
                                    onNext={() => onComplete?.()}
                                    onPrev={() => onPrev?.()}
                                    nextLabel={isLoading ? '검색 중...' : '완료'}
                                    nextDisabled={isLoading}
                                />
                            </Box>
                        </>
                    )}
                </Box>
            )}
        </Box>
    );
}
