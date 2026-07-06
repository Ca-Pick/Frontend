// Border Radius Tokens
export const radius = {
  borderRadius: 4,
  none: 0,
  'radius-small': 6,
  borderRadius: 4,
  'radius-medium': 8,
  'radius-large': 12,
  'radius-xlarge': 16,
  'radius-2xlarge': 24,
  'radius-3xlarge': 32,
  'radius-pill': 9999,
};

// Export for convenience
export const borderRadius = {
  none: radius.none,
  small: radius['radius-small'],
  default: radius['radius-medium'],
  medium: radius['radius-medium'],
  large: radius['radius-large'],
  xl: radius['radius-xlarge'],
  '2xl': radius['radius-2xlarge'],
  '3xl': radius['radius-3xlarge'],
  pill: radius['radius-pill'],
};
