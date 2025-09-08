import { useGetSubscriptionQuery } from '@/queries/stripe-queries';

export const useSubscriptionDetails = () => {
	const { data, isLoading } = useGetSubscriptionQuery();

	const isSubscribed = data?.subscriptionStatus || false;
	const subscription = data?.subscription;
	const isComplimentary =
		isSubscribed &&
		subscription?.status === 'active' &&
		!subscription?.stripeSubscriptionId;
	const isPaidSubscription = isSubscribed && !!subscription?.stripeSubscriptionId;

	return {
		isSubscribed,
		isComplimentary,
		isPaidSubscription,
		subscription,
		isLoading,
	};
};
