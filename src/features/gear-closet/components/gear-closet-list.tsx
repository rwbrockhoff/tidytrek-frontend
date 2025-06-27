import {
	type PackListItem,
	type GearClosetItem,
	type BaseTableRowItem,
	isGearClosetItem,
} from '@/types/pack-types';
import { Table } from '@/components/table';
import { DragDropContext, DropResult, DropTableBody } from '@/components';
import {
	useAddGearClosetItemMutation,
	useDeleteGearClosetItemMutation,
	useEditGearClosetItemMutation,
	useMoveGearClosetItemMutation,
} from '@/queries/closet-queries';
import { TableRow, TableFooter } from '@/components/table';
import { GearClosetHeader } from './gear-closet-header';
import { PricingContext } from '@/hooks/use-viewer-context';
import { NotFoundMessage } from './not-found-message';
import { calculateAdjacentItems, applySynchronousDragUpdate } from '@/utils';
import { useQueryClient } from '@tanstack/react-query';
import { closetKeys } from '@/queries/query-keys';

export type GearClosetListProps = {
	packList: PackListItem[] | [];
	gearClosetList: GearClosetItem[];
	dragDisabled: boolean;
	listHasItems: boolean;
};

export const GearClosetList = (props: GearClosetListProps) => {
	const { gearClosetList, packList, dragDisabled, listHasItems } = props;
	const queryClient = useQueryClient();

	const { mutate: addItem } = useAddGearClosetItemMutation();
	const { mutate: editItem } = useEditGearClosetItemMutation();
	const { mutate: moveGearClosetItem } = useMoveGearClosetItemMutation();
	const { mutate: deleteItem } = useDeleteGearClosetItemMutation();

	const handleOnSave = (item: BaseTableRowItem) => {
		if (isGearClosetItem(item)) editItem(item);
	};

	const handleDelete = (packItemId: number) => deleteItem(packItemId);

	const handleOnDragEnd = (result: DropResult) => {
		const { draggableId, destination, source } = result;
		if (!destination) return;

		const sameIndex = destination.index === source.index;
		if (sameIndex) return;

		applySynchronousDragUpdate<{ gearClosetList: GearClosetItem[] }>(
			queryClient,
			closetKeys.all,
			source.index,
			destination.index,
			'gearClosetList',
		);

		// Calculate adjacent items for fractional indexing
		const { prevItem, nextItem } = calculateAdjacentItems(
			gearClosetList,
			source.index,
			destination.index,
		);

		const dragId = draggableId.replace(/\D/g, '');
		moveGearClosetItem({
			packItemId: dragId,
			prevItemIndex: prevItem?.packItemIndex,
			nextItemIndex: nextItem?.packItemIndex,
		});
	};

	return (
		<PricingContext.Provider value={true}>
			<Table>
				<GearClosetHeader />

				{listHasItems ? (
					<DragDropContext onDragEnd={handleOnDragEnd}>
						<DropTableBody
							droppableId={`gear-closet`}
							type="closet-item"
							disabled={dragDisabled}>
							{gearClosetList.map((item, index) => (
								<TableRow
									item={item}
									packList={packList}
									disabled={dragDisabled}
									key={item.packItemId}
									index={index}
									handleOnSave={handleOnSave}
									handleDelete={handleDelete}
								/>
							))}
						</DropTableBody>
					</DragDropContext>
				) : (
					<NotFoundMessage />
				)}

				<TableFooter handleAddItem={() => addItem()} showTotals={false} />
			</Table>
		</PricingContext.Provider>
	);
};
