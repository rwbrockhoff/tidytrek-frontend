import { PackListItem as ListItem } from '../../../types/packTypes';
import styled from 'styled-components';

type PackListItemProps = {
	pack: ListItem;
	onClick: (packId: number) => void;
};

export const PackListItem = ({ pack, onClick }: PackListItemProps) => {
	return (
		<div key={pack.packId} onClick={() => onClick(pack.packId)}>
			<Text>
				<GripContainer>
					<i className="fa-solid fa-grip-vertical" />
				</GripContainer>
				{pack.packName}
			</Text>
		</div>
	);
};

const Text = styled.p`
	&& {
		cursor: pointer;
		margin: 1em 0;
		position: relative;
		opacity: 1;
		i {
			opacity: 0;
		}
		&:hover {
			opacity: 0.8;
			i {
				opacity: 0.6;
			}
		}
		${({ theme: t }) =>
			t.mx.mobile(`
				font-size: 1.2em;
		`)}
	}
`;

const GripContainer = styled.span`
	height: 1.5em;
	position: absolute;
	left: -1.8em;
	padding: 0 0.5em;
	cursor: grab;
`;
