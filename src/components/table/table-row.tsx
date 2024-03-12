import styled from 'styled-components';
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {
	type PackItem,
	type PackButtonSwitches,
	type PackListItem,
	type PackInfo,
} from '../../types/pack-types';
import {
	PropertyButtons,
	ActionButtons,
	DeleteButton,
	MoveItemButton,
} from '@/components/table/table-buttons';
import {
	ItemNameCell,
	PackWeightCell,
	QuantityCell,
	PriceCell,
	TableCell,
} from '@/components/table/table-cells';
import { useTableRowInput } from '@/features/dashboard/hooks/use-table-row-input';
import { MoveItemDropdown } from './move-item-dropdown/move-item-dropdown';
import { usePricingContext, useUserContext } from '@/hooks/use-viewer-context';
import useCheckMobile from '../../hooks/use-check-mobile';

type TableRowProps = {
	index: number;
	item: PackItem;
	packList: PackListItem[];
	disabled?: boolean;
	handleOnSave: (packItem: PackItem) => void;
	handleDelete: (packItemId: number) => void;
	handleMoveItemToPack: (packInfo: PackInfo) => void;
};

// Table Row is used in PackCategory + GearCloset

export const TableRow = (props: TableRowProps) => {
	const userView = useUserContext();
	const showPrices = usePricingContext();
	const isMobile = useCheckMobile();

	const { item, index, disabled, handleMoveItemToPack, handleOnSave, handleDelete } =
		props;
	const { packItem, handleInput, packItemChanged } = useTableRowInput(item);
	const [toggleRow, setToggleRow] = useState(false);
	const [viewAllCells, setViewAllCells] = useState(false);

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
		packItemPrice,
	} = packItem;

	const handleToggle = () => packItemChanged && handleOnSave(packItem);

	const handleToggleViewAllCells = () => setViewAllCells(!viewAllCells);

	const handleClickButton = (property: PackButtonSwitches) =>
		handleOnSave({ ...packItem, ...property });

	const dropId = `item${packItemId}`;
	const packNameSize = (userView ? 5 : 7) + (showPrices ? 0 : 1);
	const packDescriptionSize = showPrices ? 5 : 7;
	const showAllCells = !isMobile || viewAllCells;

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
							toggleMobileView={handleToggleViewAllCells}
							onToggleOff={handleToggle}
							itemName="packItemName"
							placeholder="Name"
							size={packNameSize}
						/>

						{showAllCells && (
							<>
								<TableCell
									value={packItemDescription}
									onChange={handleInput}
									onToggleOff={handleToggle}
									itemName="packItemDescription"
									placeholder="Description"
									size={packDescriptionSize}
								/>

								<PropertyButtons
									wornWeight={wornWeight}
									consumable={consumable}
									favorite={favorite}
									onClick={handleClickButton}
									display={toggleRow}
									size={4}
								/>

								<QuantityCell
									quantity={packItemQuantity}
									onChange={handleInput}
									onToggleOff={handleToggle}
									size={2}
								/>
								<PackWeightCell
									weight={packItemWeight}
									unit={packItemUnit}
									placeholder={0}
									onChange={handleInput}
									onToggleOff={handleToggle}
									itemName="packItemWeight"
									size={3}
								/>

								{showPrices && (
									<PriceCell
										price={packItemPrice}
										itemName="packItemPrice"
										placeholder={0}
										onChange={handleInput}
										onToggleOff={handleToggle}
										size={3}
									/>
								)}

								{userView && (
									<ActionButtons size={2}>
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
							</>
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

const Row = styled.tr`
	&&& {
		position: relative;
		border: none;
		background-color: white;
		td:first-child {
			overflow: visible;
		}
	}
`;
