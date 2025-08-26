import { useAuth } from '@/hooks/auth/use-auth';
import { WeightUnit } from '@/types/pack-types';

type UnitMode = 'base' | 'small';

type UseUserWeightUnitOptions = {
	unitMode?: UnitMode;
};

export const useUserWeightUnit = ({ unitMode = 'base' }: UseUserWeightUnitOptions = {}): WeightUnit => {
	const { settings } = useAuth();
	const isMetric = settings?.weightUnit === 'metric';
	
	if (unitMode === 'small') {
		return isMetric ? WeightUnit.g : WeightUnit.oz;
	}
	
	return isMetric ? WeightUnit.kg : WeightUnit.lb;
};