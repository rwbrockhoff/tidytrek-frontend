import { Flex } from '@radix-ui/themes';
import { Pack } from '@/types/pack-types';
import { PackCard } from './pack-card';
import { useUserContext } from '@/hooks';

type PackCardListProps = {
	packThumbnailList: Pack[] | undefined;
};

export const PackCardList = (props: PackCardListProps) => {
	const userView = useUserContext();
	const { packThumbnailList } = props;
	const packList = packThumbnailList || [];
	return (
		<Flex
			wrap="wrap"
			gap="4"
			mt="8"
			direction={{ initial: 'column', sm: 'row' }}
			align={{ initial: 'center', sm: 'stretch' }}>
			{packList.map((pack, index) => {
				return <PackCard key={pack.packId || index} pack={pack} userView={userView} />;
			})}
		</Flex>
	);
};
