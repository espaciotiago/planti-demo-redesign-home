import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';

import { usePlentiTheme } from '../../../theme/PlentiThemeProvider';
import { AppText } from '../components/AppText';

type AppSectionHeaderProps = {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function AppSectionHeader({
  title,
  actionLabel,
  onActionPress,
  style,
}: AppSectionHeaderProps) {
  const { theme } = usePlentiTheme();

  return (
    <View
      style={[
        {
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        style,
      ]}
    >
      <AppText variant="title">{title}</AppText>
      {actionLabel ? (
        <Pressable accessibilityRole="button" onPress={onActionPress}>
          <AppText tone="link" variant="bodyMedium">
            {actionLabel}
          </AppText>
        </Pressable>
      ) : null}
    </View>
  );
}
