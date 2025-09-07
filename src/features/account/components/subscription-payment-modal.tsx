import * as Modal from '@/components/alpine/modal/modal';
import { Button, Alert } from '@/components/alpine';
import { Stack } from '@/components/layout';
import { useState } from 'react';
import { useCreateSubscriptionMutation } from '@/queries/stripe-queries';
import { StripePaymentForm } from './stripe-payment-form';

type SubscriptionPaymentModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

export const SubscriptionPaymentModal = ({
	isOpen,
	onClose,
}: SubscriptionPaymentModalProps) => {
	const {
		mutate: createSubscription,
		isPending,
		isError,
		error,
	} = useCreateSubscriptionMutation();
	const [isProcessingPayment, setIsProcessingPayment] = useState(false);

	const handlePaymentMethodReady = (paymentMethodId: string) => {
		createSubscription(
			{
				priceId: 'price_1234', // TODO: Get actual price ID
				paymentMethodId,
			},
			{
				onSuccess: () => onClose(),
				onError: () => {
					setIsProcessingPayment(false);
				},
			},
		);
		setIsProcessingPayment(false);
	};

	const handleUpgrade = () => {
		setIsProcessingPayment(true);
	};

	return (
		<Modal.Root open={isOpen} onOpenChange={onClose}>
			<Modal.Content size="md">
				<Modal.Header>
					<Modal.Title>Upgrade to Pro</Modal.Title>
					<Modal.Description>
						Get unlimited packs and advanced features for $5/month
					</Modal.Description>
				</Modal.Header>

				<Modal.Body>
					<Stack className="gap-4">
						<StripePaymentForm
							onPaymentMethodReady={handlePaymentMethodReady}
							isProcessing={isProcessingPayment}
						/>

						{isError && (
							<Alert variant="error">
								{error?.message || 'Failed to create subscription. Please try again.'}
							</Alert>
						)}
					</Stack>
				</Modal.Body>

				<Modal.Footer>
					<Button
						variant="outline"
						color="tertiary"
						onClick={onClose}
						disabled={isPending || isProcessingPayment}>
						Cancel
					</Button>
					<Button onClick={handleUpgrade} loading={isPending || isProcessingPayment}>
						Sign Up for Pro
					</Button>
				</Modal.Footer>
			</Modal.Content>
		</Modal.Root>
	);
};
