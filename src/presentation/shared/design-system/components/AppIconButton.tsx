import { Ionicons } from '@expo/vector-icons';
import { Pressable, type StyleProp, type ViewStyle } from 'react-native';

import { usePlentiTheme } from '../../../theme/PlentiThemeProvider';
import type { AppIconName } from '../../icons/icon-types';

type AppIconButtonProps = {
  accessibilityLabel: string;
  icon: AppIconName;
  onPress?: () => void;
  selected?: boolean;
  size?: 'sm' | 'md';
  style?: StyleProp<ViewStyle>;
};

export function AppIconButton({
  accessibilityLabel,
  icon,
  onPress,
  selected = false,
  size = 'md',
  style,
}: AppIconButtonProps) {
  const { theme } = usePlentiTheme();
  const dimension = size === 'sm' ? 36 : 44;

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        {
          alignItems: 'center',
          backgroundColor: selected ? theme.colors.surfaceSelected : theme.colors.surfaceElevated,
          borderColor: theme.colors.border,
          borderRadius: theme.radii.pill,
          borderWidth: 1,
          height: dimension,
          justifyContent: 'center',
          opacity: pressed ? 0.8 : 1,
          width: dimension,
        },
        style,
      ]}
    >
      <Ionicons
        color={selected ? theme.colors.actionPrimary : theme.colors.textPrimary}
        name={icon}
        size={size === 'sm' ? 18 : 22}
      />
    </Pressable>
  );
}
