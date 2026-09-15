import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  Animated,
  PanResponder,
  Pressable,
  View,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { usePlentiTheme } from '../../../theme/PlentiThemeProvider';

type DraggableHomeSheetProps = {
  background: ReactNode;
  cardExpanded: boolean;
  children: ReactNode;
  collapsedOffset?: number;
  onCardExpandedChange: (expanded: boolean) => void;
  style?: StyleProp<ViewStyle>;
};

export function DraggableHomeSheet({
  background,
  cardExpanded,
  children,
  collapsedOffset = 88,
  onCardExpandedChange,
  style,
}: DraggableHomeSheetProps) {
  const { theme } = usePlentiTheme();
  const [containerHeight, setContainerHeight] = useState(0);
  const sheetY = useRef(new Animated.Value(collapsedOffset)).current;
  const gestureStartY = useRef(collapsedOffset);
  const currentY = useRef(collapsedOffset);
  const expandedOffset = Math.max(collapsedOffset + 160, containerHeight - 136);
  const visibleHeight = Math.max(
    1,
    containerHeight - (cardExpanded ? expandedOffset : collapsedOffset),
  );

  useEffect(() => {
    const listener = sheetY.addListener(({ value }) => {
      currentY.current = value;
    });

    return () => sheetY.removeListener(listener);
  }, [sheetY]);

  const animateTo = (expanded: boolean, notify = false) => {
    const toValue = expanded ? expandedOffset : collapsedOffset;

    Animated.spring(sheetY, {
      damping: 24,
      mass: 0.82,
      stiffness: 240,
      toValue,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished && notify) onCardExpandedChange(expanded);
    });
  };

  useEffect(() => {
    if (containerHeight > 0) animateTo(cardExpanded);
  }, [cardExpanded, containerHeight, expandedOffset]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dy) > 4,
        onPanResponderGrant: () => {
          sheetY.stopAnimation((value) => {
            gestureStartY.current = value;
          });
        },
        onPanResponderMove: (_, gesture) => {
          const nextValue = Math.min(
            expandedOffset,
            Math.max(collapsedOffset, gestureStartY.current + gesture.dy),
          );
          sheetY.setValue(nextValue);
        },
        onPanResponderRelease: (_, gesture) => {
          const midpoint = collapsedOffset + (expandedOffset - collapsedOffset) * 0.45;
          const shouldExpand =
            gesture.vy > 0.35 || (gesture.vy > -0.35 && currentY.current > midpoint);
          animateTo(shouldExpand, true);
        },
        onPanResponderTerminate: () => animateTo(cardExpanded),
      }),
    [cardExpanded, collapsedOffset, expandedOffset, sheetY],
  );

  const handleLayout = (event: LayoutChangeEvent) => {
    setContainerHeight(event.nativeEvent.layout.height);
  };

  return (
    <View onLayout={handleLayout} style={[{ flex: 1, overflow: 'hidden' }, style]}>
      <View style={{ bottom: 0, left: 0, position: 'absolute', right: 0, top: 0 }}>
        {background}
      </View>

      <Animated.View
        style={{
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.border,
          borderTopLeftRadius: theme.radii.xl,
          borderTopRightRadius: theme.radii.xl,
          borderWidth: 1,
          bottom: 0,
          left: 0,
          overflow: 'hidden',
          position: 'absolute',
          right: 0,
          top: 0,
          transform: [{ translateY: sheetY }],
        }}
      >
        <Pressable
          accessibilityHint="Desliza para mostrar u ocultar la tarjeta"
          accessibilityLabel={cardExpanded ? 'Subir Home' : 'Bajar Home'}
          accessibilityRole="adjustable"
          onPress={() => onCardExpandedChange(!cardExpanded)}
          style={{ alignItems: 'center', height: 34, justifyContent: 'center' }}
          {...panResponder.panHandlers}
        >
          <View
            style={{
              backgroundColor: theme.colors.textTertiary,
              borderRadius: theme.radii.pill,
              height: 5,
              opacity: 0.55,
              width: 44,
            }}
          />
        </Pressable>
        <View
          style={{
            flexGrow: 0,
            flexShrink: 1,
            height: visibleHeight,
            minHeight: 0,
          }}
        >
          {children}
        </View>
      </Animated.View>
    </View>
  );
}
