import { useState } from 'react';

import { PresentationProviders } from './src/presentation/app/PresentationProviders';
import { DesignSystemGalleryScreen } from './src/presentation/features/design-system/screens/DesignSystemGalleryScreen';
import type { ThemePreference } from './src/presentation/theme/theme-mode';

export default function App() {
  const [themePreference, setThemePreference] = useState<ThemePreference>('system');

  return (
    <PresentationProviders themePreference={themePreference}>
      <DesignSystemGalleryScreen
        onThemePreferenceChange={setThemePreference}
        themePreference={themePreference}
      />
    </PresentationProviders>
  );
}
