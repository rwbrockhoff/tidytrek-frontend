import { Category, PackItem, PackListItem } from '../types/packTypes';
import { Table } from 'semantic-ui-react';
import { useMemo } from 'react';
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
	index,
}: {
	category: Category;
	index: number | undefined;
}) => {
	return {
		id: category.packCategoryId,
		data: { type: dragTypes.packCategory, index, category },
	};
};

export const DragOverlay = ({ activeItem }: { activeItem: Active | null }) => {
	if (activeItem) {
		return (
			<Overlay>
				<Table fixed striped compact columns="16" size="small">
					<tbody>{activeItem?.data.current?.renderDragOverlay?.(activeItem)}</tbody>
				</Table>
			</Overlay>
		);
	} else return null;
};

export const sortedCategoryIds = (packCategories: Category[]) => {
	return useMemo(
		() => packCategories.map((category) => category.packCategoryId),
		[packCategories],
	);
};
