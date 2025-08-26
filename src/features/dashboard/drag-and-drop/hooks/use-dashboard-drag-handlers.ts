import { useState } from 'react';
import { type Category, type Pack } from '@/types/pack-types';
import { usePackDragHandler } from '../../hooks/use-pack-drag-handler';
import { useDragState } from '../../hooks/use-drag-state';
import { useDragStartHandler } from './use-drag-start-handler';
import { useDragOverHandler } from './use-drag-over-handler';
import { useDragEndHandler } from './use-drag-end-handler';

/**
 * Main drag handler manager for pack items & categories.
 * Uses temp local state during drag, then cache updates on drop
 */

export const useDashboardDragHandlers = (
	packCategories: Category[],
	pack: Pack | undefined,
	paramPackId: string | undefined,
) => {
	const { onDragEnd: serverDragEnd } = usePackDragHandler();
	const {
		isDragging,
		displayCategories,
		startDrag,
		updateDrag,
		completeDrag,
		endDrag,
		resetDrag,
	} = useDragState(packCategories);

	const [activeId, setActiveId] = useState<string | null>(null);
	const [lastDragPosition, setLastDragPosition] = useState<string>('');
	const [dragStartData, setDragStartData] = useState<{
		activeContainer: Category;
		activeIndex: number;
	} | null>(null);

	const handleOnDragStart = useDragStartHandler(
		displayCategories,
		setActiveId,
		setDragStartData,
		startDrag,
	);

	const handleOnDragOver = useDragOverHandler(
		displayCategories,
		isDragging,
		lastDragPosition,
		setLastDragPosition,
		updateDrag,
	);

	const resetDragState = () => {
		setActiveId(null);
		setLastDragPosition('');
		setDragStartData(null);
	};

	const handleOnDragEnd = useDragEndHandler(
		displayCategories,
		pack,
		paramPackId,
		dragStartData,
		serverDragEnd,
		updateDrag,
		completeDrag,
		resetDrag,
		endDrag,
		resetDragState,
	);

	return {
		localPackCategories: displayCategories,
		activeId,
		handleOnDragStart,
		handleOnDragOver,
		handleOnDragEnd,
	};
};
