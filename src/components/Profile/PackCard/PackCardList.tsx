import { CardGroup } from 'semantic-ui-react';
import { Pack } from '../../../types/packTypes';
import PackCard from './PackCard';
import styled from 'styled-components';

type PackCardListProps = {
	packThumbnailList: Pack[] | undefined;
};

const PackCardList = (props: PackCardListProps) => {
	const { packThumbnailList } = props;
	const packList = packThumbnailList || [];
	return (
		<ListContainer>
			<CardGroup itemsPerRow={4} stackable>
				{packList.map((pack, index) => {
					return <PackCard key={pack.packId || index} pack={pack} />;
				})}
			</CardGroup>
		</ListContainer>
	);
};

export default PackCardList;

const ListContainer = styled.div`
	margin: 5vh 0vh;
`;
