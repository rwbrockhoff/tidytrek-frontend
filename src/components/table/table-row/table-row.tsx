import styles from './table-row.module.css';
import { useState, memo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {
	type PackListItem,
	type BaseTableRowItem,
	type PackItemProperty,
	isPackItem,
} from '@/types/pack-types';
import { DeleteItemModal, ShareIcon, TrashIcon } from '../../ui';
import { Flex } from '@radix-ui/themes';
import { Button } from '@/components/ui/alpine';
import { Table } from '@/components/ui/alpine';
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
import { MoveItemDropdown } from '../move-item-dropdown/move-item-dropdown';
import { usePricingContext } from '@/hooks/auth/use-pricing-context';
import { useUserContext } from '@/hooks/auth/use-user-context';

import { TableRowContext } from '../context/table-row-context';
import { z, quantitySchema, weightSchema, priceSchema } from '@/schemas';
import { TableErrorRow } from '../table-error-row/table-error-row';
import { shallowEqual } from '@/utils';

type TableRowProps = {
	index: number;
	item: BaseTableRowItem;
	packList: PackListItem[];
	disabled?: boolean;
	moveToCloset?: (packItemId: number) => void;
	handleOnSave: (packItem: BaseTableRowItem) => void;
	handleDelete: (packItemId: number) => void;
};

const packItemSchema = z.object({
	packItemWeight: weightSchema,
	packItemQuantity: quantitySchema,
	packItemPrice: priceSchema,
});

// Table Row is used in PackCategory + GearCloset
// Memoized exported component below

export const TableRowComponent = (props: TableRowProps) => {
	const userView = useUserContext();
	const showPrices = usePricingContext();

	const { item, index, disabled } = props;
	const { moveToCloset, handleOnSave, handleDelete } = props;

	const {
		packItem,
		onChange,
		onSelect,
		packItemChanged,
		formErrors,
		updateFormErrors,
		primaryError,
	} = useTableRowInput(item);

	const [toggleRow, setToggleRow] = useState(false);
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

	const handleChangeProperty = (property: PackItemProperty) =>
		handleOnSave({ ...packItem, ...property });

	const handleMoveItemToCloset = () => {
		moveToCloset && moveToCloset(packItemId);
	};

	const { packItemId } = packItem;
	const availablePacks = props?.packList || [];
	const dropId = `item${packItemId}`;

	const hasPackId = isPackItem(packItem);

	return (
		<Draggable
			key={dropId}
			draggableId={dropId}
			index={index}
			isDragDisabled={!userView || disabled}>
			{(provided, { isDragging }) => {
				return (
					<TableRowContext.Provider
						value={{
							packItem,
							onChange,
							onSelect,
							isDragging,
							formErrors,
						}}>
						<>
							<Table.Row
								data-testid="pack-item-row"
								onMouseOver={() => setToggleRow(true)}
								onMouseLeave={() => setToggleRow(false)}
								ref={provided.innerRef}
								className={`${styles.tableRow} ${isDragging ? styles.tableRowDragging : ''}`}
								{...provided.draggableProps}>
								<ItemNameCell
									displayIcon={toggleRow}
									dragProps={{ ...provided.dragHandleProps }}
									onToggleOff={handleToggle}
								/>

								<DescriptionCell onToggleOff={handleToggle} />

								<PropertiesCell
									onClick={handleChangeProperty}
									isDisabled={!!disabled}
									display={toggleRow}
								/>

								<QuantityCell onToggleOff={handleToggle} />

								<PackWeightCell
									onToggleOff={handleToggle}
									onSelect={handleChangeProperty}
								/>

								{showPrices && <PriceCell onToggleOff={handleToggle} />}

								{userView && (
									<ActionButtons display={toggleRow}>
										<Flex align="center">
											<Button
												onClick={() => setToggleGearButtons(!toggleGearButtons)}
												variant="ghost"
												size="sm"
												data-testid="move-pack-item-button"
												aria-label="Move pack item"
												iconLeft={<ShareIcon />}
											/>
										</Flex>

										<DeleteItemModal
											id={packItemId}
											hasPackId={hasPackId}
											onClickMove={handleMoveItemToCloset}
											onClickDelete={() => handleDelete(packItemId)}>
											<Flex align="center">
												<Button
													variant="ghost"
													size="sm"
													data-testid="delete-pack-item-button"
													aria-label="Delete pack item"
													iconLeft={<TrashIcon />}
												/>
											</Flex>
										</DeleteItemModal>
									</ActionButtons>
								)}
							</Table.Row>
							{toggleGearButtons && userView && !isDragging && (
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

// Memoize TableRow to avoid re-renders
export const TableRow = memo(TableRowComponent, (prevProps, nextProps) => {
	// Shallow comparison
	// Return true if props are equal (no re-render)
	return (
		shallowEqual(prevProps.item, nextProps.item) &&
		prevProps.index === nextProps.index &&
		prevProps.disabled === nextProps.disabled &&
		prevProps.packList.length === nextProps.packList.length
	);
});
