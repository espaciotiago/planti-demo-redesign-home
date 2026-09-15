import { Ionicons } from '@expo/vector-icons';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';

import { AppSurface, AppText } from '../../../shared/design-system';
import { usePlentiTheme } from '../../../theme/PlentiThemeProvider';

type RewardsPocketSummaryProps = {
  amount: string;
  rate?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function RewardsPocketSummary({
  amount,
  rate = '4% EA',
  onPress,
  style,
}: RewardsPocketSummaryProps) {
  const { theme } = usePlentiTheme();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [{ opacity: pressed ? 0.82 : 1 }, style]}
    >
      <AppSurface
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          gap: theme.spacing.sm,
          padding: theme.spacing.md,
        }}
      >
        <View
          style={{
            alignItems: 'center',
            backgroundColor: theme.mode === 'dark' ? '#332167' : '#EEE9FF',
            borderRadius: theme.radii.pill,
            height: 44,
            justifyContent: 'center',
            width: 44,
          }}
        >
          <Ionicons color={theme.colors.reward} name="gift-outline" size={23} />
        </View>
        <View style={{ flex: 1 }}>
          <AppText variant="bodyMedium">Bolsillo de recompensas</AppText>
          <AppText tone="reward" variant="heading">{amount}</AppText>
          <AppText tone="secondary" variant="caption">{rate}</AppText>
        </View>
        <AppText tone="link" variant="bodyMedium">Ver detalle</AppText>
        <Ionicons color={theme.colors.link} name="chevron-forward" size={20} />
      </AppSurface>
    </Pressable>
  );
}
