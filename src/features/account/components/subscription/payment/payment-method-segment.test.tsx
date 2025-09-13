/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PaymentMethodSegment } from './payment-method-segment';
import { useSubscriptionDetails } from '@/hooks/auth/use-subscription-details';
import { wrappedRender } from '@/tests/wrapper-utils';

vi.mock('@/hooks/auth/use-subscription-details', () => ({
	useSubscriptionDetails: vi.fn(),
}));

// Mock bare bones modal for testing interactions
vi.mock('./edit-payment-method-modal', () => ({
	EditPaymentMethodModal: ({ isOpen, onClose, onSuccess }: any) => (
		<div data-testid="edit-payment-modal">
			{isOpen && (
				<div>
					<span>Edit Payment Modal</span>
					<button onClick={onClose}>Close</button>
					<button onClick={onSuccess}>Update Payment Method</button>
				</div>
			)}
		</div>
	),
}));

const mockUseSubscriptionDetails = vi.mocked(useSubscriptionDetails);

const mockSubscription = {
	status: 'active' as const,
	subscriptionId: 123,
	stripeSubscriptionId: 'sub_123',
	currentPeriodStart: new Date('2025-01-01'),
	currentPeriodEnd: new Date('2025-02-01'),
	cancelAtPeriodEnd: false,
	canceledAt: null,
};

describe('PaymentMethodSegment', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders nothing when not a paid subscription', () => {
		mockUseSubscriptionDetails.mockReturnValue({
			isPaidSubscription: false,
			isSubscribed: false,
			isComplimentary: false,
			subscription: null,
			isLoading: false,
		});

		wrappedRender(<PaymentMethodSegment />);

		expect(screen.queryByText('Payment Method')).not.toBeInTheDocument();
		expect(screen.queryByRole('button', { name: 'Update' })).not.toBeInTheDocument();
	});

	it('renders payment method section for paid subscriptions', () => {
		mockUseSubscriptionDetails.mockReturnValue({
			isPaidSubscription: true,
			isSubscribed: true,
			isComplimentary: false,
			subscription: mockSubscription,
			isLoading: false,
		});

		wrappedRender(<PaymentMethodSegment />);

		expect(screen.getByText('Payment Method')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument();
	});

	it('opens modal when Update button is clicked', async () => {
		const user = userEvent.setup();
		mockUseSubscriptionDetails.mockReturnValue({
			isPaidSubscription: true,
			isSubscribed: true,
			isComplimentary: false,
			subscription: mockSubscription,
			isLoading: false,
		});

		wrappedRender(<PaymentMethodSegment />);

		const updateButton = screen.getByRole('button', { name: 'Update' });
		await user.click(updateButton);

		expect(screen.getByText('Edit Payment Modal')).toBeInTheDocument();
	});

	it('shows success alert when payment method is updated', async () => {
		const user = userEvent.setup();
		mockUseSubscriptionDetails.mockReturnValue({
			isPaidSubscription: true,
			isSubscribed: true,
			isComplimentary: false,
			subscription: mockSubscription,
			isLoading: false,
		});

		wrappedRender(<PaymentMethodSegment />);

		const updateButton = screen.getByRole('button', { name: 'Update' });
		await user.click(updateButton);

		const successButton = screen.getByRole('button', { name: 'Update Payment Method' });
		await user.click(successButton);

		expect(screen.getByText('Payment method updated successfully.')).toBeInTheDocument();
	});

});
