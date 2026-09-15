import { Ionicons } from '@expo/vector-icons';
import { View, type StyleProp, type ViewStyle } from 'react-native';

import {
  AppBadge,
  AppDivider,
  AppSectionHeader,
  AppSurface,
  AppText,
} from '../../../shared/design-system';
import { usePlentiTheme } from '../../../theme/PlentiThemeProvider';

export type MovementItem = {
  id: string;
  title: string;
  date: string;
  amount: string;
  direction: 'in' | 'out';
  icon?: 'arrow-down-outline' | 'bag-outline' | 'paper-plane-outline';
};

type MovementsSectionProps = {
  items?: MovementItem[];
  onViewAllPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function MovementsSection({
  items = [],
  onViewAllPress,
  style,
}: MovementsSectionProps) {
  const { theme } = usePlentiTheme();
  const isEmpty = items.length === 0;

  return (
    <AppSurface style={[{ padding: theme.spacing.md }, style]}>
      <AppSectionHeader
        actionLabel={isEmpty ? undefined : 'Ver todos'}
        onActionPress={onViewAllPress}
        title="Movimientos"
      />
      {isEmpty ? (
        <View style={{ alignItems: 'center', gap: theme.spacing.sm, paddingVertical: theme.spacing.lg }}>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: theme.colors.surfaceElevated,
              borderRadius: theme.radii.pill,
              height: 52,
              justifyContent: 'center',
              width: 52,
            }}
          >
            <Ionicons color={theme.colors.textPrimary} name="card-outline" size={26} />
          </View>
          <AppText tone="secondary">Aún no tienes movimientos</AppText>
        </View>
      ) : (
        <View style={{ marginTop: theme.spacing.xs }}>
          {items.map((item, index) => (
            <View key={item.id}>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  gap: theme.spacing.sm,
                  minHeight: 84,
                }}
              >
                <View
                  style={{
                    alignItems: 'center',
                    backgroundColor:
                      item.direction === 'in'
                        ? theme.mode === 'dark' ? '#063E4A' : '#D9FAF2'
                        : theme.mode === 'dark' ? '#332167' : '#EEE9FF',
                    borderRadius: theme.radii.pill,
                    height: 44,
                    justifyContent: 'center',
                    width: 44,
                  }}
                >
                  <Ionicons
                    color={item.direction === 'in' ? theme.colors.positive : theme.colors.reward}
                    name={item.icon ?? (item.direction === 'in' ? 'arrow-down-outline' : 'bag-outline')}
                    size={22}
                  />
                </View>
                <View style={{ flex: 1, gap: 1 }}>
                  <AppText variant="bodyMedium">{item.title}</AppText>
                  <AppText tone="secondary" variant="caption">{item.date}</AppText>
                  <AppBadge label="Completada" tone="success" />
                </View>
                <AppText tone={item.direction === 'in' ? 'positive' : 'primary'} variant="bodyMedium">
                  {item.direction === 'in' ? '+ ' : '- '}{item.amount}
                </AppText>
              </View>
              {index < items.length - 1 ? <AppDivider inset={56} /> : null}
            </View>
          ))}
        </View>
      )}
    </AppSurface>
  );
}
