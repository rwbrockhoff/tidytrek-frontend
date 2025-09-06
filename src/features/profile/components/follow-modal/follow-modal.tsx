import * as Modal from '@/components/alpine/modal/modal';
import { Button, TextField } from '@/components/alpine';
import { Avatar } from '@/components/media';
import { Stack, Flex } from '@/components/layout';
import { Link } from 'react-router-dom';
import {
	useFollowingQuery,
	useFollowersQuery,
	useUnfollowUserMutation,
} from '@/queries/follow-queries';
import { UserFollowingIcon, SearchIcon, UserIcon } from '@/components/icons';
import { useState } from 'react';
import { searchMatch, formatNumber } from '@/utils';
import { type InputEvent } from '@/types/form-types';
import styles from './follow-modal.module.css';
import { cn, mx } from '@/styles/utils';

type FollowModalProps = {
	count: number;
	type: 'following' | 'followers';
};

export const FollowModal = ({ count, type }: FollowModalProps) => {
	const [open, setOpen] = useState(false);
	const [searchInput, setSearchInput] = useState('');

	// Use real API data
	const { data: followingData, isLoading: isLoadingFollowing } = useFollowingQuery();
	const { data: followersData, isLoading: isLoadingFollowers } = useFollowersQuery();

	const data = type === 'following' ? followingData : followersData;
	const isLoading = type === 'following' ? isLoadingFollowing : isLoadingFollowers;
	const unfollowMutation = useUnfollowUserMutation();

	const handleInputChange = (e: InputEvent) => setSearchInput(e.target.value);

	const handleUnfollow = (username: string) => {
		unfollowMutation.mutate(username);
	};

	const filteredData =
		data?.filter(
			(user) =>
				searchMatch(searchInput, user.firstName) ||
				searchMatch(searchInput, user.username) ||
				(user.trailName && searchMatch(searchInput, user.trailName)),
		) || [];

	const displayedData = searchInput.length > 0 ? filteredData : data || [];

	const isFollowing = type === 'following';
	const title = isFollowing ? 'Following' : 'Followers';
	const description = isFollowing ? "People you're following" : 'People following you';
	const buttonText = isFollowing ? 'Following' : 'Followers';
	const searchPlaceholder = isFollowing
		? 'Search people you follow...'
		: 'Search your followers...';
	const emptyMessage = isFollowing
		? "You're not following anyone yet"
		: "You don't have any followers yet";
	const noResultsMessage = `No people found matching "${searchInput}"`;

	return (
		<Modal.Root open={open} onOpenChange={setOpen}>
			<div
				className={cn(
					styles.followButton,
					type === 'followers' && styles.followButtonFirst,
				)}>
				<Button
					variant="ghost"
					color="tertiary"
					size="sm"
					onClick={() => setOpen(true)}
					override>
					{formatNumber(count)} {buttonText}
				</Button>
			</div>

			<Modal.Content size="sm" className={styles.followModalContent}>
				<Modal.Header>
					<Modal.Title>
						{title} ({formatNumber(count)})
					</Modal.Title>
					<Modal.Description>{description}</Modal.Description>

					<div className="mt-4">
						<TextField.Standalone
							variant="icon"
							placeholder={searchPlaceholder}
							name="searchInput"
							value={searchInput}
							onChange={handleInputChange}
							icon={<SearchIcon />}
							iconPosition="left"
						/>
					</div>
				</Modal.Header>

				<Modal.Body className={styles.body}>
					{isLoading ? (
						<div className={cn(styles.emptyState, 'text-center py-4')}>Loading...</div>
					) : !data || data.length === 0 ? (
						<div className={cn(styles.emptyState, 'text-center py-8')}>
							{emptyMessage}
						</div>
					) : searchInput.length > 0 && filteredData.length === 0 ? (
						<Flex
							className={cn(styles.emptyState, 'items-center justify-center gap-1 py-8')}>
							<UserIcon />
							<div>{noResultsMessage}</div>
						</Flex>
					) : (
						<Stack className="gap-4">
							{displayedData.map((user) => (
								<Flex
									key={user.username}
									className={cn(styles.userCard, 'items-center justify-between w-full')}>
									<Link
										to={`/u/${user.username}`}
										className={cn(
											styles.userLink,
											'flex items-center gap-3 flex-1 min-w-0',
										)}>
										<Avatar
											src={user.profilePhotoUrl || undefined}
											size="sm"
											withBorder={false}
										/>
										<Stack className="gap-1 min-w-0">
											<div className={cn(styles.userName, mx.textEllipsis)}>
												{user.firstName}
												{user.trailName && (
													<span className={cn(styles.userNameSecondary, 'ml-1')}>
														({user.trailName})
													</span>
												)}
											</div>
											<div className={cn(styles.username, mx.textEllipsis)}>
												@{user.username}
											</div>
										</Stack>
									</Link>

									{/* Only show unfollow button for following list */}
									{isFollowing && (
										<div className="flex-shrink-0 ml-3">
											<Button
												onClick={() => handleUnfollow(user.username)}
												disabled={unfollowMutation.isPending}
												variant="outline"
												size="sm"
												iconLeft={<UserFollowingIcon />}>
												Following
											</Button>
										</div>
									)}
								</Flex>
							))}
						</Stack>
					)}
				</Modal.Body>

				<Modal.Footer>
					<Button
						variant="outline"
						color="tertiary"
						size="md"
						onClick={() => setOpen(false)}>
						Close
					</Button>
				</Modal.Footer>
			</Modal.Content>
		</Modal.Root>
	);
};
