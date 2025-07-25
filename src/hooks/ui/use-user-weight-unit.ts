import { useGetAuth } from '@/hooks/auth/use-get-auth';

export const useUserWeightUnit = (): string => {
	const { settings } = useGetAuth();
	
	return settings?.weightUnit === 'metric' ? 'kg' : 'lbs';
};