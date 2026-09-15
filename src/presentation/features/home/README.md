# Home presentation

Esta feature contiene la demo de la Home y la progresión simulada de sus estados:

1. Verificación en proceso.
2. Cuenta aprobada sin saldo.
3. Cuenta con saldo sin tarjeta.
4. Tarjeta activa colapsada.
5. Tarjeta activa expandida.

Los componentes compuestos viven en `components/` y reciben estado y callbacks por props. Los
archivos de `state/` son contratos de presentación; esta capa no contiene reglas de negocio,
navegación ni acceso a datos.

Componentes disponibles:

- `HomeHeader`
- `AccountProgressCard`
- `BalanceOverview`
- `FirstDepositCard`
- `ExplorePlentiPanel`
- `PlentiCardModule`
- `MovementsSection`
- `RewardsPocketSummary`
- `CardManagementPanel`

## Flujo local

`HomeDemoScreen` usa `homeDemoReducer` para mantener independientes los tres estados que cambian
en la demo: validación, saldo y tarjeta. Los CTA de recarga y tarjeta modifican únicamente su eje.

Cuando la tarjeta está activa, `DraggableHomeSheet` mantiene el header y las dos capas montadas en
la misma vista: los controles de la tarjeta quedan detrás y Home funciona como un sheet frontal. Un
tap en la tarjeta baja el sheet y el handle permite arrastrarlo de nuevo hacia arriba. El control
flotante `DemoFlowControl` permite avanzar o reiniciar la secuencia sin servicios externos.
