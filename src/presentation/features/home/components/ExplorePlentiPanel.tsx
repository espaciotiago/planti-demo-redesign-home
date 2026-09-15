import { View, type StyleProp, type ViewStyle } from 'react-native';

import { AppDivider, AppListRow, AppSurface, AppText } from '../../../shared/design-system';
import { usePlentiTheme } from '../../../theme/PlentiThemeProvider';

type ExplorePlentiPanelProps = {
  onTopUpPress?: () => void;
  onInvestmentsPress?: () => void;
  onPocketsPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function ExplorePlentiPanel({
  onTopUpPress,
  onInvestmentsPress,
  onPocketsPress,
  style,
}: ExplorePlentiPanelProps) {
  const { theme } = usePlentiTheme();

  return (
    <AppSurface style={[{ padding: theme.spacing.md }, style]}>
      <View style={{ gap: theme.spacing.xxs, marginBottom: theme.spacing.sm }}>
        <AppText variant="heading">Explora Plenti mientras validamos tu cuenta</AppText>
        <AppText tone="secondary">Conoce las funciones. Te avisaremos cuando puedas operar.</AppText>
      </View>
      <AppListRow
        description="Aprende a añadir saldo a tu cuenta."
        leadingIcon="wallet-outline"
        onPress={onTopUpPress}
        title="Cómo recargar"
      />
      <AppDivider inset={56} />
      <AppListRow
        description="Conoce cómo hacer crecer tu dinero."
        leadingIcon="trending-up-outline"
        onPress={onInvestmentsPress}
        title="Explora inversiones"
      />
      <AppDivider inset={56} />
      <AppListRow
        description="Organiza tu dinero para tus metas."
        leadingIcon="wallet-outline"
        onPress={onPocketsPress}
        title="Descubre los Bolsillos"
      />
    </AppSurface>
  );
}
