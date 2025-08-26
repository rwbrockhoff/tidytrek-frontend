import { type SavedPack } from '@/types/saved-packs-types';
import { Grid } from '@/components/layout';
import { SavedPackCard } from '../saved-pack-card/saved-pack-card';
import { SavedPacksSkeleton } from '../saved-packs-skeleton/saved-packs-skeleton';

type SavedPacksGridProps = {
	savedPacks: SavedPack[];
	isLoading: boolean;
	onRemoveBookmark: (packId: number) => void;
	isPending: boolean;
};

export const SavedPacksGrid = ({ savedPacks, isLoading, onRemoveBookmark, isPending }: SavedPacksGridProps) => {
	if (isLoading && savedPacks.length === 0) {
		return <SavedPacksSkeleton />;
	}

	return (
		<Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full">
			{savedPacks.map((savedPack, index) => (
				<SavedPackCard 
					key={savedPack.packId || index} 
					savedPack={savedPack} 
					onRemoveBookmark={onRemoveBookmark}
					isPending={isPending}
				/>
			))}
		</Grid>
	);
};