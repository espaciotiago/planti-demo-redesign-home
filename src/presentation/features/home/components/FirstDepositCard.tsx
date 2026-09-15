import { Ionicons } from '@expo/vector-icons';
import { View, type StyleProp, type ViewStyle } from 'react-native';

import { AppButton, AppSurface, AppText } from '../../../shared/design-system';
import { usePlentiTheme } from '../../../theme/PlentiThemeProvider';

type FirstDepositCardProps = {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function FirstDepositCard({ onPress, style }: FirstDepositCardProps) {
  const { theme } = usePlentiTheme();

  return (
    <AppSurface style={[{ gap: theme.spacing.md, padding: theme.spacing.md }, style]}>
      <View style={{ alignItems: 'flex-start', flexDirection: 'row', gap: theme.spacing.sm }}>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: theme.colors.surfaceElevated,
            borderRadius: theme.radii.pill,
            height: 44,
            justifyContent: 'center',
            width: 44,
          }}
        >
          <Ionicons color={theme.colors.textPrimary} name="arrow-down-outline" size={24} />
        </View>
        <View style={{ flex: 1, gap: theme.spacing.xxs }}>
          <AppText variant="heading">Haz tu primera recarga</AppText>
          <AppText tone="secondary">
            Agrega saldo para transferir, invertir, usar Bolsillos o pagar con tu Plenti Card.
          </AppText>
        </View>
      </View>
      <AppButton icon="chevron-forward" label="Recargar ahora" onPress={onPress} />
    </AppSurface>
  );
}
