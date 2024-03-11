import { Header, Divider, Icon, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import { type PackListItem as PackListItemType } from '../../../types/packTypes';
import { Drop, Drag } from '../../../components/drag-drop-wrapper';
import { PackListItem } from './pack-list-item';

type PackListProps = {
	packList: PackListItemType[];
	getPack: (packId: number) => void;
	addPack: () => void;
};

export const PackList = ({ packList, getPack, addPack }: PackListProps) => {
	return (
		<div>
			<StyledHeader as="h3">Packs</StyledHeader>

			<Drop droppableId={'sidebar-pack-list'} type="packlist-item">
				{packList.map((pack: PackListItemType, index: number) => {
					return (
						<Drag key={pack.packId} draggableId={pack.packId} index={index}>
							<PackListItem pack={pack} onClick={getPack} />
						</Drag>
					);
				})}
			</Drop>

			<Divider />

			<NewPackButton size="mini" onClick={addPack}>
				<Icon name="add" />
				Create New Pack
			</NewPackButton>
		</div>
	);
};

const NewPackButton = styled(Button)`
	&&& {
		background-color: transparent;
		color: white;
		padding: 0;

		${({ theme: t }) =>
			t.mx.mobile(`
				font-size: 1em;
				margin-top: 1em;
		`)}
	}
`;

const StyledHeader = styled(Header)`
	&&& {
		color: white;
	}
`;
