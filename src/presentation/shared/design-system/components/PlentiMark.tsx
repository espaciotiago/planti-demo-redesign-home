import { View, type StyleProp, type ViewStyle } from 'react-native';

import { usePlentiTheme } from '../../../theme/PlentiThemeProvider';

type PlentiMarkProps = {
  size?: number;
  contained?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function PlentiMark({ size = 48, contained = true, style }: PlentiMarkProps) {
  const { theme } = usePlentiTheme();
  const unit = size / 48;

  return (
    <View
      accessibilityLabel="Plenti"
      style={[
        {
          alignItems: 'center',
          backgroundColor: contained ? '#07165B' : 'transparent',
          borderRadius: contained ? theme.radii.pill : 0,
          height: size,
          justifyContent: 'center',
          overflow: 'hidden',
          width: size,
        },
        style,
      ]}
    >
      <View style={{ height: 25 * unit, position: 'relative', width: 25 * unit }}>
        <View
          style={{
            backgroundColor: '#09F4D2',
            height: 21 * unit,
            left: 2 * unit,
            position: 'absolute',
            top: 1 * unit,
            transform: [{ skewY: '-18deg' }],
            width: 9 * unit,
          }}
        />
        <View
          style={{
            backgroundColor: '#2F6BFF',
            height: 9 * unit,
            position: 'absolute',
            right: 2 * unit,
            top: 2 * unit,
            transform: [{ skewY: '-18deg' }],
            width: 16 * unit,
          }}
        />
        <View
          style={{
            backgroundColor: '#4B56FF',
            height: 17 * unit,
            position: 'absolute',
            right: 2 * unit,
            top: 8 * unit,
            transform: [{ skewY: '-18deg' }],
            width: 8 * unit,
          }}
        />
      </View>
    </View>
  );
}
