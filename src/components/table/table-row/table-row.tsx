import styles from './table-row.module.css';
import { useState, memo } from 'react';
import {
	type PackListItem,
	type BaseTableRowItem,
	type PackItemProperty,
	isPackItem,
} from '@/types/pack-types';
import { DeleteItemModal } from '@/components/ui/modals/modals';
import { ShareIcon, TrashIcon } from '@/components/icons';
import { Flex } from '@radix-ui/themes';
import { Button } from '@/components/alpine';

import { useTableRowInput } from '@/features/dashboard/hooks/use-table-row-input';
import { MoveItemDropdown } from '../move-item-dropdown/move-item-dropdown';
import { useUserContext } from '@/hooks/auth/use-user-context';

import { TableErrorRow } from '../table-error-row/table-error-row';
import { useTableRowValidation } from './hooks/use-table-row-validation';
import { DraggableTableRow } from './draggable-table-row';
import { TableRowContent } from './table-row-content';
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

// Table Row is used in PackCategory + GearCloset
// Memoized exported component below

export const TableRowComponent = (props: TableRowProps) => {
	const userView = useUserContext();

	const { item, index, disabled } = props;
	const { moveToCloset, handleOnSave, handleDelete } = props;

	const {
		packItem,
		onChange,
		packItemChanged,
		formErrors,
		updateFormErrors,
		primaryError,
	} = useTableRowInput(item);

	const { validatePackItem } = useTableRowValidation();

	const [toggleRow, setToggleRow] = useState(false);
	const [toggleGearButtons, setToggleGearButtons] = useState(false);

	const handleToggle = () => {
		if (packItemChanged) {
			const { isValid, errors } = validatePackItem(packItem);
			if (!isValid) {
				return updateFormErrors(errors);
			}
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
	const hasPackId = isPackItem(packItem);

	return (
		<DraggableTableRow index={index} packItemId={packItemId} disabled={disabled}>
			{(provided, { isDragging }) => (
				<>
						<TableRowContent
							toggleRow={toggleRow}
							isDragging={isDragging}
							provided={provided}
							disabled={disabled}
							packItem={packItem}
							onChange={onChange}
							formErrors={formErrors}
							onToggle={handleToggle}
							onChangeProperty={handleChangeProperty}
							onMouseOver={() => setToggleRow(true)}
							onMouseLeave={() => setToggleRow(false)}>
							<Flex align="center">
								<Button
									onClick={() => setToggleGearButtons(!toggleGearButtons)}
									variant="ghost"
									size="md"
									override
									className={styles.tableActionButton}
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
										size="md"
										override
										className={styles.tableActionButton}
										data-testid="delete-pack-item-button"
										aria-label="Delete pack item"
										iconLeft={<TrashIcon />}
									/>
								</Flex>
							</DeleteItemModal>
						</TableRowContent>
						{toggleGearButtons && userView && !isDragging && (
							<MoveItemDropdown packItem={item} availablePacks={availablePacks} />
						)}

						<TableErrorRow error={primaryError} />
				</>
			)}
		</DraggableTableRow>
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
