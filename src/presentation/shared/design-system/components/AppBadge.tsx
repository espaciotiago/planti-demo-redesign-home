import { View, type StyleProp, type ViewStyle } from 'react-native';

import { usePlentiTheme } from '../../../theme/PlentiThemeProvider';
import { AppText } from './AppText';

type BadgeTone = 'aqua' | 'success' | 'warning' | 'reward' | 'neutral';

type AppBadgeProps = {
  label: string;
  tone?: BadgeTone;
  style?: StyleProp<ViewStyle>;
};

export function AppBadge({ label, tone = 'neutral', style }: AppBadgeProps) {
  const { theme } = usePlentiTheme();
  const backgrounds: Record<BadgeTone, string> = {
    aqua: theme.mode === 'dark' ? '#073B53' : '#DFFCF7',
    success: theme.mode === 'dark' ? '#063E4A' : '#D9FAF2',
    warning: theme.colors.warning,
    reward: theme.mode === 'dark' ? '#332167' : '#EEE9FF',
    neutral: theme.colors.surfaceElevated,
  };
  const foregrounds: Record<BadgeTone, string> = {
    aqua: theme.mode === 'dark' ? theme.colors.actionPrimary : theme.colors.textPrimary,
    success: theme.mode === 'dark' ? theme.colors.actionPrimary : theme.colors.success,
    warning: theme.colors.actionPrimaryText,
    reward: theme.colors.reward,
    neutral: theme.colors.textSecondary,
  };

  return (
    <View
      style={[
        {
          alignSelf: 'flex-start',
          backgroundColor: backgrounds[tone],
          borderRadius: theme.radii.pill,
          paddingHorizontal: theme.spacing.sm,
          paddingVertical: theme.spacing.xxs,
        },
        style,
      ]}
    >
      <AppText style={{ color: foregrounds[tone] }} variant="caption">
        {label}
      </AppText>
    </View>
  );
}
