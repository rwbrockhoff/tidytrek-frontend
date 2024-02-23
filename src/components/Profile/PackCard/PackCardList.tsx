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
			{packList.map((pack, index) => {
				return <PackCard key={pack.packId || index} pack={pack} />;
			})}
		</ListContainer>
	);
};

export default PackCardList;

const ListContainer = styled.div`
	display: flex;
	margin: 5vh 0vh;
`;
