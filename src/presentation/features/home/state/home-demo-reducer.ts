import type { HomeDemoAction } from './home-demo-action';
import {
  initialHomeDemoState,
  type HomeDemoStage,
  type HomeDemoState,
} from '../types/home-demo-state';

function stateFromStage(stage?: HomeDemoStage): HomeDemoState {
  switch (stage) {
    case 'verified-empty-balance':
      return { ...initialHomeDemoState, verification: 'approved' };
    case 'funded-without-card':
      return { ...initialHomeDemoState, balance: '250.00', verification: 'approved' };
    case 'active-card-collapsed':
      return {
        ...initialHomeDemoState,
        balance: '250.00',
        card: 'active',
        verification: 'approved',
      };
    case 'active-card-expanded':
      return {
        ...initialHomeDemoState,
        balance: '250.00',
        card: 'active',
        cardExpanded: true,
        verification: 'approved',
      };
    case 'verification-pending':
    default:
      return initialHomeDemoState;
  }
}

export function homeDemoReducer(state: HomeDemoState, action: HomeDemoAction): HomeDemoState {
  switch (action.type) {
    case 'complete-verification':
      return { ...state, verification: 'approved' };
    case 'make-first-deposit':
      return state.verification === 'approved' ? { ...state, balance: '250.00' } : state;
    case 'request-card':
      return state.verification === 'approved'
        ? { ...state, card: 'active', cardExpanded: false }
        : state;
    case 'expand-card':
      return state.card === 'active' ? { ...state, cardExpanded: true } : state;
    case 'collapse-card':
      return { ...state, cardExpanded: false };
    case 'reset':
      return stateFromStage(action.stage);
    default:
      return state;
  }
}
