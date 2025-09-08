import { useState, useEffect } from 'react';
import { Button } from '@/components/alpine';
import { BookmarkIcon } from '@/components/icons';
import {
	useAddBookmarkMutation,
	useRemoveBookmarkMutation,
	useGetSavedPacksQuery,
} from '@/queries/saved-packs-queries';
import type { Pack } from '@/types/pack-types';
import { cn } from '@/styles/utils';
import styles from './pack-bookmark-button.module.css';
import { usePermissions } from '@/hooks/auth/use-permissions';
import { useSubscriptionDetails } from '@/hooks/auth/use-subscription-details';
import { UpgradePlanModal } from '@/layout/navigation/sidebar/pack-list/create-pack-menu/upgrade-plan-modal';

type PackBookmarkButtonProps = {
	pack: Pack;
};

export const PackBookmarkButton = ({ pack }: PackBookmarkButtonProps) => {
	const { packId } = pack;
	const [isBookmarked, setIsBookmarked] = useState(false);
	const [showUpgradeModal, setShowUpgradeModal] = useState(false);

	const permissions = usePermissions();
	const { isAuthenticated, isPreviewMode } = permissions;
	const { isSubscribed } = useSubscriptionDetails();
	const { data: savedPacksData } = useGetSavedPacksQuery();
	const { mutate: addBookmark, isPending: isAdding } = useAddBookmarkMutation();
	const { mutate: removeBookmark, isPending: isRemoving } = useRemoveBookmarkMutation();

	const isPending = isAdding || isRemoving;
	const isDisabled = !isAuthenticated || isPreviewMode || isPending;

	useEffect(() => {
		if (savedPacksData?.savedPacks) {
			const bookmarked = savedPacksData.savedPacks.some(
				(savedPack) => savedPack.packId === packId,
			);
			setIsBookmarked(bookmarked);
		}
	}, [savedPacksData, packId]);

	const handleToggleBookmark = () => {
		if (!isAuthenticated || isPreviewMode) return;

		// Handle user with free plan saving a pack (subscription guard)
		if (!isSubscribed && !isBookmarked) {
			setShowUpgradeModal(true);
			return;
		}

		setIsBookmarked(!isBookmarked);

		if (isBookmarked) {
			removeBookmark(packId, {
				onError: () => {
					setIsBookmarked(true);
				},
			});
		} else {
			addBookmark(
				{ packId },
				{
					onError: () => {
						setIsBookmarked(false);
					},
				},
			);
		}
	};

	return (
		<>
			<Button
				onClick={handleToggleBookmark}
				disabled={isDisabled}
				variant="ghost"
				size="sm"
				iconLeft={<BookmarkIcon />}
				aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
				className={cn(styles.bookmarkButton, isBookmarked && 'bookmark-filled')}>
				{isBookmarked ? 'Saved' : 'Save'}
			</Button>

			<UpgradePlanModal
				isOpen={showUpgradeModal}
				onClose={() => setShowUpgradeModal(false)}
				message="Join today to save other users' packs!"
			/>
		</>
	);
};
