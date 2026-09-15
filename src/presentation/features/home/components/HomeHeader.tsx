import { Ionicons } from '@expo/vector-icons';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';

import { AppText, PlentiMark } from '../../../shared/design-system';
import { usePlentiTheme } from '../../../theme/PlentiThemeProvider';

type HomeHeaderProps = {
  name: string;
  hasUnreadNotifications?: boolean;
  onNotificationsPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function HomeHeader({
  name,
  hasUnreadNotifications = false,
  onNotificationsPress,
  style,
}: HomeHeaderProps) {
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
      <View style={{ alignItems: 'center', flexDirection: 'row', gap: theme.spacing.sm }}>
        <PlentiMark />
        <AppText variant="title">Hola {name}</AppText>
      </View>

      <Pressable
        accessibilityLabel="Notificaciones"
        accessibilityRole="button"
        onPress={onNotificationsPress}
        style={({ pressed }) => ({
          alignItems: 'center',
          height: 44,
          justifyContent: 'center',
          opacity: pressed ? 0.72 : 1,
          width: 44,
        })}
      >
        <Ionicons color={theme.colors.textPrimary} name="notifications-outline" size={27} />
        {hasUnreadNotifications ? (
          <View
            style={{
              backgroundColor: theme.colors.actionPrimary,
              borderColor: theme.colors.background,
              borderRadius: theme.radii.pill,
              borderWidth: 2,
              height: 10,
              position: 'absolute',
              right: 5,
              top: 5,
              width: 10,
            }}
          />
        ) : null}
      </Pressable>
    </View>
  );
}
