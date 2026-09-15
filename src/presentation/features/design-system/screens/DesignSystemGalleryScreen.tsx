import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  AppAmount,
  AppBadge,
  AppBottomNavigation,
  AppButton,
  AppDivider,
  AppListRow,
  AppProgressStepper,
  AppQuickActionGrid,
  AppSectionHeader,
  AppStatusBanner,
  AppSurface,
  AppText,
} from '../../../shared/design-system';
import { usePlentiTheme } from '../../../theme/PlentiThemeProvider';
import type { ThemePreference } from '../../../theme/theme-mode';

type DesignSystemGalleryScreenProps = {
  themePreference: ThemePreference;
  onThemePreferenceChange: (preference: ThemePreference) => void;
};

const navigationItems = [
  { id: 'home', label: 'Home', icon: 'home-outline' as const },
  { id: 'pockets', label: 'Bolsillos', icon: 'wallet-outline' as const },
  { id: 'transfers', label: 'Transfiere', icon: 'paper-plane-outline' as const },
  { id: 'investments', label: 'Invierte', icon: 'trending-up-outline' as const },
];

const quickActions = [
  { id: 'top-up', label: 'Recarga', icon: 'wallet-outline' as const, badgeIcon: 'add' as const },
  { id: 'transfer', label: 'Transfiere', icon: 'paper-plane-outline' as const },
  { id: 'invest', label: 'Invierte', icon: 'trending-up-outline' as const },
  { id: 'pockets', label: 'Bolsillos', icon: 'wallet-outline' as const },
];

export function DesignSystemGalleryScreen({
  themePreference,
  onThemePreferenceChange,
}: DesignSystemGalleryScreenProps) {
  const { theme } = usePlentiTheme();

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <StatusBar style={theme.mode === 'dark' ? 'light' : 'dark'} />
      <ScrollView
        contentContainerStyle={{
          gap: theme.spacing.lg,
          padding: theme.spacing.md,
          paddingBottom: theme.spacing.xxxl,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: theme.spacing.xs }}>
          <AppText variant="title">Plenti Design System</AppText>
          <AppText tone="secondary">
            Galería temporal para validar componentes, estados y tokens antes de montar Home.
          </AppText>
        </View>

        <AppSurface style={{ gap: theme.spacing.sm, padding: theme.spacing.sm }} variant="elevated">
          <AppText tone="secondary" variant="caption">
            Apariencia
          </AppText>
          <View style={{ flexDirection: 'row', gap: theme.spacing.xs }}>
            {(['light', 'dark', 'system'] as ThemePreference[]).map((preference) => {
              const selected = preference === themePreference;

              return (
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  key={preference}
                  onPress={() => onThemePreferenceChange(preference)}
                  style={({ pressed }) => ({
                    alignItems: 'center',
                    backgroundColor: selected ? theme.colors.actionPrimary : theme.colors.surface,
                    borderColor: selected ? theme.colors.actionPrimary : theme.colors.border,
                    borderRadius: theme.radii.pill,
                    borderWidth: 1,
                    flex: 1,
                    minHeight: 40,
                    justifyContent: 'center',
                    opacity: pressed ? 0.78 : 1,
                    paddingHorizontal: theme.spacing.xs,
                  })}
                >
                  <AppText
                    style={{ color: selected ? theme.colors.actionPrimaryText : theme.colors.textSecondary }}
                    variant="label"
                  >
                    {preference === 'system' ? 'Sistema' : preference === 'light' ? 'Light' : 'Dark'}
                  </AppText>
                </Pressable>
              );
            })}
          </View>
        </AppSurface>

        <View style={{ gap: theme.spacing.sm }}>
          <AppSectionHeader title="Tipografía y color" />
          <AppSurface style={{ gap: theme.spacing.sm, padding: theme.spacing.md }}>
            <AppText variant="display">$250.00</AppText>
            <AppText variant="heading">El dinero se mueve contigo</AppText>
            <AppText tone="secondary">
              Texto de cuerpo para validar legibilidad, jerarquía y contraste en cada modo.
            </AppText>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.xs }}>
              <AppBadge label="Aqua / acción" tone="aqua" />
              <AppBadge label="4% EA" tone="reward" />
              <AppBadge label="Pendiente" tone="warning" />
              <AppBadge label="Completada" tone="success" />
            </View>
          </AppSurface>
        </View>

        <View style={{ gap: theme.spacing.sm }}>
          <AppSectionHeader title="Acciones" />
          <View style={{ gap: theme.spacing.sm }}>
            <AppButton icon="arrow-forward" label="Recargar ahora" />
            <AppButton icon="arrow-forward" label="Obtener mi Plenti Card" variant="secondary" />
            <AppButton label="Acción terciaria" variant="tertiary" />
          </View>
        </View>

        <View style={{ gap: theme.spacing.sm }}>
          <AppSectionHeader title="Estado de cuenta" />
          <AppProgressStepper
            steps={[
              { label: 'Apertura', state: 'complete' },
              { label: 'Verificación', state: 'current' },
              { label: 'Recarga', state: 'upcoming' },
              { label: 'Plenti Card', state: 'upcoming' },
            ]}
          />
          <AppStatusBanner
            badge="Hasta 24 h hábiles"
            description="Estamos revisando tu información. Te avisaremos cuando esté lista."
            icon="time-outline"
            title="Verificación en proceso de análisis"
            tone="warning"
          />
        </View>

        <View style={{ gap: theme.spacing.sm }}>
          <AppSectionHeader actionLabel="Ver detalles" title="Saldo y acciones" />
          <AppSurface style={{ gap: theme.spacing.lg, padding: theme.spacing.md }}>
            <AppAmount amount="$250.00" currency="USD" label="Saldo total" />
            <AppDivider />
            <AppQuickActionGrid actions={quickActions} />
          </AppSurface>
        </View>

        <View style={{ gap: theme.spacing.sm }}>
          <AppSectionHeader actionLabel="Ver todos" title="Movimientos" />
          <AppSurface style={{ paddingHorizontal: theme.spacing.md }}>
            <AppListRow
              description="Hoy, 9:42 a. m. · Completada"
              leadingIcon="arrow-down-outline"
              title="Recarga"
              trailing={<AppText tone="positive" variant="bodyMedium">+ $250.00</AppText>}
            />
            <AppDivider inset={56} />
            <AppListRow
              description="Ayer · Completada"
              leadingIcon="paper-plane-outline"
              title="Transferencia"
              trailing={<AppText variant="bodyMedium">- $35.00</AppText>}
            />
          </AppSurface>
        </View>

        <View style={{ gap: theme.spacing.sm }}>
          <AppSectionHeader title="Navegación" />
          <AppBottomNavigation items={navigationItems} selectedId="home" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
