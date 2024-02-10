import './PackList.css';
import { Header, Divider, Icon } from 'semantic-ui-react';
import { type PackListItem as PackListItemType } from '../../../types/packTypes';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { sensors } from '../../../shared/DragDropKit';
import PackListItem from './PackListItem/PackListItem';

type PackListProps = {
	packList: PackListItemType[];
	getPack: (packId: number) => Promise<void>;
	addPack: () => void;
	onDragEnd: (result: DragEndEvent) => void;
};

const PackList = ({ packList, getPack, addPack, onDragEnd }: PackListProps) => {
	const sortedPackIds = packList.map((item: PackListItemType) => item.packId);
	return (
		<div className="pack-list-container">
			<Header as="h3" className="pack-title">
				Packs
			</Header>
			<DndContext onDragEnd={onDragEnd} sensors={sensors()}>
				<SortableContext items={sortedPackIds} strategy={verticalListSortingStrategy}>
					{packList.map((pack: PackListItemType, index: number) => {
						return (
							<PackListItem
								key={pack.packId || index}
								index={index}
								pack={pack}
								onClick={getPack}
							/>
						);
					})}
				</SortableContext>
			</DndContext>
			<Divider />
			<p onClick={addPack} className="add-new-pack-button">
				<Icon name="add" />
				Create New Pack
			</p>
		</div>
	);
};

export default PackList;
