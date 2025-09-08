/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSubscriptionDetails } from '../use-subscription-details';
import { useGetSubscriptionQuery } from '@/queries/stripe-queries';
import { useAuth } from '../use-auth';

vi.mock('@/queries/stripe-queries', () => ({
	useGetSubscriptionQuery: vi.fn(),
}));

vi.mock('../use-auth', () => ({
	useAuth: vi.fn(),
}));

const mockUseGetSubscriptionQuery = vi.mocked(useGetSubscriptionQuery);
const mockUseAuth = vi.mocked(useAuth);

describe('useSubscriptionDetails', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('returns correct values when user has no subscription', () => {
		mockUseAuth.mockReturnValue({
			subscriptionStatus: false,
			isLoading: false,
			isAuthenticated: true,
			user: null,
			settings: null,
		});

		mockUseGetSubscriptionQuery.mockReturnValue({
			data: { subscriptionStatus: false, subscription: null },
			isLoading: false,
		} as any);

		const { result } = renderHook(() => useSubscriptionDetails());

		expect(result.current.isSubscribed).toBe(false);
		expect(result.current.isPaidSubscription).toBe(false);
		expect(result.current.isComplimentary).toBe(false);
		expect(result.current.subscription).toBe(null);
		expect(result.current.isLoading).toBe(false);
	});

	it('returns correct values for complimentary subscription', () => {
		const mockComplimentarySubscription = {
			status: 'active' as const,
			subscriptionId: 123,
			stripeSubscriptionId: undefined, // No Stripe ID = complimentary
			currentPeriodStart: new Date('2025-01-01'),
			currentPeriodEnd: new Date('2025-02-01'),
			cancelAtPeriodEnd: false,
			canceledAt: null,
		};

		mockUseAuth.mockReturnValue({
			subscriptionStatus: true,
			isLoading: false,
			isAuthenticated: true,
			user: null,
			settings: null,
		});

		mockUseGetSubscriptionQuery.mockReturnValue({
			data: { subscriptionStatus: true, subscription: mockComplimentarySubscription },
			isLoading: false,
		} as any);

		const { result } = renderHook(() => useSubscriptionDetails());

		expect(result.current.isSubscribed).toBe(true);
		expect(result.current.isPaidSubscription).toBe(false);
		expect(result.current.isComplimentary).toBe(true);
		expect(result.current.subscription).toBe(mockComplimentarySubscription);
	});

	it('returns correct values for paid subscription', () => {
		const mockSubscription = {
			status: 'active' as const,
			subscriptionId: 123,
			stripeSubscriptionId: 'sub_123',
			currentPeriodStart: new Date('2025-01-01'),
			currentPeriodEnd: new Date('2025-02-01'),
			cancelAtPeriodEnd: false,
			canceledAt: null,
		};

		mockUseAuth.mockReturnValue({
			subscriptionStatus: true,
			isLoading: false,
			isAuthenticated: true,
			user: null,
			settings: null,
		});

		mockUseGetSubscriptionQuery.mockReturnValue({
			data: { subscriptionStatus: true, subscription: mockSubscription },
			isLoading: false,
		} as any);

		const { result } = renderHook(() => useSubscriptionDetails());

		expect(result.current.isSubscribed).toBe(true);
		expect(result.current.isPaidSubscription).toBe(true);
		expect(result.current.isComplimentary).toBe(false);
		expect(result.current.subscription).toBe(mockSubscription);
	});

	it('returns loading state when subscription query is loading', () => {
		mockUseAuth.mockReturnValue({
			subscriptionStatus: false,
			isLoading: false,
			isAuthenticated: true,
			user: null,
			settings: null,
		});

		mockUseGetSubscriptionQuery.mockReturnValue({
			data: undefined,
			isLoading: true,
		} as any);

		const { result } = renderHook(() => useSubscriptionDetails());

		expect(result.current.isLoading).toBe(true);
		expect(result.current.isSubscribed).toBe(false);
		expect(result.current.subscription).toBeUndefined();
	});
});
