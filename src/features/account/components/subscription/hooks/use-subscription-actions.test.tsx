/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSubscriptionActions } from './use-subscription-actions';
import {
	useCancelSubscriptionMutation,
	useReactivateSubscriptionMutation,
} from '@/queries/stripe-queries';

vi.mock('@/queries/stripe-queries', () => ({
	useCancelSubscriptionMutation: vi.fn(),
	useReactivateSubscriptionMutation: vi.fn(),
}));

const mockUseCancelSubscriptionMutation = vi.mocked(useCancelSubscriptionMutation);
const mockUseReactivateSubscriptionMutation = vi.mocked(
	useReactivateSubscriptionMutation,
);

describe('useSubscriptionActions', () => {
	const mockCancelMutate = vi.fn();
	const mockReactivateMutate = vi.fn();
	const mockOnSuccess = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();

		mockUseCancelSubscriptionMutation.mockReturnValue({
			mutate: mockCancelMutate,
			isPending: false,
			isError: false,
		} as any);

		mockUseReactivateSubscriptionMutation.mockReturnValue({
			mutate: mockReactivateMutate,
			isPending: false,
			isError: false,
		} as any);
	});

	it('calls cancel mutation when handleCancel is called with valid subscriptionId', () => {
		const { result } = renderHook(() => useSubscriptionActions(123, mockOnSuccess));

		result.current.handleCancel();

		expect(mockCancelMutate).toHaveBeenCalledWith(
			{ subscriptionId: 123 },
			{ onSuccess: mockOnSuccess },
		);
	});

	it('calls reactivate mutation when handleReactivate is called with valid subscriptionId', () => {
		const { result } = renderHook(() => useSubscriptionActions(123, mockOnSuccess));

		result.current.handleReactivate();

		expect(mockReactivateMutate).toHaveBeenCalledWith(
			{ subscriptionId: 123 },
			{ onSuccess: mockOnSuccess },
		);
	});

	it('does not call mutations when subscriptionId is undefined', () => {
		const { result } = renderHook(() => useSubscriptionActions(undefined, mockOnSuccess));

		result.current.handleCancel();
		result.current.handleReactivate();

		expect(mockCancelMutate).not.toHaveBeenCalled();
		expect(mockReactivateMutate).not.toHaveBeenCalled();
	});

	it('returns correct loading and error states', () => {
		mockUseCancelSubscriptionMutation.mockReturnValue({
			mutate: mockCancelMutate,
			isPending: true,
			isError: true,
		} as any);

		mockUseReactivateSubscriptionMutation.mockReturnValue({
			mutate: mockReactivateMutate,
			isPending: true,
			isError: false,
		} as any);

		const { result } = renderHook(() => useSubscriptionActions(123, mockOnSuccess));

		expect(result.current.isCancelPending).toBe(true);
		expect(result.current.isReactivatePending).toBe(true);
		expect(result.current.hasError).toBe(true);
		expect(result.current.isLoading).toBe(true);
	});
});
