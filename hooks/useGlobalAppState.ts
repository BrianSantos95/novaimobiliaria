
import { useAppStateContext } from '../components/providers/AppStateContext';

export const useAppState = () => {
    return useAppStateContext();
};

// Re-export logic if needed, but components should use useAppState (which now uses Context)
export { useAppStateLogic } from './useAppState';
