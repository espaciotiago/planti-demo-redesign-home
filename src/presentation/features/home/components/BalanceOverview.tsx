import { View, type StyleProp, type ViewStyle } from 'react-native';

import {
  AppAmount,
  AppQuickActionGrid,
  AppSectionHeader,
  AppSurface,
  type QuickAction,
} from '../../../shared/design-system';
import { usePlentiTheme } from '../../../theme/PlentiThemeProvider';

type BalanceOverviewProps = {
  amount: string;
  currency?: string;
  onDetailsPress?: () => void;
  actions?: QuickAction[];
  compact?: boolean;
  style?: StyleProp<ViewStyle>;
};

const defaultActions: QuickAction[] = [
  { id: 'top-up', label: 'Recarga', icon: 'wallet-outline', badgeIcon: 'add' },
  { id: 'transfer', label: 'Transfiere', icon: 'paper-plane-outline' },
  { id: 'invest', label: 'Invierte', icon: 'trending-up-outline' },
  { id: 'pockets', label: 'Bolsillos', icon: 'wallet-outline' },
];

export function BalanceOverview({
  amount,
  currency = 'USD',
  onDetailsPress,
  actions = defaultActions,
  compact = false,
  style,
}: BalanceOverviewProps) {
  const { theme } = usePlentiTheme();

  return (
    <AppSurface
      style={[
        {
          gap: compact ? theme.spacing.md : theme.spacing.lg,
          padding: theme.spacing.md,
        },
        style,
      ]}
    >
      <View style={{ gap: theme.spacing.xs }}>
        {onDetailsPress ? (
          <AppSectionHeader
            actionLabel="Ver detalles"
            onActionPress={onDetailsPress}
            title="Saldo total"
          />
        ) : null}
        <AppAmount
          amount={amount}
          currency={currency}
          label={onDetailsPress ? undefined : 'Saldo total'}
          size={compact ? 'compact' : 'display'}
        />
      </View>
      <AppQuickActionGrid actions={compact ? actions.slice(0, 2) : actions} />
    </AppSurface>
  );
}
