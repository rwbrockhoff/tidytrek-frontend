import * as Modal from '@/components/alpine/modal/modal';
import { Button, Alert } from '@/components/alpine';
import { Stack, Flex } from '@/components/layout';
import { CreditCard, Check } from 'lucide-react';
import { useSubscriptionDetails } from '@/hooks/auth/use-subscription-details';
import { useCancelSubscriptionMutation } from '@/queries/stripe-queries';
import { formatDate } from '@/utils/format-date';
import styles from './manage-subscription-modal.module.css';

type ManageSubscriptionModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

export const ManageSubscriptionModal = ({
	isOpen,
	onClose,
}: ManageSubscriptionModalProps) => {
	const { subscription, isPaidSubscription, isComplimentary } = useSubscriptionDetails();

	const {
		mutate: cancelSubscription,
		isPending,
		isError,
	} = useCancelSubscriptionMutation();

	const getAccessEndDate = () => {
		if (!subscription) return null;

		if (subscription.cancelAtPeriodEnd && subscription.currentPeriodEnd) {
			return formatDate(subscription.currentPeriodEnd);
		}

		if (subscription.currentPeriodEnd) {
			return formatDate(subscription.currentPeriodEnd);
		}

		return null;
	};

	const handleCancelSubscription = () => {
		if (subscription?.subscriptionId) {
			cancelSubscription(
				{ subscriptionId: subscription.subscriptionId },
				{
					onSuccess: () => onClose(),
				},
			);
		}
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
							<Stack className="gap-3">
								{subscription.cancelAtPeriodEnd ? (
									<>
										<Flex className={`gap-2 items-center ${styles.billingDate}`}>
											<Check />
											<span className={styles.billingDate}>
												Your subscription has been cancelled.
											</span>
										</Flex>
										<p>
											You'll have access until <strong>{getAccessEndDate()}</strong>
										</p>
									</>
								) : (
									<>
										<Flex className={`gap-2 items-center ${styles.billingDate}`}>
											<CreditCard />
											<span className={styles.billingDate}>
												Next billing date: {getAccessEndDate()}
											</span>
										</Flex>
										<p>
											If you cancel, you'll still have access to your{' '}
											<strong>Pro Plan</strong> through{' '}
											<strong>{getAccessEndDate()}</strong>
										</p>
									</>
								)}
							</Stack>
						)}

						{isError && (
							<Alert variant="error">
								There was an error cancelling your subscription. Our team has been
								notified and it will be resolved promptly.
							</Alert>
						)}
					</Stack>
				</Modal.Body>

				<Modal.Footer>
					<Button
						variant="outline"
						color="tertiary"
						onClick={onClose}
						disabled={isPending}>
						Close
					</Button>
					{isPaidSubscription && !subscription?.cancelAtPeriodEnd && (
						<Button
							variant="outline"
							color="danger"
							onClick={handleCancelSubscription}
							loading={isPending}
							disabled={isPending}>
							Cancel Subscription
						</Button>
					)}
				</Modal.Footer>
			</Modal.Content>
		</Modal.Root>
	);
};
