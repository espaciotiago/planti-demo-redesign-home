import { View, type StyleProp, type ViewStyle } from 'react-native';

import { AppProgressStepper, AppStatusBanner } from '../../../shared/design-system';
import { usePlentiTheme } from '../../../theme/PlentiThemeProvider';

type AccountProgressCardProps = {
  state?: 'pending' | 'approved';
  showProgress?: boolean;
  style?: StyleProp<ViewStyle>;
};

const steps = [
  { label: 'Apertura', state: 'complete' as const },
  { label: 'Verificación', state: 'current' as const },
  { label: 'Recarga', state: 'upcoming' as const },
  { label: 'Plenti Card', state: 'upcoming' as const },
];

export function AccountProgressCard({
  state = 'pending',
  showProgress = state === 'pending',
  style,
}: AccountProgressCardProps) {
  const { theme } = usePlentiTheme();

  return (
    <View style={[{ gap: theme.spacing.md }, style]}>
      {showProgress ? <AppProgressStepper steps={steps} /> : null}
      <AppStatusBanner
        badge={state === 'pending' ? 'Hasta 24 h hábiles' : undefined}
        description={
          state === 'pending'
            ? 'Tu cuenta está casi lista. Estamos revisando tu información. Puede tardar hasta 24 h hábiles.'
            : 'Ya puedes recargar y usar Plenti.'
        }
        icon={state === 'pending' ? 'time-outline' : 'checkmark'}
        title={state === 'pending' ? 'Verificación en proceso de análisis' : 'Tu cuenta está lista'}
        tone={state === 'pending' ? 'warning' : 'success'}
      />
    </View>
  );
}
