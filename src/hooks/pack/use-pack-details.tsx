import { useContext, useMemo } from 'react';
import { PackContext, type PackContextValue } from '@/contexts/pack-context';
import { useAuth } from '@/hooks/auth/use-auth';
import { DEFAULT_PALETTE } from '@/styles/palette/palette-constants';
import { WeightUnit } from '@/types/pack-types';

export const usePackDetails = (): PackContextValue => {
	const context = useContext(PackContext);
	const { settings } = useAuth();

	// Fallback to user settings when not in PackProvider context
	return useMemo(() => {
		if (context) {
			return context;
		}

		// Create fallback from user settings
		const isMetric = settings?.weightUnit === 'metric';
		return {
			palette: settings?.palette || DEFAULT_PALETTE,
			weightUnit: {
				base: (isMetric ? WeightUnit.kg : WeightUnit.lb) as WeightUnit,
				detail: (isMetric ? WeightUnit.g : WeightUnit.oz) as WeightUnit,
				isMetric,
			},
			currency: settings?.currencyUnit || 'USD',
			settings,
			isGuestView: false,
		};
	}, [context, settings]);
};
