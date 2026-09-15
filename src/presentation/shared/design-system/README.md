# Plenti Design System

Los componentes viven en dos niveles para mantenerlos pequeños y composables.

## Átomos

- `AppText`: tipografía, jerarquía y tono semántico.
- `AppSurface`: superficies, bordes y radios.
- `AppButton` y `AppIconButton`: acciones generales.
- `AppBadge`: estados breves.
- `AppDivider`: separación visual.
- `AppAmount`: importe y moneda.
- `AppActionTile`: acción rápida con icono.
- `AppListRow`: fila informativa o navegable.

## Patrones

- `AppStatusBanner`: estado de cuenta o información relevante.
- `AppProgressStepper`: progreso de onboarding/verificación.
- `AppQuickActionGrid`: composición de acciones rápidas.
- `AppSectionHeader`: título de sección con acción opcional.
- `AppBottomNavigation`: navegación persistente de cuatro destinos.

Los patrones no conocen el flujo de Home ni el negocio. La composición de balance, tarjeta, movimientos, recompensas y verificación específica se implementará dentro de `features/home/components/` usando estos bloques.

## Tema

`PresentationProviders` debe envolver las pantallas. Resuelve automáticamente la preferencia del sistema, o permite forzar `light`/`dark` durante el demo. Los componentes consumen tokens con `usePlentiTheme`; no deben declarar colores de marca directamente.
