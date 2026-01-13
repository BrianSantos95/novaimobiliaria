import React, { createContext, useContext } from 'react';
import { useAppStateLogic } from '../../hooks/useAppStateLogic';

const AppStateContext = createContext<ReturnType<typeof useAppStateLogic> | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const appState = useAppStateLogic();

    return (
        <AppStateContext.Provider value={appState}>
            {children}
        </AppStateContext.Provider>
    );
};

export const useAppStateContext = () => {
    const context = useContext(AppStateContext);
    if (!context) {
        throw new Error('useAppStateContext must be used within an AppStateProvider');
    }
    return context;
};
