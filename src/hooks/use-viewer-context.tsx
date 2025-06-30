import { useContext, createContext } from 'react';

// Contexts that change the UI being displayed

export const UserViewContext = createContext(false);
export const useUserContext = (): boolean => useContext(UserViewContext);

export const PricingContext = createContext(false);
export const usePricingContext = (): boolean => useContext(PricingContext);
