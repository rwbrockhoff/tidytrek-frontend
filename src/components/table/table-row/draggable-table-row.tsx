import { Draggable, DraggableChildrenFn } from 'react-beautiful-dnd';
import { useUserContext } from '@/hooks/auth/use-user-context';

type DraggableTableRowProps = {
	index: number;
	packItemId: number;
	disabled?: boolean;
	children: DraggableChildrenFn;
};

export const DraggableTableRow = ({ 
	index, 
	packItemId, 
	disabled, 
	children 
}: DraggableTableRowProps) => {
	const userView = useUserContext();
	const dropId = `item${packItemId}`;

	return (
		<Draggable
			key={dropId}
			draggableId={dropId}
			index={index}
			isDragDisabled={!userView || disabled}>
			{children}
		</Draggable>
	);
};