import { Box, Typography, TextField, InputAdornment, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface TagSearchProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  allChips: string[];
  selectedChips: string[];
  onResultChipClick: (chip: string) => void;
  onSelectedChipDelete: (chip: string) => void;
}

export function TagSearch({
  searchQuery,
  onSearchChange,
  onSearch,
  allChips,
  selectedChips,
  onResultChipClick,
  onSelectedChipDelete,
}: TagSearchProps) {
  const isMinimumLength = searchQuery.length >= 2;
  const filteredChips = isMinimumLength
    ? allChips.filter(chip => chip.includes(searchQuery))
    : [];
  const hasResults = filteredChips.length > 0;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <TextField
        placeholder="태그 검색"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={onSearchChange}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon sx={{ color: '#000', cursor: 'pointer' }} onClick={onSearch} />
              </InputAdornment>
            ),
          },
        }}
      />
      {/* 검색 결과 섹션 */}
      {isMinimumLength && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            maxHeight: '96px',
            overflowY: 'auto',
            borderRadius: '4px'
          }}
        >
          {hasResults ? (
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                flexWrap: 'wrap',
                padding: '16px 15px',
                background: 'rgba(255, 255, 255, 0.80)',
                borderRadius: '16px',
                boxShadow: '0 1px 12px 0 rgba(0, 0, 0, 0.08), 0 1px 1px 0 rgba(0, 0, 0, 0.04), 0 2px 1px -1px rgba(0, 0, 0, 0.04)',
                border: '1px solid #eee'
              }}
            >
              {filteredChips
                .filter(chip => !selectedChips.includes(chip))
                .map((chip) => (
                <Chip
                  key={chip}
                  label={chip}
                  variant="filled"
                  color="default"
                  onClick={() => onResultChipClick(chip)}
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px 15px',
                background: 'rgba(255, 255, 255, 0.80)',
                borderRadius: '16px',
                boxShadow: '0 1px 12px 0 rgba(0, 0, 0, 0.08), 0 1px 1px 0 rgba(0, 0, 0, 0.04), 0 2px 1px -1px rgba(0, 0, 0, 0.04)',
                border: '1px solid #eee'
              }}
            >
              <Typography variant="t4_b" sx={{color: '#000'}}>
                원하는 태그가 없습니다.
              </Typography>
              <Typography variant="b3_b" sx={{ color: '#757575' }}>
                다른 태그를 검색해주세요.
              </Typography>
            </Box>
          )}
        </Box>
      )}

      {/* 선택된 칩 - 항상 표시 */}
      {selectedChips.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            flexWrap: 'wrap',
          }}
        >
          {selectedChips.map((chip) => (
            <Chip
              key={chip}
              label={chip}
              variant="filled"
              color="primary"
              onDelete={() => onSelectedChipDelete(chip)}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
