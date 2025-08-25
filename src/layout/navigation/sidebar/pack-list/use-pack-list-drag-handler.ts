import { useState, useEffect } from 'react';
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useQueryClient } from '@tanstack/react-query';
import { type PackListItem } from '@/types/pack-types';
import { useMovePackMutation } from '@/queries/pack-queries';
import { packKeys } from '@/queries/query-keys';

export const usePackListDragHandler = (packList: PackListItem[]) => {
	const [localPackList, setLocalPackList] = useState<PackListItem[]>(packList);
	const [activeId, setActiveId] = useState<string | null>(null);
	const queryClient = useQueryClient();
	const { mutate: movePack } = useMovePackMutation();

	useEffect(() => {
		setLocalPackList(packList);
	}, [packList]);

	const handleDragStart = (event: DragStartEvent) => {
		setActiveId(event.active.id as string);
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		setActiveId(null);

		if (!over || active.id === over.id) return;

		setLocalPackList((items) => {
			const oldIndex = items.findIndex(
				(pack) => pack.packId.toString() === active.id.toString(),
			);
			const newIndex = items.findIndex(
				(pack) => pack.packId.toString() === over.id.toString(),
			);

			if (oldIndex === -1 || newIndex === -1) return items;

			const reordered = arrayMove(items, oldIndex, newIndex);

			// Update cache immediately with reordered array
			queryClient.setQueryData(
				packKeys.lists(),
				(old: { packList: PackListItem[] } | undefined) => {
					if (!old) return old;
					return {
						packList: reordered,
					};
				},
			);

			const prevPack = newIndex > 0 ? reordered[newIndex - 1] : undefined;
			const nextPack =
				newIndex < reordered.length - 1 ? reordered[newIndex + 1] : undefined;

			movePack({
				packId: active.id.toString(),
				prevPackIndex: prevPack?.packIndex,
				nextPackIndex: nextPack?.packIndex,
			});

			return reordered;
		});
	};

	return {
		localPackList,
		activeId,
		handleDragStart,
		handleDragEnd,
	};
};
