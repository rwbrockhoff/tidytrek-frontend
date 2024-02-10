import { Category, PackItem, PackListItem } from '../types/packTypes';
import { Table } from 'semantic-ui-react';
import PackCategory from '../components/Dashboard/PackCategory/PackCategory';
import TableRow from '../components/Dashboard/PackCategory/TableRow/TableRow';
import {
	type Active,
	type Over,
	useSensor,
	useSensors,
	PointerSensor,
	DragOverlay as Overlay,
} from '@dnd-kit/core';

export const dragTypes = {
	packItem: 'PackItem',
	packCategory: 'PackCategory',
	packListItem: 'PackListItem',
};

const emptyFn = () => undefined;

export const sensors = () =>
	useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 3 } }));

//--Utility Functions for Drag/Drop Events--//
export const isTask = (item: Active | Over) =>
	item.data.current?.type === dragTypes.packItem;

export const getIdx = (item: Active | Over) => item.data.current?.index;

type SortableItemProps = {
	packItem: PackItem;
	packList: PackListItem[];
	index: number | undefined;
};

export const createSortablePackItem = (props: SortableItemProps) => {
	const { packItem, packList, index } = props;
	return {
		id: packItem.packItemId,
		data: {
			type: dragTypes.packItem,
			index,
			packItem,
			packCategoryId: packItem.packCategoryId,
			renderDragOverlay: (active: Active) => {
				return (
					<TableRow
						item={active.data.current?.packItem}
						packList={packList}
						handleMoveItemToPack={emptyFn}
						handleOnSave={emptyFn}
						handleDelete={emptyFn}
					/>
				);
			},
		},
	};
};

export const createSortablePackCategory = ({
	category,
	packList,
	index,
}: {
	category: Category;
	packList: PackListItem[];
	index: number | undefined;
}) => {
	return {
		id: category.packCategoryId,
		transition: {
			duration: 250,
			easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
		},
		data: {
			type: dragTypes.packCategory,
			index,
			category,
			renderDragOverlay: () => {
				return (
					<PackCategory
						category={category}
						packList={packList}
						index={index}
						key={category?.packCategoryId || index}
					/>
				);
			},
		},
	};
};

export const DragItemOverlay = ({ active }: { active: Active | null }) => {
	if (active) {
		return (
			<Overlay>
				<Table fixed striped compact columns="16" size="small">
					<tbody>{active?.data.current?.renderDragOverlay?.(active)}</tbody>
				</Table>
			</Overlay>
		);
	} else return null;
};

export const DragOverlay = ({ active }: { active: Active | null }) => {
	if (active) {
		return <Overlay>{active?.data.current?.renderDragOverlay?.(active)}</Overlay>;
	} else return null;
};

export const sortedCategoryIds = (packCategories: Category[]) =>
	packCategories.map((category) => category.packCategoryId);
