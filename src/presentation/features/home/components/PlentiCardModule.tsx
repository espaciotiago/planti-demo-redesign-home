import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';

import { AppButton, AppSurface, AppText, PlentiMark } from '../../../shared/design-system';
import { usePlentiTheme } from '../../../theme/PlentiThemeProvider';

type PlentiCardModuleProps = {
  variant?: 'learn' | 'request' | 'active' | 'active-expanded';
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

const cardAsset = require('../../../../../assets/images/plenti-card/plenti-card-front.png');

export function PlentiCardModule({
  variant = 'request',
  onPress,
  style,
}: PlentiCardModuleProps) {
  const { theme } = usePlentiTheme();

  if (variant === 'active' || variant === 'active-expanded') {
    const isExpanded = variant === 'active-expanded';

    return (
      <Pressable
        accessibilityHint="Abre los controles y datos de la tarjeta"
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [
          {
            borderRadius: theme.radii.lg,
            height: isExpanded ? 206 : 150,
            opacity: pressed ? 0.9 : 1,
            overflow: 'hidden',
          },
          style,
        ]}
      >
        <View
          style={{
            backgroundColor: '#07165B',
            borderRadius: theme.radii.lg,
            height: isExpanded ? 206 : 184,
            overflow: 'hidden',
            padding: theme.spacing.md,
          }}
        >
          <View
            style={{
              backgroundColor: '#063B73',
              height: 250,
              opacity: 0.72,
              position: 'absolute',
              right: -70,
              top: -20,
              transform: [{ skewX: '-16deg' }],
              width: 190,
            }}
          />
          <View style={{ alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ alignItems: 'center', flexDirection: 'row', gap: theme.spacing.xs }}>
              <PlentiMark contained={false} size={32} />
              <AppText style={{ color: '#FFFFFF', fontSize: 22 }} variant="title">Plenti</AppText>
            </View>
            <View style={{ alignItems: 'center', gap: 2 }}>
              <Ionicons color="#FFFFFF" name="eye-outline" size={22} />
              <AppText style={{ color: '#FFFFFF' }} variant="caption">
                {isExpanded ? 'Ocultar datos' : 'Ver tarjeta'}
              </AppText>
            </View>
          </View>
          <View style={{ gap: theme.spacing.sm, marginTop: isExpanded ? 54 : 38 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <AppText style={{ color: '#FFFFFF', letterSpacing: 3 }} variant="bodyMedium">
                •••• 1234
              </AppText>
              <AppText style={{ color: '#FFFFFF' }} variant="bodyMedium">CVC •••</AppText>
            </View>
            <View style={{ alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'space-between' }}>
              <AppText style={{ color: '#FFFFFF' }}>Juan Gómez</AppText>
              <AppText style={{ color: '#FFFFFF' }}>MM/YY</AppText>
              <AppText style={{ color: '#FFFFFF', fontSize: 22 }} variant="heading">VISA</AppText>
            </View>
          </View>
        </View>
      </Pressable>
    );
  }

  const isLearn = variant === 'learn';

  return (
    <AppSurface
      style={[
        {
          minHeight: isLearn ? 136 : 178,
          overflow: 'hidden',
          padding: theme.spacing.md,
        },
        style,
      ]}
    >
      <View style={{ gap: theme.spacing.xxs, paddingRight: '43%' }}>
        <AppText variant="heading">{isLearn ? 'Plenti Card' : 'Obtén tu Plenti Card'}</AppText>
        <AppText tone="secondary">
          {isLearn ? 'Disponible cuando validemos tu cuenta' : 'Tarjeta virtual sin cuota de manejo'}
        </AppText>
      </View>
      <AppButton
        icon="chevron-forward"
        label={isLearn ? 'Conocer la tarjeta' : 'Obtener mi Plenti Card'}
        onPress={onPress}
        style={{ marginTop: theme.spacing.md, width: isLearn ? '48%' : '58%' }}
        variant="secondary"
      />
      <Image
        accessibilityIgnoresInvertColors
        resizeMode="contain"
        source={cardAsset}
        style={{
          bottom: -34,
          height: 172,
          position: 'absolute',
          right: -15,
          width: 165,
        }}
      />
    </AppSurface>
  );
}
