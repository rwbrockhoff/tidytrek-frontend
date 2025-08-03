import { useCallback } from 'react';
import { type DropResult } from 'react-beautiful-dnd';
import { type GearClosetItem } from '@/types/pack-types';
import { useMoveGearClosetItemMutation } from '@/queries/closet-queries';
import { calculateAdjacentItems, applySynchronousDragUpdate } from '@/utils';
import { useQueryClient } from '@tanstack/react-query';
import { closetKeys } from '@/queries/query-keys';

export const useGearClosetDragHandler = () => {
	const { mutate: moveGearClosetItem } = useMoveGearClosetItemMutation();
	const queryClient = useQueryClient();

	const handleOnDragEnd = useCallback(
		(result: DropResult, gearClosetList: GearClosetItem[]) => {
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
		},
		[queryClient, moveGearClosetItem],
	);

	return {
		onDragEnd: handleOnDragEnd,
	};
};