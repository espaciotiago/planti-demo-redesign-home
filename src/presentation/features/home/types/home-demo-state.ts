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

export type HomeDemoState = {
  verification: 'pending' | 'approved';
  balance: '0.00' | '250.00';
  card: 'not-requested' | 'active';
  cardExpanded: boolean;
};

export const initialHomeDemoState: HomeDemoState = {
  verification: 'pending',
  balance: '0.00',
  card: 'not-requested',
  cardExpanded: false,
};

export function getHomeDemoStage(state: HomeDemoState): HomeDemoStage {
  if (state.verification === 'pending') return 'verification-pending';
  if (state.card === 'active') {
    return state.cardExpanded ? 'active-card-expanded' : 'active-card-collapsed';
  }
  if (state.balance === '250.00') return 'funded-without-card';
  return 'verified-empty-balance';
}
