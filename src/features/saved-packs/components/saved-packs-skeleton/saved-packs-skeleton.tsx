import { Grid } from '@/components/layout';
import { SkeletonCard } from '@/components/ui';

export const SavedPacksSkeleton = () => {
	return (
		<Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full">
			<SkeletonCard />
			<SkeletonCard />
			<SkeletonCard />
		</Grid>
	);
};