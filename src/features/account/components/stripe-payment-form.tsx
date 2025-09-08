import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';
import { Stack } from '@/components/layout';
import { Alert } from '@/components/alpine';
import styles from './stripe-payment-form.module.css';

type StripePaymentFormProps = {
	onPaymentMethodReady: (paymentMethodId: string) => void;
	onError?: () => void;
	isProcessing: boolean;
};

const cardElementOptions = {
	style: {
		base: {
			fontSize: '16px',
			color: 'var(--color-text-primary)',
			'::placeholder': {
				color: 'var(--color-text-secondary)',
			},
		},
		invalid: {
			color: 'var(--color-error)',
		},
	},
};

export const StripePaymentForm = ({
	onPaymentMethodReady,
	onError,
	isProcessing,
}: StripePaymentFormProps) => {
	const stripe = useStripe();
	const elements = useElements();
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async () => {
		if (!stripe || !elements) {
			setError('Payment system not ready');
			onError?.();
			return;
		}

		const cardElement = elements.getElement(CardElement);
		if (!cardElement) {
			setError('Card element not found');
			onError?.();
			return;
		}

		setError(null);

		const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: cardElement,
		});

		if (stripeError) {
			setError(stripeError.message || 'Payment method creation failed');
			onError?.();
			return;
		}

		if (paymentMethod) {
			onPaymentMethodReady(paymentMethod.id);
		}
	};

	// Submit payment when user clicks upgrade button
	useEffect(() => {
		if (isProcessing) {
			setError(null);
			handleSubmit();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isProcessing]);

	return (
		<Stack className="gap-4">
			<div className={styles.cardElementContainer}>
				<CardElement options={cardElementOptions} />
			</div>

			{error && <Alert variant="error">{error}</Alert>}
		</Stack>
	);
};
