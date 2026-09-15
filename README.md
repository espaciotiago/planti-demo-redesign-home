# Plenti — Demo rediseño Home

Demo del rediseño de la vista principal de la app de Plenti, enfocado en:

- Mejorar la experiencia y la conversión de la **primera recarga**.
- Comunicar mejor el **flujo de validación de cuenta**.
- Impulsar la **activación de la tarjeta Plenti**.

## Demo

| Light | Dark |
| --- | --- |
| [demo light.mp4](demo/demo%20light.mp4) | [demo dark.mp4](demo/demo%20dark.mp4) |

## Diseños originales

| | Light | Dark |
| --- | --- | --- |
| Validación pendiente | <img src="designs/validation%20pending.png" width="260" /> | <img src="designs/validation%20pending%20dark.png" width="260" /> |
| Validación exitosa | <img src="designs/validation%20success.png" width="260" /> | <img src="designs/validation%20success%20dark.png" width="260" /> |
| Home sin tarjeta | <img src="designs/home%20no%20card.png" width="260" /> | <img src="designs/home%20no%20card%20dark.png" width="260" /> |
| Home con tarjeta | <img src="designs/home%20card.png" width="260" /> | <img src="designs/home%20card%20dark.png" width="260" /> |
| Detalle de tarjeta | <img src="designs/card%20details.png" width="260" /> | <img src="designs/card%20details%20dark.png" width="260" /> |

## Parte técnica

- Expo SDK 57, React Native 0.86, React 19, TypeScript.
- Reanimated, Gesture Handler, React Native SVG.
- Solo capa de presentación, sin backend: los estados de la Home se simulan con estado local. Más detalle en [ARCHITECTURE.md](ARCHITECTURE.md).

### Correr el proyecto

```bash
npm install
npm run ios      # expo run:ios
npm run android  # expo run:android
```
