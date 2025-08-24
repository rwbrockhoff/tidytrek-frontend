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

export const DraggableTableRow = ({
	packItemId,
	disabled,
	children,
	categoryId,
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

	const dashboardStyles: React.CSSProperties = {
		position: 'relative',
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging || sortableIsDragging ? 0 : 1,
		userSelect: 'none',
		WebkitUserSelect: 'none',
		touchAction: 'none',
		cursor: isDragging || sortableIsDragging ? 'grabbing' : 'grab',
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
		border: sortableIsDragging ? '1px solid var(--color-border-secondary)' : 'none',
		userSelect: 'none',
		WebkitUserSelect: 'none',
		touchAction: 'none',
		cursor: sortableIsDragging ? 'grabbing' : 'grab',
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

	return children(provided, { isDragging: false }); // false since we are managing it with state
};
