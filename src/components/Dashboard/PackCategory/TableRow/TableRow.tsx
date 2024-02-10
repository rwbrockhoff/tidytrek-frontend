import TableCell from '../TableCells/TableCell/TableCell';
import './TableRow.css';
import { useState } from 'react';
import {
	type PackItem,
	type PackButtonSwitches,
	type PackListItem,
} from '../../../../types/packTypes';
import ItemNameCell from '../TableCells/ItemNameCell/ItemNameCell';
import PackWeightCell from '../TableCells/PackWeightCell/PackWeightCell';
import {
	ActionButtons,
	DeleteButton,
	MoveItemButton,
} from '../TableButtons/TableButtons';
import QuantityButton from '../TableButtons/QuantityButton';
import PropertyButtons from '../TableButtons/PropertyButtons';
import { useTableRowInput } from './useTableRowInput';
import MoveItemDropdown from '../MoveItemDropdown/MoveItemDropdown';
import { useUserContext } from '../../../../views/Dashboard/useUserContext';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { createSortablePackItem } from '../../../../shared/DragDropKit';

type TableRowProps = {
	item: PackItem;
	key?: number;
	index?: number;
	handleOnSave: (packItem: PackItem) => void;
	handleDelete: (packItemId: number) => void;
	packList: PackListItem[];
	handleMoveItemToPack: (packInfo: {
		packItemId: number;
		packId: number;
		packCategoryId: number;
	}) => void;
};

const TableRow = (props: TableRowProps) => {
	const userView = useUserContext();
	const { handleMoveItemToPack, handleOnSave, handleDelete, index, packList } = props;
	const { packItem, handleInput, packItemChanged } = useTableRowInput(props.item);
	const [toggleRow, setToggleRow] = useState(false);

	const [toggleGearButtons, setToggleGearButtons] = useState(false);
	const availablePacks = props?.packList || [];

	const {
		packItemName,
		packItemDescription,
		packItemId,
		packCategoryId,
		packItemWeight,
		packItemUnit,
		packItemQuantity,
		packItemUrl,
		wornWeight,
		consumable,
		favorite,
	} = packItem;

	const handleToggle = () => packItemChanged && handleOnSave(packItem);

	const handleButton = (property: PackButtonSwitches) =>
		handleOnSave({ ...packItem, ...property });

	const sortablePackItem = createSortablePackItem({ packItem, packList, index });
	const { setNodeRef, attributes, listeners, transform, transition, isDragging } =
		useSortable(sortablePackItem);

	const isGearClosetItem = packCategoryId === null;

	const style = {
		transition,
		transform: CSS.Translate.toString(transform),
		zIndex: 5,
		backgroundColor: 'white',
		opacity: isDragging && !isGearClosetItem ? 0 : 1,
	};

	return (
		<>
			<tr
				ref={setNodeRef}
				{...attributes}
				{...listeners}
				style={style}
				className="table-row"
				onMouseOver={() => setToggleRow(true)}
				onMouseLeave={() => setToggleRow(false)}>
				<ItemNameCell
					value={packItemName}
					packItemUrl={packItemUrl}
					displayIcon={toggleRow}
					onChange={handleInput}
					onToggleOff={handleToggle}
					itemName="packItemName"
					placeholder="Name"
					size={userView ? 4 : 5}
				/>
				<TableCell
					value={packItemDescription}
					onChange={handleInput}
					onToggleOff={handleToggle}
					itemName="packItemDescription"
					placeholder="Description"
					size={5}
				/>
				<PropertyButtons
					wornWeight={wornWeight}
					consumable={consumable}
					favorite={favorite}
					onClick={handleButton}
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

				{userView && (
					<ActionButtons size={1}>
						<MoveItemButton
							display={toggleRow}
							onToggle={() => setToggleGearButtons(!toggleGearButtons)}
						/>
						<DeleteButton
							display={toggleRow}
							onClickDelete={() => handleDelete(packItemId)}
						/>
					</ActionButtons>
				)}
			</tr>

			{toggleGearButtons && userView && (
				<MoveItemDropdown
					packItemId={packItemId}
					availablePacks={availablePacks}
					moveItemToPack={handleMoveItemToPack}
				/>
			)}
		</>
	);
};

export default TableRow;
