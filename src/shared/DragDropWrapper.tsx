import {
	Draggable,
	Droppable,
	DragDropContext as Context,
	type DropResult as Result,
} from 'react-beautiful-dnd';

export type DropResult = Result;

type DragProps = {
	index: number;
	draggableId: number;
	children: React.ReactNode;
};

export const Drag = ({ index, draggableId, children }: DragProps) => {
	return (
		<Draggable key={index} draggableId={`${draggableId}`} index={index}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}>
					{children}
				</div>
			)}
		</Draggable>
	);
};

type DropProps = {
	droppableId: number | string | null;
	type: string | undefined;
	children: React.ReactNode;
};

export const Drop = ({ droppableId, type, children }: DropProps) => {
	return (
		<Droppable droppableId={`${droppableId}`} type={type}>
			{(provided) => (
				<div ref={provided.innerRef} {...provided.droppableProps}>
					{children}
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	);
};

type DropTableBodyProps = {
	droppableId: number | string | null;
	type: string | undefined;
	disabled?: boolean;
	children: React.ReactNode;
};

export const DropTableBody = ({
	droppableId,
	type,
	children,
	disabled = false,
}: DropTableBodyProps) => {
	return (
		<Droppable droppableId={`${droppableId}`} type={type} isDropDisabled={disabled}>
			{(provided, { isDraggingOver }) => (
				<tbody
					ref={provided.innerRef}
					style={{ height: 10 }}
					{...provided.droppableProps}>
					{children ? (
						children
					) : (
						<tr
							className="empty-table-row"
							style={{
								backgroundColor: isDraggingOver && !children ? 'white' : '#f0f0f0',
							}}>
							<td colSpan={16}></td>
						</tr>
					)}

					{provided.placeholder}
				</tbody>
			)}
		</Droppable>
	);
};

type DragDropContext = {
	onDragStart?: () => void;
	onDragEnd: (result: Result) => void;
	children: React.ReactNode;
};

export const DragDropContext = ({
	children,
	onDragEnd,
	onDragStart,
}: DragDropContext) => {
	return (
		<Context onDragStart={onDragStart} onDragEnd={onDragEnd}>
			{children}
		</Context>
	);
};
