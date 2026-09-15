import { Ionicons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';

import { usePlentiTheme } from '../../../theme/PlentiThemeProvider';
import type { AppIconName } from '../../icons/icon-types';
import { AppText } from './AppText';

type AppListRowProps = {
  title: string;
  description?: string;
  leadingIcon?: AppIconName;
  trailing?: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function AppListRow({
  title,
  description,
  leadingIcon,
  trailing,
  onPress,
  style,
}: AppListRowProps) {
  const { theme } = usePlentiTheme();
  const content = (
    <>
      {leadingIcon ? (
        <View
          style={{
            alignItems: 'center',
            backgroundColor: theme.colors.surfaceElevated,
            borderRadius: theme.radii.pill,
            height: 44,
            justifyContent: 'center',
            width: 44,
          }}
        >
          <Ionicons color={theme.colors.textPrimary} name={leadingIcon} size={22} />
        </View>
      ) : null}
      <View style={{ flex: 1, gap: 2 }}>
        <AppText variant="bodyMedium">{title}</AppText>
        {description ? (
          <AppText numberOfLines={2} tone="secondary" variant="caption">
            {description}
          </AppText>
        ) : null}
      </View>
      {trailing ?? (onPress ? <Ionicons color={theme.colors.link} name="chevron-forward" size={20} /> : null)}
    </>
  );

  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }) => [
        {
          alignItems: 'center',
          flexDirection: 'row',
          gap: theme.spacing.sm,
          minHeight: 64,
          opacity: pressed && onPress ? 0.82 : 1,
        },
        style,
      ]}
    >
      {content}
    </Pressable>
  );
}
