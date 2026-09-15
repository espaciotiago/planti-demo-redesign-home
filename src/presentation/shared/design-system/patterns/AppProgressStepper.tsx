import { Ionicons } from '@expo/vector-icons';
import { View, type StyleProp, type ViewStyle } from 'react-native';

import type { AppIconName } from '../../icons/icon-types';
import { usePlentiTheme } from '../../../theme/PlentiThemeProvider';
import { AppText } from '../components/AppText';

export type ProgressStepState = 'complete' | 'current' | 'upcoming';

export type ProgressStep = {
  label: string;
  state: ProgressStepState;
  icon?: AppIconName;
};

type AppProgressStepperProps = {
  steps: ProgressStep[];
  style?: StyleProp<ViewStyle>;
};

export function AppProgressStepper({ steps, style }: AppProgressStepperProps) {
  const { theme } = usePlentiTheme();

  const getColor = (state: ProgressStepState) => {
    if (state === 'complete') return theme.colors.actionPrimary;
    if (state === 'current') return theme.colors.warning;
    return theme.colors.navigationInactive;
  };

  return (
    <View style={[{ flexDirection: 'row' }, style]}>
      {steps.map((step, index) => {
        const color = getColor(step.state);
        const isLast = index === steps.length - 1;
        const icon =
          step.icon ?? (step.state === 'complete' ? 'checkmark' : step.state === 'current' ? 'time-outline' : undefined);

        return (
          <View key={step.label} style={{ alignItems: 'center', flex: 1, gap: theme.spacing.xs }}>
            <View style={{ alignItems: 'center', flexDirection: 'row', width: '100%' }}>
              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: step.state === 'upcoming' ? theme.colors.surfaceElevated : color,
                  borderRadius: theme.radii.pill,
                  height: 32,
                  justifyContent: 'center',
                  marginLeft: index === 0 ? 0 : 2,
                  width: 32,
                }}
              >
                {icon ? (
                  <Ionicons color={step.state === 'upcoming' ? theme.colors.textPrimary : theme.colors.actionPrimaryText} name={icon} size={17} />
                ) : (
                  <AppText variant="bodyMedium">{index + 1}</AppText>
                )}
              </View>
              {!isLast ? (
                <View
                  style={{
                    backgroundColor: step.state === 'complete' ? theme.colors.actionPrimary : theme.colors.border,
                    flex: 1,
                    height: 2,
                    marginHorizontal: theme.spacing.xs,
                  }}
                />
              ) : null}
            </View>
            <AppText
              numberOfLines={1}
              style={{ fontSize: 11, lineHeight: 14, textAlign: 'center' }}
              tone={step.state === 'upcoming' ? 'tertiary' : 'primary'}
              variant="label"
            >
              {step.label}
            </AppText>
          </View>
        );
      })}
    </View>
  );
}
