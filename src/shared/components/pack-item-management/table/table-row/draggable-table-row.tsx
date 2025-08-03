import { Draggable, DraggableChildrenFn } from 'react-beautiful-dnd';
import { useUserPermissionsContext } from '@/hooks/auth/use-user-permissions-context';

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
	const { isCreator } = useUserPermissionsContext();
	const dropId = `item${packItemId}`;

	return (
		<Draggable
			key={dropId}
			draggableId={dropId}
			index={index}
			isDragDisabled={!isCreator || disabled}>
			{children}
		</Draggable>
	);
};