import { ReactNode, useState, useMemo, useCallback } from 'react';
import {
	DndContext,
	closestCorners,
	closestCenter,
	DragOverlay,
	DndContextProps,
	CollisionDetection,
	MeasuringStrategy,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragEndEvent,
	DragOverEvent,
	DragStartEvent,
} from '@dnd-kit/core';
import { createPortal } from 'react-dom';

interface DragDropWrapperProps extends Partial<DndContextProps> {
	children: ReactNode;
	renderDragOverlay: (activeId: string | null) => ReactNode;
}

export function DragDropWrapper({
	children,
	renderDragOverlay,
	...dndProps
}: DragDropWrapperProps) {
	const [activeId, setActiveId] = useState<string | null>(null);

	const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));

	// Collision detection: center for larger categories, corners for smaller items
	const collisionDetection = useMemo<CollisionDetection>(() => {
		const activeIdStr = activeId?.toString() || '';
		if (activeIdStr && !activeIdStr.includes('-')) return closestCenter;
		return closestCorners;
	}, [activeId]);

	const handleDragStart = useCallback(
		(event: DragStartEvent) => {
			setActiveId(event.active.id as string);
			dndProps.onDragStart?.(event);
		},
		[dndProps],
	);

	const handleDragEnd = useCallback(
		(event: DragEndEvent) => {
			setActiveId(null);
			dndProps.onDragEnd?.(event);
		},
		[dndProps],
	);

	const handleDragOver = useCallback(
		(event: DragOverEvent) => {
			dndProps.onDragOver?.(event);
		},
		[dndProps],
	);

	const handleDragCancel = useCallback(() => {
		setActiveId(null);
	}, []);

	return (
		<DndContext
			{...dndProps}
			sensors={sensors}
			collisionDetection={collisionDetection}
			measuring={{
				droppable: {
					strategy: MeasuringStrategy.WhileDragging,
				},
			}}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			onDragOver={handleDragOver}
			onDragCancel={handleDragCancel}>
			{children}

			{createPortal(
				<DragOverlay>{renderDragOverlay(activeId)}</DragOverlay>,
				document.body,
			)}
		</DndContext>
	);
}
