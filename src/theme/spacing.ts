// Spacing Tokens (in pixels)
export const spacing = {
  '0.5': 4,
  '1': 8,
  '1.5': 12,
  '2': 16,
  '3': 24,
  '4': 32,
  '5': 40,
  '6': 48,
  '7': 56,
  '8': 64,
  '9': 72,
  '10': 80,
  '11': 88,
  '12': 96,
};

// Export as array for MUI spacing
export const spacingArray = [
  0,
  spacing['0.5'],   // 1 (4px)
  spacing['1'],     // 2 (8px)
  spacing['1.5'],   // 3 (12px)
  spacing['2'],     // 4 (16px)
  spacing['3'],     // 5 (24px)
  spacing['4'],     // 6 (32px)
  spacing['5'],     // 7 (40px)
  spacing['6'],     // 8 (48px)
  spacing['7'],     // 9 (56px)
  spacing['8'],     // 10 (64px)
  spacing['9'],     // 11 (72px)
  spacing['10'],    // 12 (80px)
  spacing['11'],    // 13 (88px)
  spacing['12'],    // 14 (96px)
];

// For convenience
export const spacingMultiplier = {
  xs: spacing['0.5'],
  sm: spacing['1'],
  md: spacing['2'],
  lg: spacing['3'],
  xl: spacing['4'],
  '2xl': spacing['5'],
  '3xl': spacing['6'],
  '4xl': spacing['7'],
  '5xl': spacing['8'],
  '6xl': spacing['9'],
  '7xl': spacing['10'],
  '8xl': spacing['11'],
  '9xl': spacing['12'],
};
