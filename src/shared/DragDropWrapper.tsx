import {
	Draggable,
	Droppable,
	DragDropContext as Context,
	type DropResult as Result,
} from '@hello-pangea/dnd';

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
	children: React.ReactNode;
};

export const DropTableBody = ({ droppableId, type, children }: DropTableBodyProps) => {
	return (
		<Droppable droppableId={`${droppableId}`} type={type}>
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
