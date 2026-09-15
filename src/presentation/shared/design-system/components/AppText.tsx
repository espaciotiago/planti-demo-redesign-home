import { Text, type StyleProp, type TextProps, type TextStyle } from 'react-native';

import { usePlentiTheme } from '../../../theme/PlentiThemeProvider';
import { typography, type TextVariant } from '../foundations/typography';

type TextTone =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'aqua'
  | 'link'
  | 'positive'
  | 'reward'
  | 'danger'
  | 'warning';

type AppTextProps = TextProps & {
  variant?: TextVariant;
  tone?: TextTone;
  style?: StyleProp<TextStyle>;
};

export function AppText({
  variant = 'body',
  tone = 'primary',
  style,
  ...props
}: AppTextProps) {
  const { theme } = usePlentiTheme();

  const toneColor: Record<TextTone, string> = {
    primary: theme.colors.textPrimary,
    secondary: theme.colors.textSecondary,
    tertiary: theme.colors.textTertiary,
    aqua: theme.colors.actionPrimary,
    link: theme.colors.link,
    positive: theme.colors.positive,
    reward: theme.colors.reward,
    danger: theme.colors.danger,
    warning: theme.colors.warning,
  };

  return <Text {...props} style={[typography[variant], { color: toneColor[tone] }, style]} />;
}
