import { View, type StyleProp, type ViewStyle } from 'react-native';

import {
  AppActionTile,
  AppBadge,
  AppDivider,
  AppListRow,
  AppSurface,
} from '../../../shared/design-system';
import { usePlentiTheme } from '../../../theme/PlentiThemeProvider';
import { PlentiCardModule } from './PlentiCardModule';

type CardManagementPanelProps = {
  onToggleDetails?: () => void;
  onViewDataPress?: () => void;
  onLockPress?: () => void;
  onMorePress?: () => void;
  onAppleWalletPress?: () => void;
  onBillingAddressPress?: () => void;
  onSettingsPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function CardManagementPanel({
  onToggleDetails,
  onViewDataPress,
  onLockPress,
  onMorePress,
  onAppleWalletPress,
  onBillingAddressPress,
  onSettingsPress,
  style,
}: CardManagementPanelProps) {
  const { theme } = usePlentiTheme();

  return (
    <View style={[{ gap: theme.spacing.md }, style]}>
      <PlentiCardModule onPress={onToggleDetails} variant="active-expanded" />
      <View style={{ alignItems: 'center' }}>
        <AppBadge label="●  Activa" tone="success" />
      </View>
      <View style={{ flexDirection: 'row', gap: theme.spacing.xs }}>
        <AppActionTile icon="eye-outline" label="Ver datos" onPress={onViewDataPress} />
        <AppActionTile icon="lock-closed-outline" label="Bloquear" onPress={onLockPress} />
        <AppActionTile icon="ellipsis-horizontal" label="Más" onPress={onMorePress} />
      </View>
      <AppSurface style={{ paddingHorizontal: theme.spacing.md }}>
        <AppListRow
          leadingIcon="wallet-outline"
          onPress={onAppleWalletPress}
          title="Agregar a Apple Wallet"
        />
        <AppDivider inset={56} />
        <AppListRow
          description="Ver dirección"
          leadingIcon="document-text-outline"
          onPress={onBillingAddressPress}
          title="Dirección de facturación"
        />
        <AppDivider inset={56} />
        <AppListRow
          description="Límites, compras en línea y más"
          leadingIcon="settings-outline"
          onPress={onSettingsPress}
          title="Configuración de la tarjeta"
        />
      </AppSurface>
    </View>
  );
}
