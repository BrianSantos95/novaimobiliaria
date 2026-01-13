
import { useAppStateContext } from '../components/providers/AppStateContext';

export const useAppState = () => {
  return useAppStateContext();
};

export { useAppStateLogic } from './useAppStateLogic';
