import React, { useState } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { colors } from '../theme/colors';

interface QuestionChipsProps {
  number: string | number;
  title: string;
  chips: string[];
  onChipSelect?: (selectedChip: string) => void;
  selectedValue?: string;
}

export function QuestionChips({
  number,
  title,
  chips,
  onChipSelect,
  selectedValue,
}: QuestionChipsProps) {
  const [selectedChip, setSelectedChip] = useState<string | null>(selectedValue ?? null);

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
              borderColor: colors.primary.main,
              color: selectedChip === chip ? colors.primary.contrastText : colors.text.primary,
              backgroundColor: selectedChip === chip ? colors.primary.main : 'transparent',
              '&:hover': {
                backgroundColor: colors.primary._states.hover,
                color: colors.text.primary
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};
