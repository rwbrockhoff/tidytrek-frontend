import { Table } from 'semantic-ui-react';
import { type GearClosetList, type PackItem } from '../../../redux/packs/packTypes';
import TableRow from '../../Dashboard/PackCategory/TableRow/TableRow';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';

const GearClosetList = (props: GearClosetList) => {
	const { gearClosetList } = props;

	const handleToggleOff = () => {
		console.log('toggle');
	};

	const handleDelete = () => {
		console.log('delete');
	};

	const onDragEnd = () => {
		console.log('item dropped');
	};

	return (
		<Table fixed striped columns="16" color="blue" size="small">
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell colSpan="2">Item</Table.HeaderCell>
					<Table.HeaderCell colSpan="2">Description</Table.HeaderCell>
					<Table.HeaderCell colSpan="2">Weight</Table.HeaderCell>
					<Table.HeaderCell colSpan="2">Add to Pack</Table.HeaderCell>
					<Table.HeaderCell colSpan="2">Add to Category</Table.HeaderCell>
					<Table.HeaderCell colSpan="1"></Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId={`gear-closet`}>
					{(provided) => (
						<tbody ref={provided.innerRef} {...provided.droppableProps}>
							{gearClosetList.map((item: PackItem, index) => (
								<TableRow
									item={item}
									key={`${item.packItemId}`}
									index={index}
									handleToggleOff={handleToggleOff}
									handleDelete={handleDelete}
								/>
							))}
							{provided.placeholder}
						</tbody>
					)}
				</Droppable>
			</DragDropContext>
		</Table>
	);
};

export default GearClosetList;
