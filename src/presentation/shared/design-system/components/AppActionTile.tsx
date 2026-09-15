import { Ionicons } from '@expo/vector-icons';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';

import type { AppIconName } from '../../icons/icon-types';
import { usePlentiTheme } from '../../../theme/PlentiThemeProvider';
import { AppText } from './AppText';

type AppActionTileProps = {
  label: string;
  icon: AppIconName;
  badgeIcon?: AppIconName;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function AppActionTile({
  label,
  icon,
  badgeIcon,
  onPress,
  disabled = false,
  style,
}: AppActionTileProps) {
  const { theme } = usePlentiTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        {
          alignItems: 'center',
          backgroundColor: theme.colors.surfaceElevated,
          borderColor: theme.colors.border,
          borderRadius: theme.radii.md,
          borderWidth: theme.mode === 'dark' ? 1 : 0,
          flex: 1,
          gap: theme.spacing.sm,
          justifyContent: 'center',
          minHeight: 92,
          opacity: disabled ? 0.45 : pressed ? 0.82 : 1,
          paddingHorizontal: theme.spacing.xxs,
          paddingVertical: theme.spacing.sm,
        },
        style,
      ]}
    >
      <View>
        <Ionicons color={theme.colors.textPrimary} name={icon} size={28} />
        {badgeIcon ? (
          <View
            style={{
              alignItems: 'center',
              backgroundColor: theme.colors.surfaceElevated,
              borderColor: theme.colors.textPrimary,
              borderRadius: theme.radii.pill,
              borderWidth: 1.5,
              bottom: -3,
              height: 15,
              justifyContent: 'center',
              position: 'absolute',
              right: -5,
              width: 15,
            }}
          >
            <Ionicons color={theme.colors.textPrimary} name={badgeIcon} size={11} />
          </View>
        ) : null}
      </View>
      <AppText numberOfLines={1} style={{ fontSize: 12, lineHeight: 16 }} variant="label">
        {label}
      </AppText>
    </Pressable>
  );
}
