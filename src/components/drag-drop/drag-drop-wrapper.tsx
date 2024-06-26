import {
	Draggable,
	Droppable,
	DragDropContext as Context,
	type DropResult as Result,
	DragUpdate,
	ResponderProvided,
} from 'react-beautiful-dnd';
import { EmptyTableRow } from './empty-table-row';
import { Table } from '@radix-ui/themes';

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
					{...provided.dragHandleProps}
					style={{ ...provided.draggableProps.style, position: 'static' }}>
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
	disabled?: boolean;
};

export const DropTableBody = (props: DropTableBodyProps) => {
	const { droppableId, type, disabled, children } = props;
	return (
		<Droppable droppableId={`${droppableId}`} type={type} isDropDisabled={disabled}>
			{(provided, { isDraggingOver }) => (
				<Table.Body
					ref={provided.innerRef}
					style={{ minHeight: 10 }}
					{...provided.droppableProps}>
					{children ? (
						children
					) : (
						<EmptyTableRow
							isDraggingOver={isDraggingOver}
							noChildren={!children ? true : false}
						/>
					)}

					{provided.placeholder}
				</Table.Body>
			)}
		</Droppable>
	);
};

type DragDropContext = {
	onDragStart?: () => void;
	onDragUpdate?: (update: DragUpdate, provided: ResponderProvided) => void;
	onDragEnd: (result: Result) => void;
	children: React.ReactNode;
};

export const DragDropContext = ({
	children,
	onDragUpdate,
	onDragEnd,
	onDragStart,
}: DragDropContext) => {
	return (
		<Context onDragStart={onDragStart} onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
			{children}
		</Context>
	);
};
