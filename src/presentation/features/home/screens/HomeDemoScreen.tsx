import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { ScrollView, View, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  AppBottomNavigation,
  type BottomNavigationItem,
  type QuickAction,
} from '../../../shared/design-system';
import { usePlentiTheme } from '../../../theme/PlentiThemeProvider';
import {
  AccountProgressCard,
  BalanceOverview,
  CardManagementPanel,
  DemoFlowControl,
  DraggableHomeSheet,
  ExplorePlentiPanel,
  FeaturePreviewModal,
  FirstDepositCard,
  HomeHeader,
  MovementsSection,
  PlentiCardModule,
  RewardsPocketSummary,
} from '../components';
import { homeDemoReducer } from '../state/home-demo-reducer';
import {
  getHomeDemoStage,
  initialHomeDemoState,
} from '../types/home-demo-state';

type PreviewContent = {
  title: string;
  description: string;
};

const fundedMovements = [
  {
    amount: '$250.00',
    date: 'Hoy, 9:42 a. m.',
    direction: 'in' as const,
    id: 'first-top-up',
    title: 'Recarga',
  },
  {
    amount: '$35.00',
    date: 'Ayer',
    direction: 'out' as const,
    icon: 'paper-plane-outline' as const,
    id: 'transfer',
    title: 'Transferencia',
  },
];

export function HomeDemoScreen() {
  const { theme } = usePlentiTheme();
  const insets = useSafeAreaInsets();
  const [state, dispatch] = useReducer(homeDemoReducer, initialHomeDemoState);
  const [preview, setPreview] = useState<PreviewContent | null>(null);
  const homeScrollRef = useRef<ScrollView>(null);
  const homeScrollOffset = useRef(0);

  const stage = getHomeDemoStage(state);
  const isPending = state.verification === 'pending';
  const hasBalance = state.balance !== '0.00';
  const hasActiveCard = state.card === 'active';

  useEffect(() => {
    // The Home sheet stays mounted while the card is revealed. Restore the last
    // position after its viewport changes so it does not snap back to the top.
    const frame = requestAnimationFrame(() => {
      homeScrollRef.current?.scrollTo({
        animated: false,
        y: homeScrollOffset.current,
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [state.cardExpanded]);

  const handleHomeScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    homeScrollOffset.current = Math.max(0, event.nativeEvent.contentOffset.y);
  };

  const showPreview = (title: string, description: string) => {
    setPreview({ title, description });
  };

  const requireApprovedAccount = (feature: string, approvedAction: () => void) => {
    if (isPending) {
      showPreview(
        feature,
        'Puedes conocer esta función mientras verificamos tu cuenta. Estará disponible para operar cuando finalice la validación.',
      );
      return;
    }
    approvedAction();
  };

  const handleTopUp = () => {
    requireApprovedAccount('Recarga', () => {
      if (!hasBalance) {
        dispatch({ type: 'make-first-deposit' });
        return;
      }
      showPreview('Recarga', 'El flujo de recarga queda listo para conectarse en la siguiente iteración.');
    });
  };

  const handleCardRequest = () => {
    requireApprovedAccount('Plenti Card', () => dispatch({ type: 'request-card' }));
  };

  const quickActions = useMemo<QuickAction[]>(
    () => [
      {
        badgeIcon: 'add',
        icon: 'wallet-outline',
        id: 'top-up',
        label: 'Recarga',
        onPress: handleTopUp,
      },
      {
        icon: 'paper-plane-outline',
        id: 'transfer',
        label: 'Transfiere',
        onPress: () =>
          requireApprovedAccount('Transfiere', () =>
            showPreview('Transfiere', 'Envía dinero a otras cuentas desde tu saldo disponible.'),
          ),
      },
      {
        icon: 'trending-up-outline',
        id: 'invest',
        label: 'Invierte',
        onPress: () =>
          requireApprovedAccount('Invierte', () =>
            showPreview('Invierte', 'Explora las opciones para hacer crecer tu dinero.'),
          ),
      },
      {
        icon: 'wallet-outline',
        id: 'pockets',
        label: 'Bolsillos',
        onPress: () =>
          requireApprovedAccount('Bolsillos', () =>
            showPreview('Bolsillos', 'Organiza tu saldo por metas y recibe recompensas.'),
          ),
      },
    ],
    [hasBalance, isPending],
  );

  const navigationItems = useMemo<BottomNavigationItem[]>(
    () => [
      {
        icon: 'home-outline',
        id: 'home',
        label: 'Home',
        onPress: () => {
          if (state.cardExpanded) dispatch({ type: 'collapse-card' });
        },
      },
      {
        icon: 'wallet-outline',
        id: 'pockets',
        label: 'Bolsillos',
        onPress: () => showPreview('Bolsillos', 'Esta demo mantiene el foco en el flujo principal de Home.'),
      },
      {
        icon: 'paper-plane-outline',
        id: 'transfers',
        label: 'Transfiere',
        onPress: () => showPreview('Transfiere', 'Esta demo mantiene el foco en el flujo principal de Home.'),
      },
      {
        icon: 'trending-up-outline',
        id: 'investments',
        label: 'Invierte',
        onPress: () => showPreview('Invierte', 'Esta demo mantiene el foco en el flujo principal de Home.'),
      },
    ],
    [state.cardExpanded],
  );

  const handleDemoNext = () => {
    switch (stage) {
      case 'verification-pending':
        dispatch({ type: 'complete-verification' });
        break;
      case 'verified-empty-balance':
        dispatch({ type: 'make-first-deposit' });
        break;
      case 'funded-without-card':
        dispatch({ type: 'request-card' });
        break;
      case 'active-card-collapsed':
        dispatch({ type: 'expand-card' });
        break;
      case 'active-card-expanded':
        dispatch({ type: 'collapse-card' });
        break;
    }
  };

  const bottomNavigation = (
    <View
      style={{
        backgroundColor: theme.colors.background,
        bottom: 0,
        left: 0,
        paddingBottom: Math.max(insets.bottom, theme.spacing.xs),
        paddingHorizontal: theme.spacing.md,
        position: 'absolute',
        right: 0,
      }}
    >
      <AppBottomNavigation items={navigationItems} selectedId="home" />
    </View>
  );

  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <StatusBar style={theme.mode === 'dark' ? 'light' : 'dark'} />

      <View
        style={{
          paddingBottom: theme.spacing.sm,
          paddingHorizontal: theme.spacing.md,
          paddingTop: theme.spacing.sm,
        }}
      >
        <HomeHeader
          hasUnreadNotifications={!isPending}
          name="Santiago"
          onNotificationsPress={() =>
            showPreview(
              'Notificaciones',
              isPending
                ? 'Te avisaremos cuando termine la validación.'
                : 'Tu cuenta fue aprobada y está lista para usar.',
            )
          }
        />
      </View>

      <View style={{ flex: 1 }}>
        {hasActiveCard ? (
          <DraggableHomeSheet
            background={
              <ScrollView
                contentContainerStyle={{
                  paddingBottom: insets.bottom + 150,
                  paddingHorizontal: theme.spacing.md,
                }}
                alwaysBounceVertical={false}
                bounces={false}
                showsVerticalScrollIndicator={false}
              >
                <CardManagementPanel
                  onAppleWalletPress={() =>
                    showPreview('Apple Wallet', 'Aquí se conectará el flujo para agregar tu Plenti Card.')
                  }
                  onBillingAddressPress={() =>
                    showPreview('Dirección de facturación', 'Consulta la dirección asociada a tu tarjeta.')
                  }
                  onLockPress={() =>
                    showPreview('Bloquear tarjeta', 'Control temporal de bloqueo de la tarjeta.')
                  }
                  onMorePress={() =>
                    showPreview('Más opciones', 'Reemplazo, soporte y controles adicionales.')
                  }
                  onSettingsPress={() =>
                    showPreview('Configuración de la tarjeta', 'Administra límites y compras en línea.')
                  }
                  onToggleDetails={() =>
                    dispatch({ type: state.cardExpanded ? 'collapse-card' : 'expand-card' })
                  }
                  onViewDataPress={() =>
                    showPreview('Datos de la tarjeta', 'Los datos sensibles están ocultos en esta demo.')
                  }
                />
              </ScrollView>
            }
            cardExpanded={state.cardExpanded}
            onCardExpandedChange={(expanded) =>
              dispatch({ type: expanded ? 'expand-card' : 'collapse-card' })
            }
          >
            <ScrollView
              ref={homeScrollRef}
              contentContainerStyle={{
                gap: theme.spacing.lg,
                flexGrow: 1,
                paddingBottom: insets.bottom + 180,
                paddingHorizontal: theme.spacing.md,
              }}
              alwaysBounceVertical={false}
              bounces={false}
              onScroll={handleHomeScroll}
              scrollEventThrottle={16}
              removeClippedSubviews={false}
              style={{ flex: 1, minHeight: 0 }}
              scrollEnabled={!state.cardExpanded}
              showsVerticalScrollIndicator={false}
            >
              <BalanceOverview
                actions={quickActions}
                amount={`$${state.balance}`}
                onDetailsPress={() =>
                  showPreview('Saldo total', 'Detalle de tu saldo disponible en USD.')
                }
              />
              {!hasBalance ? <FirstDepositCard onPress={handleTopUp} /> : null}
              <MovementsSection
                items={hasBalance ? fundedMovements : []}
                onViewAllPress={() =>
                  showPreview('Movimientos', 'Historial completo de movimientos.')
                }
              />
              {hasBalance ? (
                <RewardsPocketSummary
                  amount="$2.48"
                  onPress={() =>
                    showPreview('Bolsillo de recompensas', 'Detalle de recompensas acumuladas.')
                  }
                />
              ) : null}
            </ScrollView>
          </DraggableHomeSheet>
        ) : (
          <ScrollView
            contentContainerStyle={{
              gap: theme.spacing.lg,
              paddingBottom: insets.bottom + 180,
              paddingHorizontal: theme.spacing.md,
            }}
            alwaysBounceVertical={false}
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            {isPending ? (
              <AccountProgressCard />
            ) : !hasBalance ? (
              <AccountProgressCard showProgress={false} state="approved" />
            ) : null}
            <BalanceOverview
              actions={quickActions}
              amount={`$${state.balance}`}
              onDetailsPress={
                hasBalance
                  ? () => showPreview('Saldo total', 'Detalle de tu saldo disponible en USD.')
                  : undefined
              }
            />

            {!isPending && !hasBalance ? <FirstDepositCard onPress={handleTopUp} /> : null}

            {isPending ? (
              <ExplorePlentiPanel
                onInvestmentsPress={() =>
                  showPreview('Invierte', 'Conoce las opciones de inversión disponibles en Plenti.')
                }
                onPocketsPress={() =>
                  showPreview('Bolsillos', 'Conoce cómo organizar tu dinero para tus metas.')
                }
                onTopUpPress={() =>
                  showPreview('Cómo recargar', 'Conoce cómo añadir saldo cuando tu cuenta esté aprobada.')
                }
              />
            ) : (
              <MovementsSection
                items={hasBalance ? fundedMovements : []}
                onViewAllPress={() => showPreview('Movimientos', 'Historial completo de movimientos.')}
              />
            )}

            <PlentiCardModule
              onPress={handleCardRequest}
              variant={isPending ? 'learn' : 'request'}
            />

            {hasBalance ? (
              <RewardsPocketSummary
                amount="$2.48"
                onPress={() =>
                  showPreview('Bolsillo de recompensas', 'Detalle de recompensas acumuladas.')
                }
              />
            ) : null}
          </ScrollView>
        )}
      </View>

      {!state.cardExpanded ? (
        <DemoFlowControl
          onNext={handleDemoNext}
          onReset={() => dispatch({ type: 'reset' })}
          stage={stage}
          style={{
            bottom: insets.bottom + 82,
            position: 'absolute',
            right: theme.spacing.md,
            zIndex: 3,
          }}
        />
      ) : null}
      {bottomNavigation}

      <FeaturePreviewModal
        description={preview?.description ?? ''}
        onClose={() => setPreview(null)}
        title={preview?.title ?? ''}
        visible={preview !== null}
      />
    </SafeAreaView>
  );
}
