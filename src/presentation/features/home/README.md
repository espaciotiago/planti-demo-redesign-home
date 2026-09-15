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
