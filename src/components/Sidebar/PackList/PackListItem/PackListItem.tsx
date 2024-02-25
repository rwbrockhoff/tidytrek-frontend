import { PackListItem as ListItem } from '../../../../types/packTypes';
import styled from 'styled-components';

type PackListItemProps = {
	pack: ListItem;
	onClick: (packId: number) => void;
};

const PackListItem = ({ pack, onClick }: PackListItemProps) => {
	return (
		<div key={pack.packId} onClick={() => onClick(pack.packId)}>
			<Text>
				<GripIcon className="fa-solid fa-grip-vertical" />
				{pack.packName}
			</Text>
		</div>
	);
};

export default PackListItem;

const Text = styled.p`
	&& {
		cursor: pointer;
		margin: 10px 0px;
		margin-left: -20px;
		opacity: 1;
		&:hover {
			opacity: 0.8;
			i {
				opacity: 0.6;
			}
		}
		@media only screen and (max-width: 768px) {
			font-size: 1.2em;
		}
	}
`;

const GripIcon = styled.i`
	opacity: 0;
	margin-right: 10px;
	cursor: grab;
`;
