import { useGetSavedPacksQuery, useRemoveBookmarkMutation } from '@/queries/saved-packs-queries';
import { SavedPacksGrid } from '../saved-packs-grid/saved-packs-grid';
import { SavedPacksError } from '../saved-packs-error/saved-packs-error';
import styles from '../../routes/saved-packs.module.css';

export const SavedPacksContent = () => {
	const { data, isLoading, isError, refetch } = useGetSavedPacksQuery();
	const { mutate: removeBookmark, isPending } = useRemoveBookmarkMutation();
	const { savedPacks = [] } = data || {};

	const handleRemoveBookmark = (packId: number) => {
		removeBookmark(packId);
	};

	if (isError) {
		return <SavedPacksError onRetry={refetch} />;
	}

	if (isLoading && savedPacks.length === 0) {
		return <SavedPacksGrid savedPacks={[]} isLoading={true} onRemoveBookmark={handleRemoveBookmark} isPending={isPending} />;
	}

	if (!isLoading && savedPacks.length === 0) {
		return <p className={styles.placeholderText}>No saved packs yet.</p>;
	}

	return <SavedPacksGrid savedPacks={savedPacks} isLoading={false} onRemoveBookmark={handleRemoveBookmark} isPending={isPending} />;
};