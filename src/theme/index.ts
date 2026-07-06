import { createTheme } from '@mui/material/styles';
import { colors } from './colors';
import { borderRadius } from './radius';
import { spacingArray, spacingMultiplier } from './spacing';
import { typographyConfig } from './typography';

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
      main: colors.secondary.main,
      dark: colors.secondary.dark,
      contrastText: colors.secondary.contrastText,
    },
    background: {
      default: colors.background.default,
      paper: colors.background.paper,
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
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        size: 'md',
      },
      variants: [
        // Contained variant
        {
          props: { variant: 'contained', size: 'sm' },
          style: {
            padding: '4px 10px',
            fontSize: 13,
            height: 27,
            minHeight: 27,
          },
        },
        {
          props: { variant: 'contained', size: 'md' },
          style: {
            padding: '6px 16px',
            fontSize: 14,
            height: 32,
            minHeight: 32,
          },
        },
        {
          props: { variant: 'contained', size: 'lg' },
          style: {
            padding: '8px 22px',
            fontSize: 15,
            height: 38,
            minHeight: 38,
          },
        },
        {
          props: { variant: 'contained', size: 'xl' },
          style: {
            padding: '14px 24px',
            fontSize: 16,
            height: 48,
            minHeight: 48,
          },
        },
        // Outlined variant
        {
          props: { variant: 'outlined', size: 'sm' },
          style: {
            padding: '4px 10px',
            fontSize: 13,
            height: 27,
            minHeight: 27,
          },
        },
        {
          props: { variant: 'outlined', size: 'md' },
          style: {
            padding: '6px 16px',
            fontSize: 14,
            height: 32,
            minHeight: 32,
          },
        },
        {
          props: { variant: 'outlined', size: 'lg' },
          style: {
            padding: '8px 22px',
            fontSize: 15,
            height: 38,
            minHeight: 38,
          },
        },
        {
          props: { variant: 'outlined', size: 'xl' },
          style: {
            padding: '14px 24px',
            fontSize: 16,
            height: 48,
            minHeight: 48,
          },
        },
        // Text variant
        {
          props: { variant: 'text', size: 'sm' },
          style: {
            padding: '4px 10px',
            fontSize: 13,
            height: 27,
            minHeight: 27,
          },
        },
        {
          props: { variant: 'text', size: 'md' },
          style: {
            padding: '6px 16px',
            fontSize: 14,
            height: 32,
            minHeight: 32,
          },
        },
        {
          props: { variant: 'text', size: 'lg' },
          style: {
            padding: '8px 22px',
            fontSize: 15,
            height: 38,
            minHeight: 38,
          },
        },
        {
          props: { variant: 'text', size: 'xl' },
          style: {
            padding: '14px 24px',
            fontSize: 16,
            height: 48,
            minHeight: 48,
          },
        },
      ],
      styleOverrides: {
        root: {
          borderRadius: borderRadius.medium,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
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
            borderRadius: borderRadius.medium,
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
  },
});

export default theme;
