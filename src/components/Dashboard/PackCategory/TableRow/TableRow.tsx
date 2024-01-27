import TableCell from '../TableCell/TableCell';
import './TableRow.css';
import { useState } from 'react';
import {
	type PackItem,
	type PackButtonSwitches,
	type AvailablePack,
} from '../../../../types/packTypes';
import ItemNameCell from '../ItemNameCell/ItemNameCell';
import PackWeightCell from '../PackWeightCell/PackWeightCell';
import DeleteButton from '../TableButtonCells/DeleteButton';
import QuantityButton from '../TableButtonCells/QuantityButton';
import PropertyButtons from '../TableButtonCells/PropertyButtons';
import { Draggable } from 'react-beautiful-dnd';
import { useTableRowInput } from './useTableRowInput';
import MoveClosetItemButtons from '../../../GearCloset/MoveClosetItemButtons/MoveClosetItemButtons';

type TableRowProps = {
	item: PackItem;
	key: string;
	index: number;
	gearClosetItem: boolean;
	handleToggleOff: (packItem: PackItem) => void;
	handleDelete: (packItemId: number) => void;
	availablePacks?: AvailablePack[];
	handleMoveItemToPack?: (packInfo: {
		packItemId: number;
		packId: number;
		packCategoryId: number;
	}) => void;
};

const TableRow = (props: TableRowProps) => {
	const { gearClosetItem, handleMoveItemToPack, handleToggleOff, handleDelete } = props;
	const { packItem, handleInput, packItemChanged } = useTableRowInput(props.item);
	const [toggleRow, setToggleRow] = useState(false);
	const [toggleGearButtons, setToggleGearButtons] = useState(false);

	const availablePacks = props?.availablePacks || [];

	const {
		packItemName,
		packItemDescription,
		packItemId,
		packItemWeight,
		packItemUnit,
		packItemQuantity,
		packItemUrl,
		wornWeight,
		consumable,
		favorite,
	} = packItem;

	const handleToggle = () => packItemChanged && handleToggleOff(packItem);

	const handleButton = (property: PackButtonSwitches) =>
		handleToggleOff({ ...packItem, ...property });

	const dropId = `${packItemId}`;

	return (
		<Draggable key={dropId} draggableId={dropId} index={props.index}>
			{(provided) => (
				<>
					<tr
						className="table-row"
						onMouseOver={() => setToggleRow(true)}
						onMouseLeave={() => setToggleRow(false)}
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}>
						<ItemNameCell
							value={packItemName}
							packItemUrl={packItemUrl}
							displayIcon={toggleRow}
							onChange={handleInput}
							onToggleOff={handleToggle}
							itemName="packItemName"
							placeholder="Name"
							size={4}
						/>
						<TableCell
							value={packItemDescription}
							onChange={handleInput}
							onToggleOff={handleToggle}
							itemName="packItemDescription"
							placeholder="Description"
							size={gearClosetItem ? 4 : 5}
						/>
						<PropertyButtons
							wornWeight={wornWeight}
							consumable={consumable}
							favorite={favorite}
							onClick={handleButton}
							// (buttonProps) => handleButtonProps(packItem, buttonProps)
							display={toggleRow}
							size={3}
						/>
						<QuantityButton
							quantity={packItemQuantity}
							onChange={handleInput}
							onToggleOff={handleToggle}
							size={1}
						/>
						<PackWeightCell
							weight={packItemWeight}
							unit={packItemUnit}
							placeholder={0}
							onChange={handleInput}
							onToggleOff={handleToggle}
							itemName="packItemWeight"
							size={2}
						/>

						<DeleteButton
							display={toggleRow}
							size={gearClosetItem ? 2 : 1}
							moveItemEnabled={gearClosetItem}
							onClickToggle={() => setToggleGearButtons(!toggleGearButtons)}
							onClickDelete={() => handleDelete(packItemId)}
						/>
					</tr>
					{toggleGearButtons && (
						<MoveClosetItemButtons
							packItemId={packItemId}
							availablePacks={availablePacks}
							moveItemToPack={handleMoveItemToPack}
						/>
					)}
				</>
			)}
		</Draggable>
	);
};

export default TableRow;
