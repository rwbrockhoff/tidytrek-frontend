import * as Modal from '@/components/alpine/modal/modal';
import { Alert } from '@/components/alpine';
import { Stack } from '@/components/layout';
import { useSubscriptionDetails } from '@/hooks/auth/use-subscription-details';
import { useSubscriptionActions } from '../hooks/use-subscription-actions';
import { formatDate } from '@/utils/format-date';
import { SubscriptionStatusDisplay } from '../subscription-states/subscription-status-display';
import { SubscriptionActions } from '../subscription-states/subscription-actions';

type ManageSubscriptionModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

export const ManageSubscriptionModal = ({
	isOpen,
	onClose,
}: ManageSubscriptionModalProps) => {
	const { subscription, isPaidSubscription, isComplimentary } = useSubscriptionDetails();

	const { cancelAtPeriodEnd } = subscription || {};
	const { hasError } = useSubscriptionActions(subscription?.subscriptionId, onClose);

	const getAccessEndDate = () => {
		if (!subscription) return null;

		if (cancelAtPeriodEnd && subscription.currentPeriodEnd) {
			return formatDate(subscription.currentPeriodEnd);
		}

		if (subscription.currentPeriodEnd) {
			return formatDate(subscription.currentPeriodEnd);
		}

		return null;
	};

	return (
		<Modal.Root open={isOpen} onOpenChange={onClose}>
			<Modal.Content size="md">
				<Modal.Header>
					<Modal.Title>Manage Subscription</Modal.Title>
					<Modal.Description>Manage or cancel your pro plan</Modal.Description>
				</Modal.Header>

				<Modal.Body>
					<Stack className="gap-4">
						{isComplimentary && (
							<Alert variant="default">
								You have complimentary access to TidyTrek Pro features.
							</Alert>
						)}

						{isPaidSubscription && subscription && (
							<SubscriptionStatusDisplay
								cancelAtPeriodEnd={cancelAtPeriodEnd}
								accessEndDate={getAccessEndDate()}
							/>
						)}

						{hasError && (
							<Alert variant="error">
								There was an error processing your request. Our team has been notified and
								it will be resolved promptly.
							</Alert>
						)}
					</Stack>
				</Modal.Body>

				<Modal.Footer>
					<SubscriptionActions
						subscriptionId={subscription?.subscriptionId}
						isPaidSubscription={isPaidSubscription}
						cancelAtPeriodEnd={cancelAtPeriodEnd}
						onClose={onClose}
						onSuccess={onClose}
					/>
				</Modal.Footer>
			</Modal.Content>
		</Modal.Root>
	);
};
