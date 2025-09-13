import {
	useCancelSubscriptionMutation,
	useReactivateSubscriptionMutation,
} from '@/queries/stripe-queries';

export const useSubscriptionActions = (
	subscriptionId: number | undefined,
	onSuccess?: () => void,
) => {
	const {
		mutate: cancelSubscription,
		isPending: isCancelPending,
		isError: isCancelError,
	} = useCancelSubscriptionMutation();

	const {
		mutate: reactivateSubscription,
		isPending: isReactivatePending,
		isError: isReactivateError,
	} = useReactivateSubscriptionMutation();

	const handleCancel = () => {
		if (subscriptionId) {
			cancelSubscription({ subscriptionId }, { onSuccess });
		}
	};

	const handleReactivate = () => {
		if (subscriptionId) {
			reactivateSubscription({ subscriptionId }, { onSuccess });
		}
	};

	return {
		handleCancel,
		handleReactivate,
		isCancelPending,
		isReactivatePending,
		hasError: isCancelError || isReactivateError,
		isLoading: isCancelPending || isReactivatePending,
	};
};
