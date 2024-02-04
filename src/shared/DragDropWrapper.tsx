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
	children: React.ReactNode;
};

export const Drop = ({ droppableId, children }: DropProps) => {
	return (
		<Droppable droppableId={`${droppableId}`}>
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
	droppableId: number | null;
	children: React.ReactNode;
};

export const DropTableBody = ({ droppableId, children }: DropTableBodyProps) => {
	return (
		<Droppable droppableId={`${droppableId}`}>
			{(provided) => (
				<tbody ref={provided.innerRef} {...provided.droppableProps}>
					{children}
					{provided.placeholder}
				</tbody>
			)}
		</Droppable>
	);
};

type DragDropContext = {
	onDragEnd: (result: Result) => void;
	children: React.ReactNode;
};

export const DragDropContext = ({ children, onDragEnd }: DragDropContext) => {
	return <Context onDragEnd={onDragEnd}>{children}</Context>;
};
