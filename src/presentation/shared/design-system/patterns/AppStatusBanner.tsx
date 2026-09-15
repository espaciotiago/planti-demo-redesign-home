import { Ionicons } from '@expo/vector-icons';
import { View, type StyleProp, type ViewStyle } from 'react-native';

import type { AppIconName } from '../../icons/icon-types';
import { usePlentiTheme } from '../../../theme/PlentiThemeProvider';
import { AppBadge } from '../components/AppBadge';
import { AppSurface } from '../components/AppSurface';
import { AppText } from '../components/AppText';

type StatusBannerTone = 'success' | 'warning' | 'info';

type AppStatusBannerProps = {
  title: string;
  description?: string;
  icon: AppIconName;
  tone?: StatusBannerTone;
  badge?: string;
  style?: StyleProp<ViewStyle>;
};

export function AppStatusBanner({
  title,
  description,
  icon,
  tone = 'info',
  badge,
  style,
}: AppStatusBannerProps) {
  const { theme } = usePlentiTheme();
  const accent: Record<StatusBannerTone, string> = {
    success: theme.colors.actionPrimary,
    warning: theme.colors.warning,
    info: theme.colors.actionPrimary,
  };

  return (
    <AppSurface
      style={[
        {
          borderColor: tone === 'success' ? accent[tone] : theme.colors.border,
          flexDirection: 'row',
          gap: theme.spacing.md,
          padding: theme.spacing.md,
        },
        style,
      ]}
      variant="default"
    >
      <View
        style={{
          alignItems: 'center',
          backgroundColor:
            tone === 'success'
              ? theme.mode === 'dark'
                ? '#063E4A'
                : '#DFFCF7'
              : theme.colors.surfaceElevated,
          borderRadius: theme.radii.pill,
          height: 44,
          justifyContent: 'center',
          width: 44,
        }}
      >
        <Ionicons color={accent[tone]} name={icon} size={23} />
      </View>
      <View style={{ flex: 1, gap: theme.spacing.xxs }}>
        <AppText variant="heading">{title}</AppText>
        {description ? <AppText tone="secondary">{description}</AppText> : null}
        {badge ? <AppBadge label={badge} tone={tone === 'warning' ? 'warning' : 'aqua'} /> : null}
      </View>
    </AppSurface>
  );
}
