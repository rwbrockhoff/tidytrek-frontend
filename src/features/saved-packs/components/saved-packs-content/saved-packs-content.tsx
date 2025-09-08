import {
	useGetSavedPacksQuery,
	useRemoveBookmarkMutation,
} from '@/queries/saved-packs-queries';
import { SavedPacksGrid } from '../saved-packs-grid/saved-packs-grid';
import { SavedPacksError } from '../saved-packs-error/saved-packs-error';
import { useSubscriptionDetails } from '@/hooks/auth/use-subscription-details';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/alpine';
import { Stack } from '@/components/layout';
import styles from '../../routes/saved-packs.module.css';

export const SavedPacksContent = () => {
	const navigate = useNavigate();
	const { isSubscribed } = useSubscriptionDetails();

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
		return (
			<SavedPacksGrid
				savedPacks={[]}
				isLoading={true}
				onRemoveBookmark={handleRemoveBookmark}
				isPending={isPending}
			/>
		);
	}

	if (!isLoading && savedPacks.length === 0) {
		return (
			<Stack className="gap-4 items-center">
				<p className={styles.placeholderText}>No saved packs yet.</p>
				{!isSubscribed && (
					<Button
						onClick={() => navigate('/account/subscription', { viewTransition: true })}
						className="w-fit">
						Upgrade to Save Packs
					</Button>
				)}
			</Stack>
		);
	}

	return (
		<SavedPacksGrid
			savedPacks={savedPacks}
			isLoading={false}
			onRemoveBookmark={handleRemoveBookmark}
			isPending={isPending}
		/>
	);
};
