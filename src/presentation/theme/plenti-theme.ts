import type { ThemeMode } from './theme-mode';

export const spacing = {
  none: 0,
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
} as const;

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
} as const;

const base = {
  brandNavy: '#010C33',
  brandDeepNavy: '#102057',
  brandAqua: '#09F4D2',
  brandPurple: '#6A58FF',
  warning: '#FFE34D',
  success: '#09CFAF',
  danger: '#EB5B62',
} as const;

export type PlentiColors = {
  background: string;
  surface: string;
  surfaceElevated: string;
  surfaceSelected: string;
  border: string;
  divider: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  actionPrimary: string;
  actionPrimaryText: string;
  actionSecondary: string;
  actionSecondaryText: string;
  actionSecondaryBorder: string;
  link: string;
  positive: string;
  success: string;
  warning: string;
  reward: string;
  danger: string;
  navigationInactive: string;
  navigationActive: string;
};

export type PlentiTheme = {
  mode: ThemeMode;
  colors: PlentiColors;
  spacing: typeof spacing;
  radii: typeof radii;
};

const lightColors: PlentiColors = {
  background: '#F8F9FF',
  surface: '#FFFFFF',
  surfaceElevated: '#F3F5FD',
  surfaceSelected: '#DDFCF7',
  border: '#DAE2FF',
  divider: '#E6EAFA',
  textPrimary: base.brandNavy,
  textSecondary: '#6B7695',
  textTertiary: '#8A95B2',
  actionPrimary: base.brandAqua,
  actionPrimaryText: base.brandNavy,
  actionSecondary: '#FFFFFF',
  actionSecondaryText: '#102057',
  actionSecondaryBorder: '#5267FF',
  link: '#145DFF',
  positive: '#00A886',
  success: '#028C75',
  warning: base.warning,
  reward: base.brandPurple,
  danger: '#C53945',
  navigationInactive: '#6F7A96',
  navigationActive: base.brandNavy,
};

const darkColors: PlentiColors = {
  background: base.brandNavy,
  surface: base.brandDeepNavy,
  surfaceElevated: '#162866',
  surfaceSelected: '#073B53',
  border: '#29437F',
  divider: '#29437F',
  textPrimary: '#F8FAFF',
  textSecondary: '#AAB8DE',
  textTertiary: '#8090BC',
  actionPrimary: base.brandAqua,
  actionPrimaryText: base.brandNavy,
  actionSecondary: base.brandDeepNavy,
  actionSecondaryText: '#F8FAFF',
  actionSecondaryBorder: base.brandAqua,
  link: base.brandAqua,
  positive: base.brandAqua,
  success: base.brandAqua,
  warning: base.warning,
  reward: '#8B6CFF',
  danger: '#FF8A91',
  navigationInactive: '#8090BC',
  navigationActive: base.brandAqua,
};

export const plentiThemes: Record<ThemeMode, PlentiTheme> = {
  light: {
    mode: 'light',
    colors: lightColors,
    spacing,
    radii,
  },
  dark: {
    mode: 'dark',
    colors: darkColors,
    spacing,
    radii,
  },
};
