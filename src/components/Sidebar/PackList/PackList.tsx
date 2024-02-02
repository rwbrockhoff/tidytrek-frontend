import './PackList.css';
import { Header, Divider, Icon } from 'semantic-ui-react';
import { type PackListItem as PackListItemType } from '../../../types/packTypes';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { type DropResult } from 'react-beautiful-dnd';
import PackListItem from './PackListItem/PackListItem';

type PackListProps = {
	packList: PackListItemType[];
	getPack: (packId: number) => Promise<void>;
	addPack: () => void;
	onDragEnd: (result: DropResult) => void;
};

const PackList = ({ packList, getPack, addPack, onDragEnd }: PackListProps) => {
	return (
		<div className="pack-list-container">
			<Header as="h3" className="pack-title">
				Packs
			</Header>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId={'sidebar-pack-list'}>
					{(provided) => (
						<>
							<div
								ref={provided.innerRef}
								{...provided.droppableProps}
								className="pack-list-item">
								{packList.map((pack: PackListItemType, index: number) => {
									return (
										<PackListItem
											index={index}
											key={pack.packId}
											pack={pack}
											onClick={getPack}
										/>
									);
								})}
								{provided.placeholder}
							</div>
						</>
					)}
				</Droppable>
			</DragDropContext>
			<Divider />
			<p onClick={addPack} className="add-new-pack-button">
				<Icon name="add" />
				Create New Pack
			</p>
		</div>
	);
};

export default PackList;
