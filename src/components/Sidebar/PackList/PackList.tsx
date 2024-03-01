import { Header, Divider, Icon, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import { type PackListItem as PackListItemType } from '../../../types/packTypes';
import { Drop, Drag } from '../../../shared/components/DragDropWrapper';
import PackListItem from './PackListItem/PackListItem';
import { mobile } from '../../../shared/mixins/mixins';

type PackListProps = {
	packList: PackListItemType[];
	getPack: (packId: number) => void;
	addPack: () => void;
};

const PackList = ({ packList, getPack, addPack }: PackListProps) => {
	return (
		<div>
			<Header as="h3">Packs</Header>

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

export default PackList;

const NewPackButton = styled(Button)`
	&&& {
		background-color: transparent;
		color: white;
		padding: 0;
		${mobile(`
			font-size: 1em;
			margin-top: 1em;
		`)}
	}
`;
