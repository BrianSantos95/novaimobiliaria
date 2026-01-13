
import { useState, useEffect, useCallback } from 'react';
import { AppState, Imovel, Lead, Banner, SiteSettings, Regiao, FinanciamentoSettings, ProvaSocial, LocalizacaoSettings } from '../types';
import { getState, saveState } from '../services/stateService';

export const useAppState = () => {
  const [state, setState] = useState<AppState>(getState());

  useEffect(() => {
    saveState(state);
  }, [state]);

  const addImovel = useCallback((imovel: Imovel) => {
    setState(prev => ({ ...prev, imoveis: [...prev.imoveis, imovel] }));
  }, []);

  const updateImovel = useCallback((imovel: Imovel) => {
    setState(prev => ({
      ...prev,
      imoveis: prev.imoveis.map(i => i.id === imovel.id ? imovel : i)
    }));
  }, []);

  const deleteImovel = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      imoveis: prev.imoveis.filter(i => i.id !== id)
    }));
  }, []);

  const addRegiao = useCallback((regiao: Regiao) => {
    setState(prev => ({ ...prev, regioes: [...prev.regioes, regiao] }));
  }, []);

  const deleteRegiao = useCallback((id: string) => {
    setState(prev => ({ ...prev, regioes: prev.regioes.filter(r => r.id !== id) }));
  }, []);

  const updateFinanciamento = useCallback((financiamento: FinanciamentoSettings) => {
    setState(prev => ({ ...prev, financiamento }));
  }, []);

  const updateProvaSocial = useCallback((provaSocial: ProvaSocial) => {
    setState(prev => ({ ...prev, provaSocial }));
  }, []);

  const updateLocalizacao = useCallback((localizacao: LocalizacaoSettings) => {
    setState(prev => ({ ...prev, localizacao }));
  }, []);

  const setBannersPromocionais = useCallback((banners: Banner[]) => {
    setState(prev => ({ ...prev, bannersPromocionais: banners }));
  }, []);

  const setBannersEmBreve = useCallback((banners: Banner[]) => {
    setState(prev => ({ ...prev, bannersEmBreve: banners }));
  }, []);

  const addLead = useCallback((lead: Lead) => {
    setState(prev => ({ ...prev, leads: [lead, ...prev.leads] }));
  }, []);

  const updateSettings = useCallback((settings: SiteSettings) => {
    setState(prev => ({ ...prev, settings }));
  }, []);

  const setAuthenticated = useCallback((val: boolean) => {
    setState(prev => ({ ...prev, isAuthenticated: val }));
  }, []);

  return {
    ...state,
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
