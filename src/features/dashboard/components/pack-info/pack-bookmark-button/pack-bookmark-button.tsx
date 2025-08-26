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

type PackBookmarkButtonProps = {
	pack: Pack;
};

export const PackBookmarkButton = ({ pack }: PackBookmarkButtonProps) => {
	const { packId } = pack;
	const [isBookmarked, setIsBookmarked] = useState(false);

	const { data: savedPacksData } = useGetSavedPacksQuery();
	const { mutate: addBookmark, isPending: isAdding } = useAddBookmarkMutation();
	const { mutate: removeBookmark, isPending: isRemoving } = useRemoveBookmarkMutation();

	const isPending = isAdding || isRemoving;

	useEffect(() => {
		if (savedPacksData?.savedPacks) {
			const bookmarked = savedPacksData.savedPacks.some(
				(savedPack) => savedPack.packId === packId,
			);
			setIsBookmarked(bookmarked);
		}
	}, [savedPacksData, packId]);

	const handleToggleBookmark = () => {
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
		<Button
			onClick={handleToggleBookmark}
			disabled={isPending}
			variant="ghost"
			size="sm"
			iconLeft={<BookmarkIcon />}
			aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
			className={cn(styles.bookmarkButton, isBookmarked && 'bookmark-filled')}>
			{isBookmarked ? 'Saved' : 'Save'}
		</Button>
	);
};
