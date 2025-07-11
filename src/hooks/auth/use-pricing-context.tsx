import { useContext } from 'react';
import { PricingContext } from '@/contexts/pricing-context';

// Hook for consuming the pricing context (per-pack pricing display setting)
export const usePricingContext = (): boolean => useContext(PricingContext);