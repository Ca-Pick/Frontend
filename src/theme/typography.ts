// Typography Styles
export const fontFamily = 'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif';

export const fontWeights = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
};

// Heading Styles
export const headingStyles = {
  h1_b: {
    fontSize: 36,
    lineHeight: 1.3,
    fontWeight: fontWeights.bold,
  },
  h1_m: {
    fontSize: 36,
    lineHeight: 1.3,
    fontWeight: fontWeights.medium,
  },
  h1_r: {
    fontSize: 36,
    lineHeight: 1.3,
    fontWeight: fontWeights.normal,
  },
  h2_b: {
    fontSize: 32,
    lineHeight: 1.3,
    fontWeight: fontWeights.bold,
  },
  h2_m: {
    fontSize: 32,
    lineHeight: 1.3,
    fontWeight: fontWeights.medium,
  },
  h2_r: {
    fontSize: 32,
    lineHeight: 1.3,
    fontWeight: fontWeights.normal,
  },
  h3_b: {
    fontSize: 28,
    lineHeight: 1.4,
    fontWeight: fontWeights.bold,
  },
  h3_m: {
    fontSize: 28,
    lineHeight: 1.4,
    fontWeight: fontWeights.medium,
  },
};

// Title Styles (T1, T2, T3, T4)
export const titleStyles = {
  t1_lm: {
    fontSize: 24,
    lineHeight: 1.4,
    fontWeight: fontWeights.light,
  },
  t1_l: {
    fontSize: 24,
    lineHeight: 1.4,
    fontWeight: fontWeights.light,
  },
  t1_r: {
    fontSize: 24,
    lineHeight: 1.4,
    fontWeight: fontWeights.normal,
  },
  t2_b: {
    fontSize: 20,
    lineHeight: 1.4,
    fontWeight: fontWeights.bold,
  },
  t2_r: {
    fontSize: 20,
    lineHeight: 1.4,
    fontWeight: fontWeights.normal,
  },
  t2_m: {
    fontSize: 20,
    lineHeight: 1.4,
    fontWeight: fontWeights.medium,
  },
  t3_b: {
    fontSize: 18,
    lineHeight: 1.4,
    fontWeight: fontWeights.bold,
  },
  t3_m: {
    fontSize: 18,
    lineHeight: 1.4,
    fontWeight: fontWeights.medium,
  },
  t3_r: {
    fontSize: 18,
    lineHeight: 1.4,
    fontWeight: fontWeights.normal,
  },
  t4_m: {
    fontSize: 16,
    lineHeight: 1.4,
    fontWeight: fontWeights.medium,
  },
};

// Body/Label Styles
export const bodyStyles = {
  body_b3_b: {
    fontSize: 13,
    lineHeight: 1.45,
    fontWeight: fontWeights.bold,
  },
  body_b3_m: {
    fontSize: 13,
    lineHeight: 1.45,
    fontWeight: fontWeights.medium,
  },
  body_b3_r: {
    fontSize: 13,
    lineHeight: 1.45,
    fontWeight: fontWeights.normal,
  },
  label_1: {
    fontSize: 16,
    lineHeight: 1.4,
    fontWeight: fontWeights.semibold,
  },
  label_2: {
    fontSize: 15,
    lineHeight: 1.4,
    fontWeight: fontWeights.semibold,
  },
  label_3: {
    fontSize: 14,
    lineHeight: 1.4,
    fontWeight: fontWeights.medium,
  },
  label_4: {
    fontSize: 13,
    lineHeight: 1.4,
    fontWeight: fontWeights.medium,
  },
};

// MUI Typography Config
export const typographyConfig = {
  fontFamily,
  // 기본 variants
  h1: { ...headingStyles.h1_b },
  h2: { ...headingStyles.h2_b },
  h3: { ...headingStyles.h3_b },
  h4: { ...titleStyles.t1_r },
  h5: { ...titleStyles.t2_r },
  h6: { ...titleStyles.t3_r },
  body1: { ...bodyStyles.body_b3_r },
  body2: { ...bodyStyles.label_3 },
  button: { ...titleStyles.t3_m, textTransform: 'none' },
  caption: { ...bodyStyles.label_4 },
  overline: { ...bodyStyles.label_1 },

  // Heading variants
  h1_b: { ...headingStyles.h1_b },
  h1_m: { ...headingStyles.h1_m },
  h1_r: { ...headingStyles.h1_r },
  h2_b: { ...headingStyles.h2_b },
  h2_m: { ...headingStyles.h2_m },
  h2_r: { ...headingStyles.h2_r },
  h3_b: { ...headingStyles.h3_b },
  h3_m: { ...headingStyles.h3_m },

  // Title variants
  t1_lm: { ...titleStyles.t1_lm },
  t1_l: { ...titleStyles.t1_l },
  t1_r: { ...titleStyles.t1_r },
  t2_b: { ...titleStyles.t2_b },
  t2_r: { ...titleStyles.t2_r },
  t2_m: { ...titleStyles.t2_m },
  t3_b: { ...titleStyles.t3_b },
  t3_m: { ...titleStyles.t3_m },
  t3_r: { ...titleStyles.t3_r },
  t4_m: { ...titleStyles.t4_m },

  // Body variants
  body_b3_b: { ...bodyStyles.body_b3_b },
  body_b3_m: { ...bodyStyles.body_b3_m },
  body_b3_r: { ...bodyStyles.body_b3_r },
  label_1: { ...bodyStyles.label_1 },
  label_2: { ...bodyStyles.label_2 },
  label_3: { ...bodyStyles.label_3 },
  label_4: { ...bodyStyles.label_4 },
} as const;
