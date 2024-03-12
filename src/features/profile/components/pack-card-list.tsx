import styled from 'styled-components';
import { CardGroup } from 'semantic-ui-react';
import { Pack } from '@/types/pack-types';
import { PackCard } from './pack-card';
import { useUserContext } from '@/hooks/use-viewer-context';

type PackCardListProps = {
	packThumbnailList: Pack[] | undefined;
};

export const PackCardList = (props: PackCardListProps) => {
	const userView = useUserContext();
	const { packThumbnailList } = props;
	const packList = packThumbnailList || [];
	return (
		<ListContainer>
			<CardGroup itemsPerRow={3} stackable>
				{packList.map((pack, index) => {
					return <PackCard key={pack.packId || index} pack={pack} userView={userView} />;
				})}
			</CardGroup>
		</ListContainer>
	);
};

const ListContainer = styled.div`
	margin: 5vh 0vh;
`;
