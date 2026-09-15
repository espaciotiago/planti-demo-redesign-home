import { createContext, useContext, useMemo, type PropsWithChildren } from 'react';
import { useColorScheme } from 'react-native';

import { plentiThemes, type PlentiTheme } from './plenti-theme';
import type { ThemeMode, ThemePreference } from './theme-mode';

type PlentiThemeContextValue = {
  theme: PlentiTheme;
  preference: ThemePreference;
};

const PlentiThemeContext = createContext<PlentiThemeContextValue | null>(null);

type PlentiThemeProviderProps = PropsWithChildren<{
  preference?: ThemePreference;
}>;

export function PlentiThemeProvider({
  children,
  preference = 'system',
}: PlentiThemeProviderProps) {
  const systemScheme = useColorScheme();
  const mode: ThemeMode =
    preference === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : preference;

  const value = useMemo(
    () => ({ theme: plentiThemes[mode], preference }),
    [mode, preference],
  );

  return <PlentiThemeContext.Provider value={value}>{children}</PlentiThemeContext.Provider>;
}

export function usePlentiTheme() {
  const context = useContext(PlentiThemeContext);

  if (!context) {
    throw new Error('usePlentiTheme must be used inside PlentiThemeProvider.');
  }

  return context;
}
