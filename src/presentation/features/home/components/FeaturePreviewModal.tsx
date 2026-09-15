import { Modal, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppButton, AppSurface, AppText } from '../../../shared/design-system';
import { usePlentiTheme } from '../../../theme/PlentiThemeProvider';

type FeaturePreviewModalProps = {
  description: string;
  onClose: () => void;
  title: string;
  visible: boolean;
};

export function FeaturePreviewModal({
  description,
  onClose,
  title,
  visible,
}: FeaturePreviewModalProps) {
  const { theme } = usePlentiTheme();
  const insets = useSafeAreaInsets();

  return (
    <Modal animationType="fade" onRequestClose={onClose} transparent visible={visible}>
      <View
        style={{
          backgroundColor: 'rgba(0, 8, 37, 0.58)',
          flex: 1,
          justifyContent: 'flex-end',
        }}
      >
        <Pressable
          accessibilityLabel="Cerrar vista previa"
          onPress={onClose}
          style={{
            bottom: 0,
            left: 0,
            position: 'absolute',
            right: 0,
            top: 0,
          }}
        />
        <AppSurface
          style={{
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            gap: theme.spacing.md,
            paddingBottom: Math.max(insets.bottom, theme.spacing.md),
            paddingHorizontal: theme.spacing.lg,
            paddingTop: theme.spacing.lg,
          }}
        >
          <View style={{ gap: theme.spacing.xs }}>
            <AppText variant="title">{title}</AppText>
            <AppText tone="secondary">{description}</AppText>
          </View>
          <AppButton label="Entendido" onPress={onClose} />
        </AppSurface>
      </View>
    </Modal>
  );
}
