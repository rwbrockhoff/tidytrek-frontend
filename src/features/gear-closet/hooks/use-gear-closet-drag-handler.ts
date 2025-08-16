import { useState, useEffect } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import { useQueryClient } from '@tanstack/react-query';
import { type DragStartEvent, type DragEndEvent } from '@dnd-kit/core';
import { type GearClosetItem } from '@/types/pack-types';
import { closetKeys } from '@/queries/query-keys';
import { useMoveGearClosetItemMutation } from '@/queries/closet-queries';

export const useGearClosetDragHandler = (gearClosetList: GearClosetItem[]) => {
	const queryClient = useQueryClient();
	const { mutate: moveGearClosetItem } = useMoveGearClosetItemMutation();

	// manage gearList locally for responsive drag-drop
	const [localItems, setLocalItems] = useState(gearClosetList);
	const [activeId, setActiveId] = useState<string | null>(null);

	useEffect(() => {
		setLocalItems(gearClosetList);
	}, [gearClosetList]);

	const handleDragStart = ({ active }: DragStartEvent) => {
		setActiveId(active.id.toString());
	};

	const handleDragEnd = ({ active, over }: DragEndEvent) => {
		setActiveId(null);
		if (!over || active.id === over.id) return;

		setLocalItems((items) => {
			const oldIndex = items.findIndex(
				(item) => item.packItemId.toString() === active.id,
			);
			const newIndex = items.findIndex((item) => item.packItemId.toString() === over.id);

			if (oldIndex === -1 || newIndex === -1) return items;

			const reordered = arrayMove(items, oldIndex, newIndex);

			queryClient.setQueryData<{ gearClosetList: GearClosetItem[] }>(
				closetKeys.all,
				(old) => {
					if (!old) return old;
					return {
						...old,
						gearClosetList: reordered,
					};
				},
			);

			const prevItem = newIndex > 0 ? reordered[newIndex - 1] : undefined;
			const nextItem =
				newIndex < reordered.length - 1 ? reordered[newIndex + 1] : undefined;

			moveGearClosetItem({
				packItemId: active.id.toString(),
				prevItemIndex: prevItem?.packItemIndex?.toString(),
				nextItemIndex: nextItem?.packItemIndex?.toString(),
			});

			return reordered;
		});
	};

	return {
		localItems,
		activeId,
		handleDragStart,
		handleDragEnd,
	};
};
