/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { CancelSubscriptionModal } from './cancel-subscription-modal';
import { useGetPackListQuery } from '@/queries/pack-queries';
import { useSubscriptionDetails } from '@/hooks/auth/use-subscription-details';
import { wrappedRender } from '@/tests/wrapper-utils';

vi.mock('@/queries/pack-queries', () => ({
	useGetPackListQuery: vi.fn(),
}));

vi.mock('@/hooks/auth/use-subscription-details', () => ({
	useSubscriptionDetails: vi.fn(),
}));

const mockUseGetPackListQuery = vi.mocked(useGetPackListQuery);
const mockUseSubscriptionDetails = vi.mocked(useSubscriptionDetails);

describe('CancelSubscriptionModal', () => {
	beforeEach(() => {
		vi.clearAllMocks();

		mockUseGetPackListQuery.mockReturnValue({
			data: {
				packList: [{ packId: 1, packName: 'Test Pack' }],
			},
		} as any);

		mockUseSubscriptionDetails.mockReturnValue({
			subscription: {
				currentPeriodEnd: new Date('2025-10-13'),
			},
		} as any);
	});

	it('shows pack limitation details for free plan', () => {
		wrappedRender(
			<CancelSubscriptionModal isOpen={true} onClose={() => {}} onConfirm={() => {}} />,
		);

		expect(screen.getByText(/only have access to your top pack/)).toBeInTheDocument();
		expect(screen.getByText('"Test Pack"')).toBeInTheDocument();
		expect(screen.getByText(/Tip: Reorder your packs/)).toBeInTheDocument();
	});

	it('handles missing pack data', () => {
		mockUseGetPackListQuery.mockReturnValue({
			data: null,
		} as any);

		wrappedRender(
			<CancelSubscriptionModal isOpen={true} onClose={() => {}} onConfirm={() => {}} />,
		);

		// Should not show when there is no pack data
		expect(
			screen.queryByText(/only have access to your top pack/),
		).not.toBeInTheDocument();
	});

	it('calls onConfirm when cancel button is clicked', () => {
		const mockOnConfirm = vi.fn();

		wrappedRender(
			<CancelSubscriptionModal
				isOpen={true}
				onClose={() => {}}
				onConfirm={mockOnConfirm}
			/>,
		);

		const cancelButton = screen.getByRole('button', { name: 'Cancel Subscription' });
		cancelButton.click();

		expect(mockOnConfirm).toHaveBeenCalledTimes(1);
	});
});
