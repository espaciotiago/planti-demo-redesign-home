import { View, type StyleProp, type ViewStyle } from 'react-native';

import type { AppIconName } from '../../icons/icon-types';
import { usePlentiTheme } from '../../../theme/PlentiThemeProvider';
import { AppActionTile } from '../components/AppActionTile';

export type QuickAction = {
  id: string;
  label: string;
  icon: AppIconName;
  badgeIcon?: AppIconName;
  onPress?: () => void;
  disabled?: boolean;
};

type AppQuickActionGridProps = {
  actions: QuickAction[];
  style?: StyleProp<ViewStyle>;
};

export function AppQuickActionGrid({ actions, style }: AppQuickActionGridProps) {
  const { theme } = usePlentiTheme();

  return (
    <View style={[{ flexDirection: 'row', gap: theme.spacing.xs }, style]}>
      {actions.map((action) => (
        <AppActionTile
          disabled={action.disabled}
          badgeIcon={action.badgeIcon}
          icon={action.icon}
          key={action.id}
          label={action.label}
          onPress={action.onPress}
        />
      ))}
    </View>
  );
}
