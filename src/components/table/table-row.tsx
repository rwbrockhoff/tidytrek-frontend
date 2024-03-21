import styled from 'styled-components';
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {
	type PackItem,
	type PackButtonSwitches,
	type PackListItem,
} from '@/types/pack-types';
import { DeleteItemModal, ShareIcon, TrashIcon } from '../ui';
import { Flex, Table } from '@radix-ui/themes';
import { PropertyButtons, ActionButtons } from '@/components/table/table-buttons';
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
import useCheckMobile from '@/hooks/use-check-mobile';

type TableRowProps = {
	index: number;
	item: PackItem;
	packList: PackListItem[];
	disabled?: boolean;
	moveToCloset?: (packItemId: number) => void;
	handleOnSave: (packItem: PackItem) => void;
	handleDelete: (packItemId: number) => void;
};

// Table Row is used in PackCategory + GearCloset

export const TableRow = (props: TableRowProps) => {
	const userView = useUserContext();
	const showPrices = usePricingContext();
	const isMobile = useCheckMobile();

	const { item, index, disabled } = props;
	const { moveToCloset, handleOnSave, handleDelete } = props;

	const { packItem, handleInput, packItemChanged } = useTableRowInput(item);

	const [toggleRow, setToggleRow] = useState(false);
	const [viewAllCells, setViewAllCells] = useState(false);
	const [toggleGearButtons, setToggleGearButtons] = useState(false);

	const handleToggle = () => packItemChanged && handleOnSave(packItem);

	const handleToggleViewAllCells = () => setViewAllCells(!viewAllCells);

	const handleClickPackButton = (property: PackButtonSwitches) =>
		handleOnSave({ ...packItem, ...property });

	const handleMoveItemToCloset = () => {
		moveToCloset && moveToCloset(packItemId);
	};

	const {
		packItemName,
		packItemDescription,
		packItemId,
		packId,
		packItemWeight,
		packItemUnit,
		packItemQuantity,
		packItemUrl,
		wornWeight,
		consumable,
		favorite,
		packItemPrice,
	} = packItem;

	const availablePacks = props?.packList || [];
	const dropId = `item${packItemId}`;

	const showAllCells = !isMobile || viewAllCells;
	const hasPackId = packId !== null;

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
						/>

						{showAllCells && (
							<>
								<TableCell
									value={packItemDescription}
									onChange={handleInput}
									onToggleOff={handleToggle}
									itemName="packItemDescription"
									placeholder="Description"
								/>

								<PropertyButtons
									wornWeight={wornWeight}
									consumable={consumable}
									favorite={favorite}
									onClick={handleClickPackButton}
									display={toggleRow}
								/>

								<QuantityCell
									quantity={packItemQuantity}
									onChange={handleInput}
									onToggleOff={handleToggle}
								/>
								<PackWeightCell
									weight={packItemWeight}
									unit={packItemUnit}
									placeholder={0}
									onChange={handleInput}
									onToggleOff={handleToggle}
									itemName="packItemWeight"
								/>

								{showPrices && (
									<PriceCell
										price={packItemPrice}
										itemName="packItemPrice"
										placeholder={0}
										onChange={handleInput}
										onToggleOff={handleToggle}
									/>
								)}

								{userView && (
									<ActionButtons display={toggleRow}>
										<Flex align="center">
											<ShareIcon
												onClick={() => setToggleGearButtons(!toggleGearButtons)}
											/>
										</Flex>

										<DeleteItemModal
											id={packItemId}
											hasPackId={hasPackId}
											onClickMove={handleMoveItemToCloset}
											onClickDelete={() => handleDelete(packItemId)}>
											<Flex align="center">
												<TrashIcon />
											</Flex>
										</DeleteItemModal>
									</ActionButtons>
								)}
							</>
						)}
					</Row>

					{toggleGearButtons && userView && (
						<MoveItemDropdown packItem={item} availablePacks={availablePacks} />
					)}
				</>
			)}
		</Draggable>
	);
};

const Row = styled(Table.Row)`
	position: relative;
	border: none;
	background-color: white;
	td {
		vertical-align: middle;
	}
	td:first-child {
		overflow: visible;
	}
`;
