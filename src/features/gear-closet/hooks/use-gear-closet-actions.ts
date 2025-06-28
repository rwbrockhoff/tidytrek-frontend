import { useCallback } from 'react';
import { type DropResult } from 'react-beautiful-dnd';
import {
	type BaseTableRowItem,
	type GearClosetItem,
	isGearClosetItem,
} from '@/types/pack-types';
import {
	useAddGearClosetItemMutation,
	useDeleteGearClosetItemMutation,
	useEditGearClosetItemMutation,
	useMoveGearClosetItemMutation,
} from '@/queries/closet-queries';
import { calculateAdjacentItems, applySynchronousDragUpdate } from '@/utils';
import { useQueryClient } from '@tanstack/react-query';
import { closetKeys } from '@/queries/query-keys';

export const useGearClosetActions = () => {
	const queryClient = useQueryClient();

	const { mutate: addItem } = useAddGearClosetItemMutation();
	const { mutate: editItem } = useEditGearClosetItemMutation();
	const { mutate: moveGearClosetItem } = useMoveGearClosetItemMutation();
	const { mutate: deleteItem } = useDeleteGearClosetItemMutation();

	// Add Item
	const handleAddItem = useCallback(() => {
		addItem();
	}, [addItem]);

	// Edit Item
	const handleEditItem = useCallback((item: BaseTableRowItem) => {
		if (isGearClosetItem(item)) editItem(item);
	}, [editItem]);

	// Delete Item
	const handleDeleteItem = useCallback((packItemId: number) => {
		deleteItem(packItemId);
	}, [deleteItem]);

	// Drag handler with optimistic updates
	const handleOnDragEnd = useCallback((result: DropResult, gearClosetList: GearClosetItem[]) => {
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
	}, [queryClient, moveGearClosetItem]);

	return {
		addGearClosetItem: handleAddItem,
		editGearClosetItem: handleEditItem,
		deleteGearClosetItem: handleDeleteItem,
		onDragEnd: handleOnDragEnd,
	};
};