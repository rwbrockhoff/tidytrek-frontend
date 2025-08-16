import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useUserPermissionsContext } from '@/hooks/auth/use-user-permissions-context';
import { type DraggableAttributes } from '@dnd-kit/core';

type DragProvidedProps = {
	innerRef: (node: HTMLElement | null) => void;
	draggableProps: DraggableAttributes & {
		style: React.CSSProperties;
	};
	dragHandleProps: Record<string, unknown> | undefined | null;
};

type DragSnapshot = {
	isDragging: boolean;
};

type DraggableTableRowProps = {
	packItemId: number;
	disabled?: boolean;
	children: (provided: DragProvidedProps, snapshot: DragSnapshot) => React.ReactNode;
	categoryId?: string;
};

export const DraggableTableRow = ({
	packItemId,
	disabled,
	children,
	categoryId,
}: DraggableTableRowProps) => {
	const { isCreator } = useUserPermissionsContext();

	// Compound key for Dashboard, simple for Gear Closet
	const sortableId = categoryId ? `${categoryId}-${packItemId}` : packItemId.toString();

	const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
		useSortable({
			id: sortableId,
			disabled: !isCreator || disabled,
			// Single-list animations enabled, multi-category disabled
			animateLayoutChanges: categoryId ? () => false : undefined,
		});

	const style: React.CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition,
		zIndex: isDragging ? 10 : undefined,
		position: 'relative' as const,
	};

	const provided: DragProvidedProps = {
		innerRef: setNodeRef,
		draggableProps: {
			style,
			...attributes,
		},
		dragHandleProps: listeners,
	};

	return children(provided, { isDragging });
};
