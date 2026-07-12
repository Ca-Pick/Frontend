import React, { useState } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { colors } from '../theme/colors';

interface QuestionChipsProps {
  number: string | number;
  title: string;
  chips: string[];
  onChipSelect?: (selectedChip: string) => void;
}

export function QuestionChips({
  number,
  title,
  chips,
  onChipSelect,
}: QuestionChipsProps) {
  const [selectedChip, setSelectedChip] = useState<string | null>(null);

  const handleChipClick = (chip: string) => {
    setSelectedChip(chip);
    onChipSelect?.(chip);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '136px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Typography variant='b2_b' color="primary">
          {`0${number}.`}
        </Typography>
        <Typography variant='t2_b' color="textPrimary">
          {title}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, height: '56px' }}>
        {chips.map((chip) => (
          <Chip
            key={chip}
            variant="outlined"
            color="primary"
            label={chip}
            onClick={() => handleChipClick(chip)}
            sx={{
              cursor: 'pointer',
              borderColor: colors.primary.main,
              color: selectedChip === chip ? colors.primary.contrastText : colors.primary.main,
              backgroundColor: selectedChip === chip ? colors.primary.main : 'transparent',
              '&:hover': {
                backgroundColor: selectedChip === chip ? colors.primary.dark : colors.primary._states.hover,
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};
