import { Ionicons } from '@expo/vector-icons';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';

import type { AppIconName } from '../../icons/icon-types';
import { usePlentiTheme } from '../../../theme/PlentiThemeProvider';
import { AppText } from './AppText';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

type AppButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  icon?: AppIconName;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export function AppButton({
  label,
  onPress,
  variant = 'primary',
  icon,
  disabled = false,
  fullWidth = true,
  style,
  testID,
}: AppButtonProps) {
  const { theme } = usePlentiTheme();
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const foreground = isPrimary ? theme.colors.actionPrimaryText : theme.colors.actionSecondaryText;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      testID={testID}
      style={({ pressed }) => [
        {
          alignItems: 'center',
          alignSelf: fullWidth ? 'stretch' : 'flex-start',
          backgroundColor: isPrimary
            ? theme.colors.actionPrimary
            : isSecondary
              ? theme.colors.actionSecondary
              : 'transparent',
          borderColor: isSecondary ? theme.colors.actionSecondaryBorder : 'transparent',
          borderRadius: theme.radii.md,
          borderWidth: isSecondary ? 1.5 : 0,
          flexDirection: 'row',
          justifyContent: 'center',
          minHeight: 48,
          opacity: disabled ? 0.45 : pressed ? 0.82 : 1,
          paddingHorizontal: theme.spacing.md,
        },
        style,
      ]}
    >
      <AppText variant="bodyMedium" style={{ color: foreground }}>
        {label}
      </AppText>
      {icon ? (
        <Ionicons
          color={foreground}
          name={icon}
          size={20}
          style={{ position: 'absolute', right: theme.spacing.md }}
        />
      ) : null}
    </Pressable>
  );
}
