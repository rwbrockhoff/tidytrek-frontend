import { useSortable, defaultAnimateLayoutChanges } from '@dnd-kit/sortable';
import { usePermissions } from '@/hooks/auth/use-permissions';
import { useDndContext } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
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

// Component handles drag logic and activeId
export const DraggableTableRow = ({
	packItemId,
	disabled,
	categoryId,
	children,
}: DraggableTableRowProps) => {
	const { isCreator } = usePermissions();
	const { active } = useDndContext();

	// compound category/pack ID key
	const draggableId = categoryId ? `${categoryId}-${packItemId}` : packItemId.toString();

	const isDragging =
		active?.id &&
		(active.id.toString() === packItemId.toString() ||
			(active.id.toString().includes('-') &&
				active.id.toString().split('-')[1] === packItemId.toString()));

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging: sortableIsDragging,
	} = useSortable({
		id: draggableId,
		disabled: !isCreator || disabled,
		animateLayoutChanges: categoryId ? defaultAnimateLayoutChanges : undefined,
	});

	const isDashboard = !!categoryId;

	const canDrag = isCreator && !disabled;

	const dashboardStyles: React.CSSProperties = {
		position: 'relative',
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging || sortableIsDragging ? 0 : 1,
		userSelect: canDrag ? 'none' : 'text',
		WebkitUserSelect: canDrag ? 'none' : 'text',
		touchAction: 'none',
	};

	const gearClosetStyles: React.CSSProperties = {
		position: 'relative',
		transform: sortableIsDragging
			? `${CSS.Transform.toString(transform)} scale(1.02)`
			: CSS.Transform.toString(transform),
		transition,
		opacity: 1,
		zIndex: sortableIsDragging ? 10 : 'auto',
		backgroundColor: sortableIsDragging ? 'var(--color-bg-primary)' : 'transparent',
		boxShadow: sortableIsDragging ? 'var(--shadow-spread)' : 'none',
		borderRadius: sortableIsDragging ? 'var(--radius)' : '0',
		userSelect: 'none',
		WebkitUserSelect: 'none',
		touchAction: 'none',
	};

	const style = isDashboard ? dashboardStyles : gearClosetStyles;

	const provided: DragProvidedProps = {
		innerRef: setNodeRef,
		draggableProps: {
			style,
			...attributes,
		},
		dragHandleProps: listeners,
	};

	return children(provided, { isDragging: isDragging || sortableIsDragging });
};
