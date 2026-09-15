import { View, type StyleProp, type ViewStyle } from 'react-native';

import { usePlentiTheme } from '../../../theme/PlentiThemeProvider';

type AppDividerProps = {
  inset?: number;
  style?: StyleProp<ViewStyle>;
};

export function AppDivider({ inset = 0, style }: AppDividerProps) {
  const { theme } = usePlentiTheme();

  return (
    <View
      style={[
        {
          backgroundColor: theme.colors.divider,
          height: 1,
          marginLeft: inset,
        },
        style,
      ]}
    />
  );
}
