import * as Modal from '@/components/alpine/modal/modal';
import { Button, Alert } from '@/components/alpine';
import { Stack, Flex } from '@/components/layout';
import { CreditCard } from 'lucide-react';
import { useState } from 'react';
import { StripePaymentForm } from '../forms/stripe-payment-form';
import { useUpdatePaymentMethodMutation } from '@/queries/stripe-queries';
import { useSubscriptionDetails } from '@/hooks/auth/use-subscription-details';
import { formatDate } from '@/utils/format-date';
import styles from '../modals/manage-subscription-modal.module.css';

type EditPaymentMethodModalProps = {
	isOpen: boolean;
	onClose: () => void;
	onSuccess?: () => void;
};

export const EditPaymentMethodModal = ({
	isOpen,
	onClose,
	onSuccess,
}: EditPaymentMethodModalProps) => {
	const [isProcessingPayment, setIsProcessingPayment] = useState(false);
	const { subscription, isPaidSubscription } = useSubscriptionDetails();

	const {
		mutate: updatePaymentMethod,
		isError,
		error,
	} = useUpdatePaymentMethodMutation();

	const handlePaymentMethodReady = (paymentMethodId: string) => {
		updatePaymentMethod(
			{
				stripePaymentMethodId: paymentMethodId,
			},
			{
				onSuccess: () => {
					setIsProcessingPayment(false);
					onClose();
					onSuccess?.();
				},
				onError: () => {
					setIsProcessingPayment(false);
				},
			},
		);
	};

	const handleUpdatePayment = () => {
		setIsProcessingPayment(true);
	};

	return (
		<Modal.Root open={isOpen} onOpenChange={onClose}>
			<Modal.Content size="md">
				<Modal.Header>
					<Modal.Title>Update Payment Method</Modal.Title>
					<Modal.Description>Update your payment information</Modal.Description>
				</Modal.Header>

				<Modal.Body>
					<Stack className="gap-8">
						{isPaidSubscription && subscription && !subscription.cancelAtPeriodEnd && (
							<Stack className="gap-3">
								<Flex className={`gap-2 items-center ${styles.billingDate}`}>
									<CreditCard />
									<span className={styles.billingDate}>
										Next billing date: {formatDate(subscription.currentPeriodEnd!)}
									</span>
								</Flex>
								{subscription.paymentMethod?.last4 && (
									<p>
										Current Payment Method: •••• •••• ••••{' '}
										{subscription.paymentMethod.last4}
									</p>
								)}
							</Stack>
						)}

						<StripePaymentForm
							onPaymentMethodReady={handlePaymentMethodReady}
							onError={() => setIsProcessingPayment(false)}
							isProcessing={isProcessingPayment}
						/>

						{isError && (
							<Alert variant="error">
								{error?.message || 'Failed to update payment method. Please try again.'}
							</Alert>
						)}
					</Stack>
				</Modal.Body>

				<Modal.Footer>
					<Button
						variant="outline"
						color="tertiary"
						onClick={onClose}
						disabled={isProcessingPayment}>
						Cancel
					</Button>
					<Button onClick={handleUpdatePayment} loading={isProcessingPayment}>
						Update Payment Method
					</Button>
				</Modal.Footer>
			</Modal.Content>
		</Modal.Root>
	);
};
