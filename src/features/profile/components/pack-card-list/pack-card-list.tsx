import { type Pack } from '@/types/pack-types';
import { Grid } from '@/components/layout';
import { PackCard } from './pack-card/pack-card';
import { useUserPermissionsContext } from '@/hooks/auth/use-user-permissions-context';
import { SkeletonCard } from '@/components/ui';

type PackCardListProps = {
	packThumbnailList: Pack[] | undefined;
	showSkeletonCards: boolean;
};

export const PackCardList = (props: PackCardListProps) => {
	const { isCreator } = useUserPermissionsContext();
	const { packThumbnailList, showSkeletonCards } = props;

	const packList = packThumbnailList || [];
	const emptyList = !packList.length;
	return (
		<Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full">
			{/* Show users packs */}
			{packList.map((pack, index) => {
				return <PackCard key={pack.packId || index} pack={pack} canEdit={isCreator} />;
			})}
			{/* Show skeleton UI on error */}
			{showSkeletonCards &&
				emptyList &&
				Array(3)
					.fill(null)
					.map((_, index) => <SkeletonCard key={index} noAnimation />)}
		</Grid>
	);
};
