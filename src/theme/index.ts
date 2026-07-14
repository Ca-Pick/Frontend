import { createTheme } from '@mui/material/styles';
import { colors } from './colors';
import { borderRadius } from './radius';
import { spacingArray } from './spacing';
import { typographyConfig, headingStyles, titleStyles, bodyStyles } from './typography';

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    grey: true;
  }
}

const theme = createTheme({
  spacing: spacingArray,
  typography: typographyConfig,
  palette: {
    mode: 'light',
    primary: {
      light: colors.primary.light,
      main: colors.primary.main,
      dark: colors.primary.dark,
      contrastText: colors.primary.contrastText,
    },
    secondary: {
      light: colors.secondary.light,
      main: colors.secondary.lighter,
      dark: colors.secondary.dark,
      contrastText: colors.secondary.contrastText,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
      disabled: colors.text.disabled,
    },
    divider: colors.divider,
    success: {
      main: '#2E7D32',
      contrastText: colors.success.contrastText,
    },
    warning: {
      main: '#EF6C00',
      contrastText: colors.warning.contrastText,
    },
    error: {
      main: '#D32F2F',
      contrastText: colors.error.contrastText,
    },
    info: {
      main: '#0288D1',
      contrastText: colors.info.contrastText,
    },
  },
  components: {
    MuiTypography: {
      variants: [
        // Heading variants
        { props: { variant: 'h1_b' as const }, style: { ...headingStyles.h1_b } },
        { props: { variant: 'h1_m' as const }, style: { ...headingStyles.h1_m } },
        { props: { variant: 'h1_r' as const }, style: { ...headingStyles.h1_r } },
        { props: { variant: 'h2_b' as const }, style: { ...headingStyles.h2_b } },
        { props: { variant: 'h2_m' as const }, style: { ...headingStyles.h2_m } },
        { props: { variant: 'h2_r' as const }, style: { ...headingStyles.h2_r } },
        { props: { variant: 'h3_b' as const }, style: { ...headingStyles.h3_b } },
        { props: { variant: 'h3_m' as const }, style: { ...headingStyles.h3_m } },
        // Title variants
        { props: { variant: 't1_lm' as const }, style: { ...titleStyles.t1_lm } },
        { props: { variant: 't1_l' as const }, style: { ...titleStyles.t1_l } },
        { props: { variant: 't1_r' as const }, style: { ...titleStyles.t1_r } },
        { props: { variant: 't1_b' as const }, style: { ...titleStyles.t1_b } },
        { props: { variant: 't2_b' as const }, style: { ...titleStyles.t2_b } },
        { props: { variant: 't2_r' as const }, style: { ...titleStyles.t2_r } },
        { props: { variant: 't2_m' as const }, style: { ...titleStyles.t2_m } },
        { props: { variant: 't3_b' as const }, style: { ...titleStyles.t3_b } },
        { props: { variant: 't3_m' as const }, style: { ...titleStyles.t3_m } },
        { props: { variant: 't3_r' as const }, style: { ...titleStyles.t3_r } },
        { props: { variant: 't4_b' as const }, style: { ...titleStyles.t4_b } },
        { props: { variant: 't4_m' as const }, style: { ...titleStyles.t4_m } },
        // Body variants
        { props: { variant: 'b1_m' as const }, style: { ...bodyStyles.b1_m } },
        { props: { variant: 'b2_r' as const }, style: { ...bodyStyles.b2_r } },
        { props: { variant: 'b2_b' as const }, style: { ...bodyStyles.b2_b } },
        { props: { variant: 'b2_m' as const }, style: { ...bodyStyles.b2_m } },
        { props: { variant: 'body_b3_b' as const }, style: { ...bodyStyles.body_b3_b } },
        { props: { variant: 'body_b3_m' as const }, style: { ...bodyStyles.body_b3_m } },
        { props: { variant: 'body_b3_r' as const }, style: { ...bodyStyles.body_b3_r } },
        { props: { variant: 'label_1' as const }, style: { ...bodyStyles.label_1 } },
        { props: { variant: 'label_2' as const }, style: { ...bodyStyles.label_2 } },
        { props: { variant: 'label_3' as const }, style: { ...bodyStyles.label_3 } },
        { props: { variant: 'label_4' as const }, style: { ...bodyStyles.label_4 } },
      ] as unknown as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    },
    MuiButton: {
      defaultProps: {
        size: 'medium',
      },
      variants: [
        {
          props: { variant: 'contained', color: 'grey' },
          style: {
            backgroundColor: '#EEE',
            color: colors.secondary.main,
            '&:hover': {
              backgroundColor: '#E0E0E0',
              color: colors.secondary.main,
            },
            '&:active': {
              backgroundColor: '#BDBDBD',
              color: '#837C78',
            },
            '&.Mui-disabled': {
              backgroundColor: '#EEE',
              color: colors.secondary.main,
            },
          },
        },
        {
          props: { size: 'small' },
          style: {
            padding: '4px 10px',
            borderRadius: borderRadius.small,
            fontSize: bodyStyles.label_4.fontSize,
            fontWeight: bodyStyles.label_4.fontWeight,
            lineHeight: bodyStyles.label_4.lineHeight,
            '& .MuiSvgIcon-root': {
              fontSize: '18px',
            },
          },
        },
        {
          props: { size: 'medium' },
          style: {
            padding: '6px 16px',
            borderRadius: borderRadius.medium,
            fontSize: bodyStyles.label_3.fontSize,
            fontWeight: bodyStyles.label_3.fontWeight,
            lineHeight: bodyStyles.label_3.lineHeight,
            '& .MuiSvgIcon-root': {
              fontSize: '20px',
            },
          },
        },
        {
          props: { size: 'large' },
          style: {
            padding: '8px 22px',
            borderRadius: borderRadius.large,
            fontSize: bodyStyles.label_2.fontSize,
            fontWeight: bodyStyles.label_2.fontWeight,
            lineHeight: bodyStyles.label_2.lineHeight,
            '& .MuiSvgIcon-root': {
              fontSize: '22px',
            },
          },
        },
        {
          props: { size: 'xlarge', variant: 'contained' },
          style: {
            height: '48px',
            padding: '14px 24px',
            borderRadius: borderRadius.xl,
            fontSize: bodyStyles.label_1.fontSize,
            fontWeight: bodyStyles.label_1.fontWeight,
            lineHeight: bodyStyles.label_1.lineHeight,
            '& .MuiSvgIcon-root': {
              fontSize: '22px',
            },
          },
        },
        {
          props: { size: 'xlarge', variant: 'outlined' },
          style: {
            height: '48px',
            padding: '14px 24px',
            borderRadius: borderRadius.xl,
            fontSize: bodyStyles.label_1.fontSize,
            fontWeight: bodyStyles.label_1.fontWeight,
            lineHeight: bodyStyles.label_1.lineHeight,
            '& .MuiSvgIcon-root': {
              fontSize: '22px',
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          flex: '0 0 auto',
          display: 'inline-flex',
          textTransform: 'none',
          boxShadow: 'none',
          width: 'auto',
          minWidth: 0,
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: borderRadius['3xl'],
            backgroundColor: '#EEE',
          },
          '& .MuiOutlinedInput-input::placeholder': {
            fontSize: titleStyles.t3_b.fontSize,
            fontWeight: titleStyles.t3_b.fontWeight,
            lineHeight: titleStyles.t3_b.lineHeight,
            color: '#9E9E9E',
            opacity: 1,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.large,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiSvgIcon: {
      defaultProps: {
        fontSize: 'inherit',
      },
      styleOverrides: {
        root: {
          fontSize: '24px',
        },
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: 'medium',
      },
      styleOverrides: {
        root: {
          borderRadius: '100px',
          backgroundColor: colors.action.hover,
          padding: spacingArray[1],
          '& .MuiSvgIcon-root': {
            color: colors.action.enabel,
          },
          '&:hover': {
            backgroundColor: colors.action.hover,
            '& .MuiSvgIcon-root': {
              color: colors.action.active,
            },
          },
          '&.Mui-focusVisible': {
            backgroundColor: colors.text._states.focus,
            '& .MuiSvgIcon-root': {
              color: colors.action.active,
            },
          },
          '&:active': {
            backgroundColor: colors.text._states.focus,
            '& .MuiSvgIcon-root': {
              color: colors.action.active,
            },
          },
        },
      },
    },
    MuiChip: {
      defaultProps: {
        size: 'medium',
      },
      styleOverrides: {
        root: {
          ...bodyStyles.label_4,
          padding: '0 8px',
          minWidth: '47px',
          textAlign: 'center',
        },
        label: {
          padding: 0,
          margin: 0,
          marginLeft: 0,
          marginRight: 0,
        },
        deleteIcon: {
          margin: 0,
          marginLeft: '4px',
        },
        sizeMedium: {
          height: '32px',
        },
        sizeSmall: {
          height: '24px',
        },
      },
      variants: [
        {
          props: { variant: 'filled', color: 'primary' },
          style: {
            border: `1px solid ${colors.primary.main}`,
            color: colors.text.primary,
            backgroundColor: 'transparent',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: colors.primary._states.hover,
            },
            '&.MuiChip-clickable:focus': {
              backgroundColor: colors.primary._states.focus,
            },
            '&.MuiChip-filled': {
              backgroundColor: colors.primary.main,
              color: colors.primary.contrastText,
            },
          },
        },
        {
          props: { variant: 'static' },
          style: {
            height: '24px',
            backgroundColor: 'rgba(255, 239, 239, 0.70)',
            color: colors.primary.main,
            border: 'none',
            cursor: 'default',
            '&:hover': {
              backgroundColor: 'rgba(255, 239, 239, 0.70)',
            },
          },
        },
      ],
    },
  },
});

export default theme;
