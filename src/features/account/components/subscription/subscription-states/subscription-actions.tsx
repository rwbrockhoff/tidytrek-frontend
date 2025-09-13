import { Button } from '@/components/alpine';
import { useSubscriptionActions } from '../hooks/use-subscription-actions';

type SubscriptionActionsProps = {
	subscriptionId: number | undefined;
	isPaidSubscription: boolean;
	cancelAtPeriodEnd: boolean | undefined;
	onClose: () => void;
	onSuccess?: () => void;
};

export const SubscriptionActions = ({
	subscriptionId,
	isPaidSubscription,
	cancelAtPeriodEnd,
	onClose,
	onSuccess,
}: SubscriptionActionsProps) => {
	const {
		handleReactivate,
		isReactivatePending,
		isLoading,
	} = useSubscriptionActions(subscriptionId, onSuccess);

	return (
		<>
			<Button variant="outline" color="tertiary" onClick={onClose} disabled={isLoading}>
				Close
			</Button>

			{isPaidSubscription && cancelAtPeriodEnd && (
				<Button
					variant="outline"
					color="primary"
					onClick={handleReactivate}
					loading={isReactivatePending}
					disabled={isLoading}>
					Reactivate Subscription
				</Button>
			)}
		</>
	);
};
