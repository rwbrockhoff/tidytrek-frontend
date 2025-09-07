import { useAuth } from './use-auth';

export const useSubscription = () => {
	const { subscriptionStatus, isLoading: authLoading } = useAuth();

	return {
		isPro: subscriptionStatus,
		isLoading: authLoading,
	};
};
