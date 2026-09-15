import { Ionicons } from '@expo/vector-icons';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';

import type { AppIconName } from '../../icons/icon-types';
import { usePlentiTheme } from '../../../theme/PlentiThemeProvider';
import { AppSurface } from '../components/AppSurface';
import { AppText } from '../components/AppText';

export type BottomNavigationItem = {
  id: string;
  label: string;
  icon: AppIconName;
  onPress?: () => void;
};

type AppBottomNavigationProps = {
  items: BottomNavigationItem[];
  selectedId: string;
  style?: StyleProp<ViewStyle>;
};

export function AppBottomNavigation({
  items,
  selectedId,
  style,
}: AppBottomNavigationProps) {
  const { theme } = usePlentiTheme();

  return (
    <AppSurface
      style={[
        {
          borderRadius: theme.radii.xl,
          flexDirection: 'row',
          gap: theme.spacing.xxs,
          padding: theme.spacing.xs,
        },
        style,
      ]}
      variant="default"
    >
      {items.map((item) => {
        const selected = item.id === selectedId;
        const color = selected ? theme.colors.navigationActive : theme.colors.navigationInactive;

        return (
          <Pressable
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            key={item.id}
            onPress={item.onPress}
            style={({ pressed }) => ({
              alignItems: 'center',
              backgroundColor: selected ? theme.colors.surfaceSelected : 'transparent',
              borderRadius: theme.radii.lg,
              flex: 1,
              gap: theme.spacing.xxs,
              minHeight: 58,
              justifyContent: 'center',
              opacity: pressed ? 0.8 : 1,
              paddingHorizontal: theme.spacing.xs,
            })}
          >
            <Ionicons color={color} name={item.icon} size={23} />
            <AppText
              numberOfLines={1}
              style={{ color, fontSize: 12, lineHeight: 16, textAlign: 'center' }}
              variant="label"
            >
              {item.label}
            </AppText>
          </Pressable>
        );
      })}
    </AppSurface>
  );
}
