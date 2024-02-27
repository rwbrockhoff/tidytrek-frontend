import TableCell from '../TableCells/TableCell/TableCell';
import styled from 'styled-components';
import { useState } from 'react';
import {
	type PackItem,
	type PackButtonSwitches,
	type PackListItem,
	type PackInfo,
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
import { useUserContext } from '../../../../views/Dashboard/hooks/useUserContext';
import { Draggable } from 'react-beautiful-dnd';

type TableRowProps = {
	index: number;
	item: PackItem;
	packList: PackListItem[];
	disabled?: boolean;
	handleOnSave: (packItem: PackItem) => void;
	handleDelete: (packItemId: number) => void;
	handleMoveItemToPack: (packInfo: PackInfo) => void;
};

const TableRow = (props: TableRowProps) => {
	const userView = useUserContext();
	const { item, index, disabled, handleMoveItemToPack, handleOnSave, handleDelete } =
		props;
	const { packItem, handleInput, packItemChanged } = useTableRowInput(item);
	const [toggleRow, setToggleRow] = useState(false);

	const [toggleGearButtons, setToggleGearButtons] = useState(false);
	const availablePacks = props?.packList || [];

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

	const handleToggle = () => packItemChanged && handleOnSave(packItem);

	const handleClickButton = (property: PackButtonSwitches) =>
		handleOnSave({ ...packItem, ...property });

	const dropId = `item${packItemId}`;

	return (
		<Draggable
			key={dropId}
			draggableId={dropId}
			index={index}
			isDragDisabled={!userView || disabled}>
			{(provided) => (
				<>
					<Row
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
							onClick={handleClickButton}
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
					</Row>

					{toggleGearButtons && userView && (
						<MoveItemDropdown
							packItem={item}
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

const Row = styled.tr`
	&&& {
		position: relative;
		border: none;
		background-color: white;
	}
`;
