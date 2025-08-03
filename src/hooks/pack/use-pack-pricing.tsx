import { useContext } from 'react';
import { PackPricingContext } from '@/contexts/pack-pricing-context';

export const usePackPricing = (): boolean => useContext(PackPricingContext);