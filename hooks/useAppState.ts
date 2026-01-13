
import { useState, useEffect, useCallback } from 'react';
import { AppState, Imovel, Lead, Banner, SiteSettings, Regiao, FinanciamentoSettings, ProvaSocial, LocalizacaoSettings } from '../types';
import {
  fetchFullState,
  dbAddImovel,
  dbUpdateImovel,
  dbDeleteImovel,
  dbAddRegiao,
  dbDeleteRegiao,
  dbUpdateBanners,
  dbUpdateFinanciamento,
  dbUpdateLocalizacao,
  dbUpdateProvaSocial,
  dbAddLead,
  dbUpdateSettings
} from '../services/supabaseService';
import { INITIAL_IMOVEIS, INITIAL_REGIOES, INITIAL_BANNERS_PROMO, INITIAL_BANNERS_EM_BREVE, INITIAL_SETTINGS, INITIAL_FINANCIAMENTO, INITIAL_PROVA_SOCIAL, INITIAL_LOCALIZACAO } from '../constants';

export const useAppState = () => {
  const [state, setState] = useState<AppState>({
    imoveis: [],
    regioes: [],
    leads: [],
    bannersPromocionais: [],
    bannersEmBreve: [],
    settings: INITIAL_SETTINGS,
    financiamento: INITIAL_FINANCIAMENTO,
    provaSocial: INITIAL_PROVA_SOCIAL,
    localizacao: INITIAL_LOCALIZACAO,
    isAuthenticated: false
  });

  const [loading, setLoading] = useState(true);

  // Initial Load
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchFullState();
        setState(prev => ({ ...data, isAuthenticated: prev.isAuthenticated })); // Keep auth state if handled elsewhere or just init
      } catch (error) {
        console.error("Failed to load data from Supabase:", error);
        // Fallback or Alert? For now silent fail or check logs.
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // --- Actions wrappers ---

  const addImovel = useCallback(async (imovel: Imovel) => {
    // Optimistic update
    setState(prev => ({ ...prev, imoveis: [...prev.imoveis, imovel] }));
    try {
      await dbAddImovel(imovel);
    } catch (e) {
      console.error(e);
      // Revert if error
    }
  }, []);

  const updateImovel = useCallback(async (imovel: Imovel) => {
    setState(prev => ({
      ...prev,
      imoveis: prev.imoveis.map(i => i.id === imovel.id ? imovel : i)
    }));
    await dbUpdateImovel(imovel);
  }, []);

  const deleteImovel = useCallback(async (id: string) => {
    setState(prev => ({
      ...prev,
      imoveis: prev.imoveis.filter(i => i.id !== id)
    }));
    await dbDeleteImovel(id);
  }, []);

  const addRegiao = useCallback(async (regiao: Regiao) => {
    setState(prev => ({ ...prev, regioes: [...prev.regioes, regiao] }));
    await dbAddRegiao(regiao);
  }, []);

  const deleteRegiao = useCallback(async (id: string) => {
    setState(prev => ({ ...prev, regioes: prev.regioes.filter(r => r.id !== id) }));
    await dbDeleteRegiao(id);
  }, []);

  const updateFinanciamento = useCallback(async (financiamento: FinanciamentoSettings) => {
    setState(prev => ({ ...prev, financiamento }));
    await dbUpdateFinanciamento(financiamento);
  }, []);

  const updateProvaSocial = useCallback(async (provaSocial: ProvaSocial) => {
    setState(prev => ({ ...prev, provaSocial }));
    await dbUpdateProvaSocial(provaSocial);
  }, []);

  const updateLocalizacao = useCallback(async (localizacao: LocalizacaoSettings) => {
    setState(prev => ({ ...prev, localizacao }));
    await dbUpdateLocalizacao(localizacao);
  }, []);

  const setBannersPromocionais = useCallback(async (banners: Banner[]) => {
    setState(prev => ({ ...prev, bannersPromocionais: banners }));
    await dbUpdateBanners(banners, 'PROMO');
  }, []);

  const setBannersEmBreve = useCallback(async (banners: Banner[]) => {
    setState(prev => ({ ...prev, bannersEmBreve: banners }));
    await dbUpdateBanners(banners, 'EMBREVE');
  }, []);

  const addLead = useCallback(async (lead: Lead) => {
    setState(prev => ({ ...prev, leads: [lead, ...prev.leads] }));
    await dbAddLead(lead);
  }, []);

  const updateSettings = useCallback(async (settings: SiteSettings) => {
    setState(prev => ({ ...prev, settings }));
    await dbUpdateSettings(settings);
  }, []);

  const setAuthenticated = useCallback((val: boolean) => {
    setState(prev => ({ ...prev, isAuthenticated: val }));
  }, []);

  return {
    ...state,
    loading, // Export loading state
    addImovel,
    updateImovel,
    deleteImovel,
    addRegiao,
    deleteRegiao,
    updateFinanciamento,
    updateProvaSocial,
    updateLocalizacao,
    setBannersPromocionais,
    setBannersEmBreve,
    addLead,
    updateSettings,
    setAuthenticated
  };
};
