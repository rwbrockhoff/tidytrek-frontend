import { useGetAuth } from '@/hooks/auth/use-get-auth';
import { WeightUnit } from '@/types/pack-types';

type UnitMode = 'base' | 'small';

type UseUserWeightUnitOptions = {
	unitMode?: UnitMode;
};

export const useUserWeightUnit = ({ unitMode = 'base' }: UseUserWeightUnitOptions = {}): WeightUnit => {
	const { settings } = useGetAuth();
	const isMetric = settings?.weightUnit === 'metric';
	
	if (unitMode === 'small') {
		return isMetric ? WeightUnit.g : WeightUnit.oz;
	}
	
	return isMetric ? WeightUnit.kg : WeightUnit.lb;
};