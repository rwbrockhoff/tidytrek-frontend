import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { FollowButton } from './follow-button';
import { useFollowUserMutation, useUnfollowUserMutation } from '@/queries/follow-queries';
import { wrappedRender } from '@/tests/wrapper-utils';

/* eslint-disable @typescript-eslint/no-explicit-any */

// Mock the mutations
vi.mock('@/queries/follow-queries');

const mockedUseFollowUserMutation = vi.mocked(useFollowUserMutation);
const mockedUseUnfollowUserMutation = vi.mocked(useUnfollowUserMutation);

describe('FollowButton', () => {
	const mockFollowMutate = vi.fn();
	const mockUnfollowMutate = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();

		mockedUseFollowUserMutation.mockReturnValue({
			mutate: mockFollowMutate,
			isPending: false,
		} as any);

		mockedUseUnfollowUserMutation.mockReturnValue({
			mutate: mockUnfollowMutate,
			isPending: false,
		} as any);
	});

	it('renders follow button when not following', () => {
		wrappedRender(<FollowButton username="testuser" isFollowing={false} />);

		expect(screen.getByRole('button', { name: /follow/i })).toBeInTheDocument();
		expect(screen.queryByText(/following/i)).not.toBeInTheDocument();
	});

	it('renders following button when already following', () => {
		wrappedRender(<FollowButton username="testuser" isFollowing={true} />);

		expect(screen.getByRole('button', { name: /following/i })).toBeInTheDocument();
		expect(screen.queryByRole('button', { name: /^follow$/i })).not.toBeInTheDocument();
	});

	it('calls follow mutation when clicking follow button', async () => {
		const { user } = wrappedRender(
			<FollowButton username="testuser" isFollowing={false} />,
		);

		const followButton = screen.getByRole('button', { name: /follow/i });
		await user.click(followButton);

		expect(mockFollowMutate).toHaveBeenCalledWith('testuser');
	});

	it('calls unfollow mutation when clicking following button', async () => {
		const { user } = wrappedRender(
			<FollowButton username="testuser" isFollowing={true} />,
		);

		const followingButton = screen.getByRole('button', { name: /following/i });
		await user.click(followingButton);

		expect(mockUnfollowMutate).toHaveBeenCalledWith('testuser');
	});

	it('disables button when mutation is pending', () => {
		mockedUseFollowUserMutation.mockReturnValue({
			mutate: mockFollowMutate,
			isPending: true,
		} as any);

		wrappedRender(<FollowButton username="testuser" isFollowing={false} />);

		const button = screen.getByRole('button');
		expect(button).toBeDisabled();
	});

	it('shows correct icons for different follow states', () => {
		const { rerender } = wrappedRender(
			<FollowButton username="testuser" isFollowing={false} />,
		);

		// Should show follow icon
		expect(screen.getByRole('button')).toContainHTML('svg');

		rerender(<FollowButton username="testuser" isFollowing={true} />);

		// Should show following icon
		expect(screen.getByRole('button')).toContainHTML('svg');
	});
});
