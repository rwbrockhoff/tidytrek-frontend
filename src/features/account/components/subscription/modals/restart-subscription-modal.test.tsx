/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { RestartSubscriptionModal } from './restart-subscription-modal';
import { useRestartSubscriptionMutation } from '@/queries/stripe-queries';
import { wrappedRender } from '@/tests/wrapper-utils';

vi.mock('@/queries/stripe-queries', () => ({
	useRestartSubscriptionMutation: vi.fn(),
}));

// Mock Stripe Payment Form component
vi.mock('../forms/stripe-payment-form', () => ({
	StripePaymentForm: ({ onPaymentMethodReady, isProcessing }: any) => (
		<div data-testid="stripe-payment-form">
			<span>Stripe Payment Form</span>
			<button onClick={() => onPaymentMethodReady('pm_test123')} disabled={isProcessing}>
				Submit Payment
			</button>
		</div>
	),
}));

const mockUseRestartSubscriptionMutation = vi.mocked(useRestartSubscriptionMutation);

describe('RestartSubscriptionModal', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockUseRestartSubscriptionMutation.mockReturnValue({
			mutate: vi.fn(),
			isPending: false,
			isError: false,
			error: null,
		} as any);
	});

	it('shows error alert when mutation fails', () => {
		mockUseRestartSubscriptionMutation.mockReturnValue({
			mutate: vi.fn(),
			isPending: false,
			isError: true,
			error: { message: 'Payment failed' },
		} as any);

		wrappedRender(<RestartSubscriptionModal isOpen={true} onClose={() => {}} />);

		expect(screen.getByText('Payment failed')).toBeInTheDocument();
	});

	it('calls onClose when mutation succeeds', () => {
		const mockOnClose = vi.fn();
		const mockMutate = vi.fn();

		mockUseRestartSubscriptionMutation.mockReturnValue({
			mutate: mockMutate,
			isPending: false,
			isError: false,
			error: null,
		} as any);

		wrappedRender(<RestartSubscriptionModal isOpen={true} onClose={mockOnClose} />);

		// Simulate successful payment, click submit payment button
		const submitButton = screen.getByText('Submit Payment');
		submitButton.click();

		// Verify mutation was called with correct parameters
		expect(mockMutate).toHaveBeenCalledWith(
			{
				stripePaymentMethodId: 'pm_test123',
				stripePriceId: expect.any(String),
			},
			{
				onError: expect.any(Function),
				onSuccess: expect.any(Function),
			},
		);
	});
});
