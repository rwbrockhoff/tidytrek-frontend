import { Table, Button, Icon } from 'semantic-ui-react';
import { type GearClosetList, type PackItem } from '../../../types/packTypes';
import { type DropResult } from 'react-beautiful-dnd';
import {
	useAddGearClosetItemMutation,
	useEditGearClosetItemMutation,
	useMoveGearClosetItemMutation,
	useMoveItemToPackMutation,
	useDeleteGearClosetItemMutation,
} from '../../../queries/closetQueries';
import TableRow from '../../Dashboard/PackCategory/TableRow/TableRow';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';

export type PackInfo = {
	packItemId: number;
	packId: number;
	packCategoryId: number;
};

const GearClosetList = (props: GearClosetList) => {
	const { mutate: addItem, isPending: isPendingAddItem } = useAddGearClosetItemMutation();
	const { mutate: editItem } = useEditGearClosetItemMutation();
	const { mutate: moveGearClosetItem } = useMoveGearClosetItemMutation();
	const { mutate: moveToPack } = useMoveItemToPackMutation();
	const { mutate: deleteItem } = useDeleteGearClosetItemMutation();

	const { gearClosetList, availablePacks } = props;

	const handleOnSave = (packItem: PackItem) => editItem(packItem);

	const handleDelete = (packItemId: number) => deleteItem(packItemId);

	const handleMoveItemToPack = (packInfo: PackInfo) => moveToPack(packInfo);

	const onDragEnd = (result: DropResult) => {
		const { draggableId, destination, source } = result;
		if (!destination) return;

		const sameIndex = destination.index === source.index;
		const sameCategory = destination.droppableId === source.droppableId;

		if (sameIndex && sameCategory) return;

		moveGearClosetItem({
			packItemId: draggableId,
			packItemIndex: destination.index,
			prevPackItemIndex: source.index,
		});
	};

	return (
		<Table fixed striped columns="16" color="blue" size="small">
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell colSpan="4">Item</Table.HeaderCell>
					<Table.HeaderCell colSpan="6">Description</Table.HeaderCell>
					<Table.HeaderCell colSpan="2" textAlign="right">
						Quantity
					</Table.HeaderCell>
					<Table.HeaderCell colSpan="2" textAlign="center">
						Weight
					</Table.HeaderCell>

					<Table.HeaderCell colSpan="2"></Table.HeaderCell>
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
									gearClosetItem={true}
									availablePacks={availablePacks}
									handleOnSave={handleOnSave}
									handleDelete={handleDelete}
									handleMoveItemToPack={handleMoveItemToPack}
								/>
							))}
							{provided.placeholder}
						</tbody>
					)}
				</Droppable>
			</DragDropContext>
			<Table.Footer>
				<Table.Row className="footer-container">
					<Table.Cell colSpan={16}>
						<Button
							size="mini"
							floated="left"
							compact
							basic
							className="add-item-table-button"
							disabled={isPendingAddItem}
							onClick={() => addItem()}>
							<Icon name="add" />
							Add Item
						</Button>
					</Table.Cell>
				</Table.Row>
			</Table.Footer>
		</Table>
	);
};

export default GearClosetList;
