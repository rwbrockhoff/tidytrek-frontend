import { Flex, Text } from '@radix-ui/themes';
import { FollowModal } from '../follow-modal/follow-modal';
import { useFollowCountsQuery } from '@/queries/follow-queries';
import styles from './follow-stats.module.css';

export const FollowStats = () => {
	const { data: followCounts, isError: followCountsError } = useFollowCountsQuery();

	if (followCountsError) {
		return (
			<Flex className="items-center py-1">
				<Text size="2" style={{ color: 'var(--color-text-tertiary)' }}>
					We can't fetch your followers at this time
				</Text>
			</Flex>
		);
	}

	if (!followCounts) {
		return null;
	}

	return (
		<Flex className="gap-2 items-center">
			<FollowModal count={followCounts.followerCount} type="followers" />
			<div className={styles.divider}></div>
			<FollowModal count={followCounts.followingCount} type="following" />
		</Flex>
	);
};
