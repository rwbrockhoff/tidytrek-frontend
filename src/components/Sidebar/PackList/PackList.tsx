import './PackList.css';
import { Header, Divider, Icon } from 'semantic-ui-react';
import { type PackListItem as PackListItemType } from '../../../types/packTypes';
import { Drop, Drag } from '../../../shared/DragDropWrapper';
import PackListItem from './PackListItem/PackListItem';

type PackListProps = {
	packList: PackListItemType[];
	getPack: (packId: number) => Promise<void>;
	addPack: () => void;
};

const PackList = ({ packList, getPack, addPack }: PackListProps) => {
	return (
		<div className="pack-list-container">
			<Header as="h3" className="pack-title">
				Packs
			</Header>

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
			<p onClick={addPack} className="add-new-pack-button">
				<Icon name="add" />
				Create New Pack
			</p>
		</div>
	);
};

export default PackList;
