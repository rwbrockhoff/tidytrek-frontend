import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { PricingContext } from '@/contexts/pricing-context';
import { usePricingContext } from '../auth/use-pricing-context';
import { UserViewContext } from '@/contexts/user-view-context';
import { useUserContext } from '../auth/use-user-context';

describe('useUserContext', () => {
	it('returns false when no provider is present', () => {
		const { result } = renderHook(() => useUserContext());
		expect(result.current).toBe(false);
	});

	it('returns false when provider value is false', () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<UserViewContext.Provider value={false}>{children}</UserViewContext.Provider>
		);

		const { result } = renderHook(() => useUserContext(), { wrapper });
		expect(result.current).toBe(false);
	});

	it('returns true when provider value is true', () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<UserViewContext.Provider value={true}>{children}</UserViewContext.Provider>
		);

		const { result } = renderHook(() => useUserContext(), { wrapper });
		expect(result.current).toBe(true);
	});
});

describe('usePricingContext', () => {
	it('returns false when no provider is present', () => {
		const { result } = renderHook(() => usePricingContext());
		expect(result.current).toBe(false);
	});

	it('returns false when provider value is false', () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<PricingContext.Provider value={false}>{children}</PricingContext.Provider>
		);

		const { result } = renderHook(() => usePricingContext(), { wrapper });
		expect(result.current).toBe(false);
	});

	it('returns true when provider value is true', () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<PricingContext.Provider value={true}>{children}</PricingContext.Provider>
		);

		const { result } = renderHook(() => usePricingContext(), { wrapper });
		expect(result.current).toBe(true);
	});
});
