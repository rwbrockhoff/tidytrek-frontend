import * as Modal from '@/components/alpine/modal/modal';
import { Button, Alert } from '@/components/alpine';
import { Stack } from '@/components/layout';
import { useState } from 'react';
import { StripePaymentForm } from '../forms/stripe-payment-form';
import { useRestartSubscriptionMutation } from '@/queries/stripe-queries';

type RestartSubscriptionModalProps = {
	isOpen: boolean;
	onClose: () => void;
	onSuccess?: () => void;
};

export const RestartSubscriptionModal = ({
	isOpen,
	onClose,
	onSuccess,
}: RestartSubscriptionModalProps) => {
	const [isProcessingPayment, setIsProcessingPayment] = useState(false);

	const {
		mutate: restartSubscription,
		isError,
		error,
	} = useRestartSubscriptionMutation();

	const handlePaymentMethodReady = (paymentMethodId: string) => {
		restartSubscription(
			{
				stripePriceId: import.meta.env.VITE_STRIPE_PRICE_PRO_MONTHLY_ID!,
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

	const handleRestartPayment = () => {
		setIsProcessingPayment(true);
	};

	return (
		<Modal.Root open={isOpen} onOpenChange={onClose}>
			<Modal.Content size="md">
				<Modal.Header>
					<Modal.Title>Restart Pro Plan</Modal.Title>
					<Modal.Description>
						Welcome back! Restart your Pro subscription
					</Modal.Description>
				</Modal.Header>

				<Modal.Body>
					<Stack className="gap-6">
						<StripePaymentForm
							onPaymentMethodReady={handlePaymentMethodReady}
							onError={() => setIsProcessingPayment(false)}
							isProcessing={isProcessingPayment}
						/>

						{isError && (
							<Alert variant="error">
								{error?.message || 'Failed to restart subscription. Please try again.'}
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
					<Button onClick={handleRestartPayment} loading={isProcessingPayment}>
						Restart Pro Plan
					</Button>
				</Modal.Footer>
			</Modal.Content>
		</Modal.Root>
	);
};
