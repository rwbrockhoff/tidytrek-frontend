import { type Pack } from '@/types/pack-types';
import { Flex } from '@radix-ui/themes';
import styles from './pack-card-list.module.css';
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
		<Flex className={styles.packCardContainer}>
			{/* Show users packs */}
			{packList.map((pack, index) => {
				return <PackCard key={pack.packId || index} pack={pack} userView={userView} />;
			})}
			{/* Show skeleton UI on bad request */}
			{showSkeletonCards &&
				emptyList &&
				Array(3)
					.fill(null)
					.map((_, index) => <SkeletonCard key={index} noAnimation />)}
		</Flex>
	);
};
