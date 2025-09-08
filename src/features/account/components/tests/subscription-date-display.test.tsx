import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SubscriptionDateDisplay } from '../subscription-date-display';

describe('SubscriptionDateDisplay', () => {
	it('renders nothing when no subscription', () => {
		const { container } = render(
			<SubscriptionDateDisplay
				isComplimentary={false}
				isPaidSubscription={false}
				subscription={null}
			/>,
		);

		expect(container.firstChild).toBeNull();
	});

	it('renders nothing for complimentary subscription', () => {
		const { container } = render(
			<SubscriptionDateDisplay
				isComplimentary={true}
				isPaidSubscription={false}
				subscription={null}
			/>,
		);

		expect(container.firstChild).toBeNull();
	});

	it('renders active subscription end date', () => {
		const mockSubscription = {
			status: 'active' as const,
			subscriptionId: 123,
			stripeSubscriptionId: 'sub_123',
			currentPeriodStart: new Date('2025-01-01'),
			currentPeriodEnd: new Date('2025-02-01'),
			cancelAtPeriodEnd: false,
			canceledAt: null,
		};

		render(
			<SubscriptionDateDisplay
				isComplimentary={false}
				isPaidSubscription={true}
				subscription={mockSubscription}
			/>,
		);

		expect(screen.getByText(/Next billing date:/)).toBeInTheDocument();
	});

	it('renders cancelled subscription message', () => {
		const mockSubscription = {
			status: 'active' as const,
			subscriptionId: 123,
			stripeSubscriptionId: 'sub_123',
			currentPeriodStart: new Date('2025-01-01'),
			currentPeriodEnd: new Date('2025-02-01'),
			cancelAtPeriodEnd: true,
			canceledAt: new Date('2025-01-15'),
		};

		render(
			<SubscriptionDateDisplay
				isComplimentary={false}
				isPaidSubscription={true}
				subscription={mockSubscription}
			/>,
		);

		expect(screen.getByText(/Cancelled - Pro access until/)).toBeInTheDocument();
	});

	it('handles subscription without currentPeriodEnd', () => {
		const mockSubscription = {
			status: 'active' as const,
			subscriptionId: 123,
			stripeSubscriptionId: 'sub_123',
			currentPeriodStart: new Date('2025-01-01'),
			currentPeriodEnd: undefined,
			cancelAtPeriodEnd: false,
			canceledAt: null,
		};

		const { container } = render(
			<SubscriptionDateDisplay
				isComplimentary={false}
				isPaidSubscription={true}
				subscription={mockSubscription}
			/>,
		);

		expect(container.firstChild).toBeNull();
	});
});
