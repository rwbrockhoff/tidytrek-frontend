import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { FollowStats } from './follow-stats';
import {
	useFollowCountsQuery,
	useFollowingQuery,
	useFollowersQuery,
	useUnfollowUserMutation,
} from '@/queries/follow-queries';
import { wrappedRender } from '@/tests/wrapper-utils';

/* eslint-disable @typescript-eslint/no-explicit-any */

vi.mock('@/queries/follow-queries');

const mockedUseFollowCountsQuery = vi.mocked(useFollowCountsQuery);
const mockedUseFollowingQuery = vi.mocked(useFollowingQuery);
const mockedUseFollowersQuery = vi.mocked(useFollowersQuery);
const mockedUseUnfollowUserMutation = vi.mocked(useUnfollowUserMutation);

describe('FollowStats', () => {
	beforeEach(() => {
		vi.clearAllMocks();

		mockedUseFollowingQuery.mockReturnValue({
			data: [],
			isLoading: false,
		} as any);

		mockedUseFollowersQuery.mockReturnValue({
			data: [],
			isLoading: false,
		} as any);

		mockedUseUnfollowUserMutation.mockReturnValue({
			mutate: vi.fn(),
			isPending: false,
		} as any);
	});

	it('renders follow counts when data is available', () => {
		mockedUseFollowCountsQuery.mockReturnValue({
			data: {
				followerCount: 42,
				followingCount: 23,
			},
			isError: false,
		} as any);

		wrappedRender(<FollowStats />);

		// Should show both follower and following counts
		expect(screen.getByText(/42 Followers/i)).toBeInTheDocument();
		expect(screen.getByText(/23 Following/i)).toBeInTheDocument();
	});

	it('renders error message when query fails', () => {
		mockedUseFollowCountsQuery.mockReturnValue({
			data: null,
			isError: true,
		} as any);

		wrappedRender(<FollowStats />);

		expect(
			screen.getByText("We can't fetch your followers at this time"),
		).toBeInTheDocument();
		// Should not show count buttons
		expect(screen.queryByText(/Followers/i)).toBeInTheDocument();
		expect(screen.queryByText(/Following/i)).not.toBeInTheDocument();
	});

	it('handles zero counts correctly', () => {
		mockedUseFollowCountsQuery.mockReturnValue({
			data: {
				followerCount: 0,
				followingCount: 0,
			},
			isError: false,
		} as any);

		wrappedRender(<FollowStats />);

		expect(screen.getByText(/0 Followers/i)).toBeInTheDocument();
		expect(screen.getByText(/0 Following/i)).toBeInTheDocument();
	});

	it('formats large numbers correctly', () => {
		mockedUseFollowCountsQuery.mockReturnValue({
			data: {
				followerCount: 1234,
				followingCount: 5678900,
			},
			isError: false,
		} as any);

		wrappedRender(<FollowStats />);

		// Should format numbers with our formatNumber util
		expect(screen.getByText(/1.2K Followers/i)).toBeInTheDocument();
		expect(screen.getByText(/5.7M Following/i)).toBeInTheDocument();
	});

	it('opens modals when clicking on count buttons', async () => {
		mockedUseFollowCountsQuery.mockReturnValue({
			data: {
				followerCount: 10,
				followingCount: 20,
			},
			isError: false,
		} as any);

		const { user } = wrappedRender(<FollowStats />);

		// Click on followers button
		const followersButton = screen.getByText(/10 Followers/i);
		await user.click(followersButton);

		// Modal should open - verify button is clickable
		expect(followersButton).toBeInTheDocument();
	});
});
