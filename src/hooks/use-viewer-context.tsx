import { useContext } from 'react';
import { UserViewContext, PricingContext } from '@/contexts/viewer-contexts';

// Hooks for consuming the contexts
export const useUserContext = (): boolean => useContext(UserViewContext);
export const usePricingContext = (): boolean => useContext(PricingContext);
