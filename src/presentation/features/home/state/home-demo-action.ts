import type { HomeDemoStage } from '../types/home-demo-state';

/**
 * Intenciones simuladas para avanzar entre los estados visuales de la Home.
 * La reducción de estado se implementará cuando se construya el flujo.
 */
export type HomeDemoAction =
  | { type: 'complete-verification' }
  | { type: 'make-first-deposit' }
  | { type: 'request-card' }
  | { type: 'expand-card' }
  | { type: 'collapse-card' }
  | { type: 'reset'; stage?: HomeDemoStage };
