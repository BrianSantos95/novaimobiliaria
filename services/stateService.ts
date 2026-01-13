
import { AppState } from '../types';
import { 
  INITIAL_IMOVEIS, 
  INITIAL_BANNERS_PROMO, 
  INITIAL_BANNERS_EM_BREVE, 
  INITIAL_SETTINGS, 
  INITIAL_REGIOES, 
  INITIAL_FINANCIAMENTO, 
  INITIAL_PROVA_SOCIAL, 
  INITIAL_LOCALIZACAO 
} from '../constants';

const STORAGE_KEY = 'imobiliaria_maceio_v5_state';

export const getState = (): AppState => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    imoveis: INITIAL_IMOVEIS,
    regioes: INITIAL_REGIOES,
    leads: [],
    bannersPromocionais: INITIAL_BANNERS_PROMO,
    bannersEmBreve: INITIAL_BANNERS_EM_BREVE,
    settings: INITIAL_SETTINGS,
    financiamento: INITIAL_FINANCIAMENTO,
    provaSocial: INITIAL_PROVA_SOCIAL,
    localizacao: INITIAL_LOCALIZACAO,
    isAuthenticated: false
  };
};

export const saveState = (state: AppState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};
