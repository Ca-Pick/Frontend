// Clutch Design System - Color Palette (Light Mode)
// Exported from Figma Design Tokens - light.tokens.json

export const colors = {
  divider: 'rgba(0, 0, 0, 0.12)',

  interaction: {
    hover: '#2196F3',
    selected: 'rgba(33, 150, 243, 0.08)',
    focus: 'rgba(33, 150, 243, 0.12)',
    focusvisible: 'rgba(33, 150, 243, 0.3)',
  },

  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.6)',
    disabled: 'rgba(0, 0, 0, 0.38)',
    _states: {
      hover: 'rgba(0, 0, 0, 0.04)',
      selected: 'rgba(0, 0, 0, 0.08)',
      focus: 'rgba(0, 0, 0, 0.12)',
      focusVisible: 'rgba(0, 0, 0, 0.3)',
    },
  },

  primary: {
    main: '#AD2426',
    dark: '#9C2022',
    darker: '#8A1D1E',
    light: '#D44547',
    lightPink: '#D57F89',
    contrastText: '#FFFFFF',
    _states: {
      hover: 'rgba(173, 36, 38, 0.04)',
      selected: 'rgba(173, 36, 38, 0.08)',
      focus: 'rgba(173, 36, 38, 0.12)',
      focusVisible: 'rgba(173, 36, 38, 0.3)',
      outlinedBorder: 'rgba(173, 36, 38, 0.5)',
    },
  },

  secondary: {
    main: '#4E443F',
    dark: '#322B29',
    light: '#695C55',
    lighter: '#85736C',
    contrastText: '#FFFFFF',
    _states: {
      selected: 'rgba(78, 68, 63, 0.08)',
      focus: 'rgba(78, 68, 63, 0.12)',
      focusVisible: 'rgba(78, 68, 63, 0.3)',
      hover: 'rgba(78, 68, 63, 0.04)',
      outlinedBorder: 'rgba(78, 68, 63, 0.5)',
    },
  },

  action: {
    active: 'rgba(0, 0, 0, 0.54)',
    hover: 'rgba(0, 0, 0, 0.04)',
    selected: 'rgba(0, 0, 0, 0.08)',
    focus: 'rgba(0, 0, 0, 0.12)',
    disabled: 'rgba(0, 0, 0, 0.26)',
    disabledBackground: 'rgba(0, 0, 0, 0.12)',
    'active-light': 'rgba(0, 0, 0, 0.06)',
  },

  error: {
    contrastText: '#FFFFFF',
    _states: {
      hover: 'rgba(211, 47, 47, 0.04)',
      selected: 'rgba(211, 47, 47, 0.08)',
      focusVisible: 'rgba(211, 47, 47, 0.3)',
      outlinedBorder: 'rgba(211, 47, 47, 0.5)',
    },
  },

  warning: {
    contrastText: '#FFFFFF',
    _states: {
      hover: 'rgba(239, 108, 0, 0.04)',
      selected: 'rgba(239, 108, 0, 0.08)',
      focusVisible: 'rgba(239, 108, 0, 0.3)',
      outlinedBorder: 'rgba(239, 108, 0, 0.5)',
    },
  },

  info: {
    contrastText: '#FFFFFF',
    _states: {
      hover: 'rgba(2, 136, 209, 0.04)',
      selected: 'rgba(2, 136, 209, 0.08)',
      focusVisible: 'rgba(2, 136, 209, 0.3)',
      outlinedBorder: 'rgba(2, 136, 209, 0.5)',
    },
  },

  success: {
    contrastText: '#FFFFFF',
    _states: {
      hover: 'rgba(46, 125, 50, 0.04)',
      selected: 'rgba(46, 125, 50, 0.08)',
      focusVisible: 'rgba(46, 125, 50, 0.3)',
      outlinedBorder: 'rgba(46, 125, 50, 0.5)',
    },
  },

  common: {
    black: {
      _states: {
        main: '#000000',
        hover: 'rgba(0, 0, 0, 0.04)',
        selected: 'rgba(0, 0, 0, 0.08)',
        focus: 'rgba(0, 0, 0, 0.12)',
        focusVisible: 'rgba(0, 0, 0, 0.3)',
        outlinedBorder: 'rgba(0, 0, 0, 0.5)',
      },
    },
    white: {
      _states: {
        main: '#FFFFFF',
        hover: 'rgba(255, 255, 255, 0.04)',
        selected: 'rgba(255, 255, 255, 0.08)',
        focus: 'rgba(255, 255, 255, 0.12)',
        focusVisible: 'rgba(255, 255, 255, 0.3)',
        outlinedBorder: 'rgba(255, 255, 255, 0.5)',
      },
    },
  },

  _components: {
    paper: {
      outlineBorder: 'rgba(0, 0, 0, 0.12)',
      elevation: {
        0: '#FFFFFF',
        1: '#FFFFFF',
        2: '#FFFFFF',
        3: '#FFFFFF',
        4: '#FFFFFF',
        5: '#FFFFFF',
        6: '#FFFFFF',
        7: '#FFFFFF',
        8: '#FFFFFF',
        9: '#FFFFFF',
        10: '#FFFFFF',
        11: '#FFFFFF',
        12: '#FFFFFF',
        13: '#FFFFFF',
        14: '#FFFFFF',
        15: '#FFFFFF',
        16: '#FFFFFF',
        17: '#FFFFFF',
        18: '#FFFFFF',
        19: '#FFFFFF',
        20: '#FFFFFF',
        21: '#FFFFFF',
        22: '#FFFFFF',
        23: '#FFFFFF',
        24: '#FFFFFF',
      },
    },
    input: {
      standard: {
        enabledBorder: 'rgba(0, 0, 0, 0.42)',
        hoverBorder: '#000000',
      },
      filled: {
        enabledFill: 'rgba(0, 0, 0, 0.06)',
        hoverFill: 'rgba(0, 0, 0, 0.09)',
      },
      outlined: {
        enabledBorder: 'rgba(0, 0, 0, 0.23)',
        hoverBorder: '#000000',
      },
    },
    switch: {
      slideFill: '#000000',
    },
    rating: {
      enabledBorder: 'rgba(0, 0, 0, 0.23)',
      activeFill: '#FFB400',
    },
    snackbar: {
      fill: '#323232',
    },
    chip: {
      defaultCloseFill: '#000000',
      defaultHoverFill: 'rgba(0, 0, 0, 0.12)',
      defaultFocusFill: 'rgba(0, 0, 0, 0.2)',
    },
    tooltip: {
      fill: 'rgba(97, 97, 97, 0.9)',
    },
    backdrop: {
      fill: 'rgba(0, 0, 0, 0.5)',
    },
    alert: {
      error: {
        color: '#5F2120',
        background: '#FDEDED',
      },
      warning: {
        color: '#663C00',
        background: '#FFF4E5',
      },
      info: {
        color: '#014361',
        background: '#E5F6FD',
      },
      success: {
        color: '#1E4620',
        background: '#EDF7ED',
      },
    },
  },

  background: {
    default: '#FFFFFF',
    paper: '#FFFFFF',
    root: '#FBF4E7',
  },
};

// Export specific color groups for convenience
export const primaryColors = colors.primary;
export const secondaryColors = colors.secondary;
export const textColors = colors.text;
export const actionColors = colors.action;
