# Arquitectura del demo

Este proyecto usa una versión mínima de Clean Architecture: solo la capa de presentación.

No habrá, por ahora, capas de dominio, datos, API, persistencia ni lógica de negocio. El avance del demo se modelará como estado de UI local para recorrer los estados de la Home.

```text
src/presentation/
  app/              # Punto de composición futuro de la demo
  navigation/       # Contratos de navegación y tabs visuales
  theme/            # Tokens y configuración light/dark
  shared/
    design-system/  # Átomos y patrones reutilizables, agnósticos de features
    icons/          # Tipos compartidos de iconografía
    components/     # Reservado para composición compartida futura
  features/
    home/
      screens/      # Pantalla Home y sus estados visuales
      components/   # Componentes exclusivos de Home
      state/        # Estado y acciones simuladas del recorrido
      types/        # Contratos de UI de Home
      constants/    # Copy y constantes visuales de Home
assets/
  images/plenti-card/ # Activos oficiales de la tarjeta
  mockups/            # Referencias visuales no consumidas por runtime
```

La capa de presentación no debe importar de una futura capa de datos o dominio. Si el demo evoluciona, esas capas se agregarán fuera de `presentation/` sin mover los componentes visuales.
