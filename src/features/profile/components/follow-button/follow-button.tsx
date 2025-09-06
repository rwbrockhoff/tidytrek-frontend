import { Button } from '@/components/alpine';
import { UserFollowIcon, UserFollowingIcon } from '@/components/icons';
import { useFollowUserMutation, useUnfollowUserMutation } from '@/queries/follow-queries';

type FollowButtonProps = {
	username: string;
	isFollowing: boolean;
};

export const FollowButton = ({ username, isFollowing }: FollowButtonProps) => {
	const followMutation = useFollowUserMutation();
	const unfollowMutation = useUnfollowUserMutation();

	const isPending = followMutation.isPending || unfollowMutation.isPending;

	const handleFollowToggle = () => {
		if (isFollowing) {
			unfollowMutation.mutate(username);
		} else {
			followMutation.mutate(username);
		}
	};

	return (
		<Button
			onClick={handleFollowToggle}
			disabled={isPending}
			variant="outline"
			color="tertiary"
			size="sm"
			iconLeft={isFollowing ? <UserFollowingIcon /> : <UserFollowIcon />}>
			{isFollowing ? 'Following' : 'Follow'}
		</Button>
	);
};
