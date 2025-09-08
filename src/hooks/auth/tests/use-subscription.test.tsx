import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSubscription } from '../use-subscription';
import { useAuth } from '../use-auth';

vi.mock('../use-auth', () => ({
	useAuth: vi.fn(),
}));

const mockUseAuth = vi.mocked(useAuth);

describe('useSubscription', () => {
	it('returns isPro as true when subscriptionStatus is true', () => {
		mockUseAuth.mockReturnValue({
			subscriptionStatus: true,
			isLoading: false,
			isAuthenticated: true,
			user: null,
			settings: null,
		});

		const { result } = renderHook(() => useSubscription());

		expect(result.current.isPro).toBe(true);
		expect(result.current.isLoading).toBe(false);
	});

	it('returns isPro as false when subscriptionStatus is false', () => {
		mockUseAuth.mockReturnValue({
			subscriptionStatus: false,
			isLoading: false,
			isAuthenticated: true,
			user: null,
			settings: null,
		});

		const { result } = renderHook(() => useSubscription());

		expect(result.current.isPro).toBe(false);
		expect(result.current.isLoading).toBe(false);
	});

	it('returns loading state from auth', () => {
		mockUseAuth.mockReturnValue({
			subscriptionStatus: false,
			isLoading: true,
			isAuthenticated: false,
			user: null,
			settings: null,
		});

		const { result } = renderHook(() => useSubscription());

		expect(result.current.isPro).toBe(false);
		expect(result.current.isLoading).toBe(true);
	});
});