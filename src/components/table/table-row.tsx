import styled, { css } from 'styled-components';
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { type PackItem, type PackListItem, PackItemProperty } from '@/types/pack-types';
import { DeleteItemModal, ShareIcon, TrashIcon } from '../ui';
import { Flex, Table } from '@radix-ui/themes';
import { ActionButtons } from '@/components/table/table-buttons';
import {
	ItemNameCell,
	PackWeightCell,
	PropertiesCell,
	QuantityCell,
	PriceCell,
	DescriptionCell,
} from '@/components/table/table-cells';
import { useTableRowInput } from '@/features/dashboard/hooks/use-table-row-input';
import { MoveItemDropdown } from './move-item-dropdown/move-item-dropdown';
import { usePricingContext, useUserContext } from '@/hooks/use-viewer-context';
import { useCheckScreen } from '@/hooks';
import { TableRowContext } from './context/table-row-context';
import { z, quantitySchema, weightSchema, priceSchema } from '@/schemas';
import { TableErrorRow } from './table-error-row';

type TableRowProps = {
	index: number;
	item: PackItem;
	packList: PackListItem[];
	disabled?: boolean;
	moveToCloset?: (packItemId: number) => void;
	handleOnSave: (packItem: PackItem) => void;
	handleDelete: (packItemId: number) => void;
};

const packItemSchema = z.object({
	packItemWeight: weightSchema,
	packItemQuantity: quantitySchema,
	packItemPrice: priceSchema,
});

// Table Row is used in PackCategory + GearCloset

export const TableRow = (props: TableRowProps) => {
	const userView = useUserContext();
	const showPrices = usePricingContext();
	const { isMobile } = useCheckScreen();

	const { item, index, disabled } = props;
	const { moveToCloset, handleOnSave, handleDelete } = props;

	const {
		packItem,
		handleInput,
		packItemChanged,
		formErrors,
		updateFormErrors,
		primaryError,
	} = useTableRowInput(item);

	const [toggleRow, setToggleRow] = useState(false);
	const [viewAllCells, setViewAllCells] = useState(false);
	const [toggleGearButtons, setToggleGearButtons] = useState(false);

	const handleToggle = () => {
		if (packItemChanged) {
			// validation
			const data = packItemSchema.safeParse(packItem);
			if (!data.success) {
				const result = JSON.parse(data.error.message);
				return updateFormErrors(result);
			}
			// save valid pack item
			handleOnSave(packItem);
		}
	};

	const handleToggleViewAllCells = () => setViewAllCells(!viewAllCells);

	const handleChangeProperty = (property: PackItemProperty) =>
		handleOnSave({ ...packItem, ...property });

	const handleMoveItemToCloset = () => {
		moveToCloset && moveToCloset(packItemId);
	};

	const { packItemId, packId } = packItem;

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
			{(provided, { isDragging }) => {
				return (
					<TableRowContext.Provider
						value={{ packItem, onChange: handleInput, isDragging, formErrors }}>
						<>
							<Row
								onMouseOver={() => setToggleRow(true)}
								onMouseLeave={() => setToggleRow(false)}
								ref={provided.innerRef}
								$isDragging={isDragging}
								{...provided.draggableProps}>
								<ItemNameCell
									displayIcon={toggleRow}
									dragProps={{ ...provided.dragHandleProps }}
									toggleMobileView={handleToggleViewAllCells}
									onToggleOff={handleToggle}
								/>

								{showAllCells && (
									<>
										<DescriptionCell onToggleOff={handleToggle} />

										<PropertiesCell onClick={handleChangeProperty} display={toggleRow} />

										<QuantityCell onToggleOff={handleToggle} />

										<PackWeightCell
											onToggleOff={handleToggle}
											onSelect={handleChangeProperty}
										/>

										{showPrices && <PriceCell onToggleOff={handleToggle} />}

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

							<TableErrorRow error={primaryError} />
						</>
					</TableRowContext.Provider>
				);
			}}
		</Draggable>
	);
};

const Row = styled(Table.Row)<{ $isDragging: boolean }>`
	position: relative;
	border: none;
	background-color: white;
	transition:
		background-color,
		box-shadow 200ms ease-in-out;
	td {
		vertical-align: middle;
	}
	td:first-child {
		overflow: visible;
	}

	${({ $isDragging }) =>
		$isDragging &&
		css`
			box-shadow: 0px 8px 22px 0px rgba(0, 0, 0, 0.2);
		`}
`;
