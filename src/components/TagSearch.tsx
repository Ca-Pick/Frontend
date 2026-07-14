import { Box, Typography, TextField, InputAdornment, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface TagSearchProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  resultChips: string[];
  selectedChips: string[];
  onResultChipClick: (chip: string) => void;
  onSelectedChipDelete: (chip: string) => void;
}

export function TagSearch({
  searchQuery,
  onSearchChange,
  onSearch,
  resultChips,
  selectedChips,
  onResultChipClick,
  onSelectedChipDelete,
}: TagSearchProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        height: '131px',
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
      {searchQuery ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {/* 검색 결과 칩 */}
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              flexWrap: 'wrap',
            }}
          >
            {resultChips.map((chip) => (
              <Chip
                key={chip}
                label={chip}
                variant="filled"
                color={selectedChips.includes(chip) ? 'primary' : 'default'}
                onClick={() => onResultChipClick(chip)}
                sx={{
                  cursor: 'pointer',
                  ...(selectedChips.includes(chip) && {
                    '& .MuiChip-deleteIcon': {
                      display: 'flex',
                    },
                  }),
                }}
                deleteIcon={selectedChips.includes(chip) ? undefined : null}
              />
            ))}
          </Box>
          {/* 선택된 칩 */}
          {selectedChips.length > 0 && (
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                flexWrap: 'wrap',
                pt: 1,
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
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            alignItems: 'center',
            justifyContent: 'center',
            py: 4,
            backgroundColor: '#F5F5F5',
            borderRadius: '8px',
          }}
        >
          <Typography variant="t3_b" color="textPrimary">
            원하는 태그가 없습니다.
          </Typography>
          <Typography variant="t4_m" sx={{ color: '#9E9E9E' }}>
            다른 태그를 검색해주세요.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
