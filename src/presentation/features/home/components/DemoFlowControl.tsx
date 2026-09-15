import { Ionicons } from '@expo/vector-icons';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';

import { AppSurface, AppText } from '../../../shared/design-system';
import { usePlentiTheme } from '../../../theme/PlentiThemeProvider';
import type { HomeDemoStage } from '../types/home-demo-state';

type DemoFlowControlProps = {
  stage: HomeDemoStage;
  onNext: () => void;
  onReset: () => void;
  style?: StyleProp<ViewStyle>;
};

const nextLabels: Record<HomeDemoStage, string> = {
  'verification-pending': 'Aprobar cuenta',
  'verified-empty-balance': 'Hacer recarga',
  'funded-without-card': 'Activar tarjeta',
  'active-card-collapsed': 'Abrir tarjeta',
  'active-card-expanded': 'Volver a Home',
};

export function DemoFlowControl({ stage, onNext, onReset, style }: DemoFlowControlProps) {
  const { theme } = usePlentiTheme();

  return (
    <AppSurface
      style={[
        {
          alignItems: 'center',
          alignSelf: 'center',
          borderRadius: theme.radii.pill,
          flexDirection: 'row',
          gap: theme.spacing.xs,
          padding: theme.spacing.xxs,
          paddingLeft: theme.spacing.sm,
          shadowColor: '#000000',
          shadowOffset: { height: 4, width: 0 },
          shadowOpacity: theme.mode === 'dark' ? 0.28 : 0.12,
          shadowRadius: 10,
        },
        style,
      ]}
    >
      <AppText tone="secondary" variant="caption">Demo</AppText>
      <Pressable
        accessibilityLabel="Reiniciar demo"
        accessibilityRole="button"
        onPress={onReset}
        style={({ pressed }) => ({
          alignItems: 'center',
          height: 36,
          justifyContent: 'center',
          opacity: pressed ? 0.7 : 1,
          width: 36,
        })}
      >
        <Ionicons color={theme.colors.textSecondary} name="refresh-outline" size={19} />
      </Pressable>
      <Pressable
        accessibilityRole="button"
        onPress={onNext}
        style={({ pressed }) => ({
          alignItems: 'center',
          backgroundColor: theme.colors.actionPrimary,
          borderRadius: theme.radii.pill,
          flexDirection: 'row',
          gap: theme.spacing.xs,
          minHeight: 36,
          opacity: pressed ? 0.78 : 1,
          paddingHorizontal: theme.spacing.sm,
        })}
      >
        <AppText style={{ color: theme.colors.actionPrimaryText }} variant="label">
          {nextLabels[stage]}
        </AppText>
        <Ionicons color={theme.colors.actionPrimaryText} name="play-forward" size={17} />
      </Pressable>
    </AppSurface>
  );
}
