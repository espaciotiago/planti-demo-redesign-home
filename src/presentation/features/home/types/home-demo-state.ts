/**
 * Estados visuales que la demo de Home podrá recorrer localmente.
 * No representa el estado real de una cuenta ni contiene reglas de negocio.
 */
export type HomeDemoStage =
  | 'verification-pending'
  | 'verified-empty-balance'
  | 'funded-without-card'
  | 'active-card-collapsed'
  | 'active-card-expanded';
