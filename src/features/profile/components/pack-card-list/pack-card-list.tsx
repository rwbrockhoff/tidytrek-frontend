import { type Pack } from '@/types/pack-types';
import { Flex } from '@/components/layout';
import { PackCard } from './pack-card/pack-card';
import { useUserContext } from '@/hooks/auth/use-user-context';
import { SkeletonCard } from '@/components/ui';

type PackCardListProps = {
	packThumbnailList: Pack[] | undefined;
	showSkeletonCards: boolean;
};

export const PackCardList = (props: PackCardListProps) => {
	const userView = useUserContext();
	const { packThumbnailList, showSkeletonCards } = props;

	const packList = packThumbnailList || [];
	const emptyList = !packList.length;
	return (
		<Flex className="flex-wrap gap-6 mt-8 items-stretch">
			{/* Show users packs */}
			{packList.map((pack, index) => {
				return <PackCard key={pack.packId || index} pack={pack} userView={userView} />;
			})}
			{/* Show skeleton UI on error */}
			{showSkeletonCards &&
				emptyList &&
				Array(3)
					.fill(null)
					.map((_, index) => <SkeletonCard key={index} noAnimation />)}
		</Flex>
	);
};
