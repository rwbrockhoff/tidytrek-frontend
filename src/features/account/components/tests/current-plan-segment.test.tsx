/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CurrentPlanSegment } from '../current-plan-segment';
import { useSubscriptionDetails } from '@/hooks/auth/use-subscription-details';

vi.mock('@/hooks/auth/use-subscription-details', () => ({
	useSubscriptionDetails: vi.fn(),
}));

vi.mock('../subscription-date-display', () => ({
	SubscriptionDateDisplay: () => <div data-testid="subscription-date-display" />,
}));

const mockUseSubscriptionDetails = vi.mocked(useSubscriptionDetails);

describe('CurrentPlanSegment', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders Free plan for unsubscribed users', () => {
		mockUseSubscriptionDetails.mockReturnValue({
			isSubscribed: false,
			isComplimentary: false,
			isPaidSubscription: false,
			subscription: null,
			isLoading: false,
		});

		render(<CurrentPlanSegment />);

		expect(screen.getByText('Free')).toBeInTheDocument();
		expect(screen.getByText(/You're on the free plan/)).toBeInTheDocument();
	});

	it('renders Pro plan for subscribed users', () => {
		mockUseSubscriptionDetails.mockReturnValue({
			isSubscribed: true,
			isComplimentary: false,
			isPaidSubscription: true,
			subscription: {} as any,
			isLoading: false,
		});

		render(<CurrentPlanSegment />);

		expect(screen.getByText('Pro')).toBeInTheDocument();
		expect(screen.getByText('Your Pro subscription is active')).toBeInTheDocument();
	});

	it('renders complimentary message for complimentary users', () => {
		mockUseSubscriptionDetails.mockReturnValue({
			isSubscribed: true,
			isComplimentary: true,
			isPaidSubscription: false,
			subscription: {} as any,
			isLoading: false,
		});

		render(<CurrentPlanSegment />);

		expect(screen.getByText('Pro')).toBeInTheDocument();
		expect(screen.getByText(/You have complimentary Pro access/)).toBeInTheDocument();
	});

	it('renders SubscriptionDateDisplay component', () => {
		mockUseSubscriptionDetails.mockReturnValue({
			isSubscribed: true,
			isComplimentary: false,
			isPaidSubscription: true,
			subscription: {} as any,
			isLoading: false,
		});

		render(<CurrentPlanSegment />);

		expect(screen.getByTestId('subscription-date-display')).toBeInTheDocument();
	});
});
