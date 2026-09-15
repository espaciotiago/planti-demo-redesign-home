import { View, type StyleProp, type ViewStyle } from 'react-native';

import { usePlentiTheme } from '../../../theme/PlentiThemeProvider';
import { AppText } from './AppText';

type AppAmountProps = {
  label?: string;
  amount: string;
  currency?: string;
  size?: 'display' | 'large' | 'compact';
  tone?: 'primary' | 'aqua' | 'reward';
  style?: StyleProp<ViewStyle>;
};

export function AppAmount({
  label,
  amount,
  currency,
  size = 'large',
  tone = 'primary',
  style,
}: AppAmountProps) {
  const { theme } = usePlentiTheme();
  const sizes = {
    display: 40,
    large: 36,
    compact: 24,
  } as const;
  const lineHeights = {
    display: 46,
    large: 43,
    compact: 30,
  } as const;

  return (
    <View style={[{ gap: theme.spacing.xxs }, style]}>
      {label ? <AppText tone="secondary" variant="bodyMedium">{label}</AppText> : null}
      <AppText
        tone={tone}
        variant="display"
        style={{ fontSize: sizes[size], lineHeight: lineHeights[size] }}
      >
        {amount}
      </AppText>
      {currency ? <AppText tone="secondary" variant="bodyMedium">{currency}</AppText> : null}
    </View>
  );
}
