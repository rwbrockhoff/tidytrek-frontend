import { ReactNode, useState, useMemo } from 'react';
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

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor)
	);

	// Collision detection: center for larger categories, corners for smaller items
	const collisionDetection = useMemo<CollisionDetection>(() => {
		const activeIdStr = activeId?.toString() || '';
		if (activeIdStr && !activeIdStr.includes('-')) return closestCenter;
		return closestCorners;
	}, [activeId]);

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
			onDragStart={(event) => {
				setActiveId(event.active.id as string);
				dndProps.onDragStart?.(event);
			}}
			onDragEnd={(event) => {
				setActiveId(null);
				dndProps.onDragEnd?.(event);
			}}
			onDragOver={(event) => {
				dndProps.onDragOver?.(event);
			}}
			onDragCancel={() => setActiveId(null)}>
			{children}

			{createPortal(
				<DragOverlay>{renderDragOverlay(activeId)}</DragOverlay>,
				document.body,
			)}
		</DndContext>
	);
}
