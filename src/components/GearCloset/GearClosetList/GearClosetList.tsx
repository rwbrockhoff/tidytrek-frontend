import { Icon } from 'semantic-ui-react';
import { Table, Button } from '../../../shared/ui/SemanticUI';
import { type PackListItem, type PackItem, PackInfo } from '../../../types/packTypes';
import { useAddGearClosetItemMutation } from '../../../queries/closetQueries';
import TableRow from '../../Dashboard/PackCategory/TableRow/TableRow';
import { DropTableBody } from '../../../shared/DragDropWrapper';

export type GearClosetListProps = {
	packList: PackListItem[] | [];
	gearClosetList: PackItem[] | [];
	dragDisabled: boolean;
	isEmptyList: boolean;
	onSave: (packItem: PackItem) => void;
	onDelete: (packItemId: number) => void;
	onMove: (packInfo: PackInfo) => void;
};

const GearClosetList = ({
	gearClosetList,
	packList,
	dragDisabled,
	isEmptyList,
	onSave,
	onMove,
	onDelete,
}: GearClosetListProps) => {
	const { mutate: addItem, isPending: isPendingAddItem } = useAddGearClosetItemMutation();

	return (
		<Table $themeColor="primary" fixed striped columns="16" size="small">
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell colSpan="4" style={{ paddingLeft: '25px' }}>
						Item
					</Table.HeaderCell>
					<Table.HeaderCell colSpan="7" style={{ paddingLeft: '25px' }}>
						Description
					</Table.HeaderCell>
					<Table.HeaderCell
						colSpan="2"
						textAlign="center"
						style={{ paddingLeft: '90px' }}>
						Quantity
					</Table.HeaderCell>
					<Table.HeaderCell colSpan="2" textAlign="center">
						Weight
					</Table.HeaderCell>

					<Table.HeaderCell colSpan="1"></Table.HeaderCell>
				</Table.Row>
			</Table.Header>

			{!isEmptyList ? (
				<DropTableBody
					droppableId={`gear-closet`}
					type="closet-item"
					disabled={dragDisabled}>
					{gearClosetList.map((item: PackItem, index) => (
						<TableRow
							item={item}
							packList={packList}
							disabled={dragDisabled}
							key={item.packItemId}
							index={index}
							handleMoveItemToPack={onMove}
							handleOnSave={onSave}
							handleDelete={onDelete}
						/>
					))}
				</DropTableBody>
			) : (
				<NotFoundMessage />
			)}

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

const NotFoundMessage = () => {
	return (
		<Table.Body>
			<Table.Row>
				<Table.Cell colSpan="16" textAlign="center" style={{ opacity: 0.4 }}>
					<Icon name="search" /> No Items Found.
				</Table.Cell>
			</Table.Row>
		</Table.Body>
	);
};
