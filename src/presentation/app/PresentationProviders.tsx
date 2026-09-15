import type { PropsWithChildren } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { PlentiThemeProvider } from '../theme/PlentiThemeProvider';
import type { ThemePreference } from '../theme/theme-mode';
import { usePlentiFonts } from '../theme/use-plenti-fonts';

type PresentationProvidersProps = PropsWithChildren<{
  themePreference?: ThemePreference;
}>;

/**
 * Runtime entry point for the presentation layer.
 * Screens should be mounted inside this provider tree.
 */
export function PresentationProviders({
  children,
  themePreference = 'system',
}: PresentationProvidersProps) {
  const [fontsLoaded, fontError] = usePlentiFonts();

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <PlentiThemeProvider preference={themePreference}>{children}</PlentiThemeProvider>
    </SafeAreaProvider>
  );
}
