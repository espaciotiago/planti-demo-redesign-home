import { View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';

import { usePlentiTheme } from '../../../theme/PlentiThemeProvider';

type SurfaceVariant = 'default' | 'elevated' | 'selected' | 'transparent';

type AppSurfaceProps = ViewProps & {
  variant?: SurfaceVariant;
  bordered?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function AppSurface({
  variant = 'default',
  bordered = true,
  style,
  ...props
}: AppSurfaceProps) {
  const { theme } = usePlentiTheme();
  const backgrounds: Record<SurfaceVariant, string> = {
    default: theme.colors.surface,
    elevated: theme.colors.surfaceElevated,
    selected: theme.colors.surfaceSelected,
    transparent: 'transparent',
  };

  return (
    <View
      {...props}
      style={[
        {
          backgroundColor: backgrounds[variant],
          borderColor: bordered ? theme.colors.border : 'transparent',
          borderRadius: theme.radii.lg,
          borderWidth: bordered ? 1 : 0,
        },
        style,
      ]}
    />
  );
}
