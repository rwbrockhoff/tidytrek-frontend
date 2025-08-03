import { memo } from 'react';
import {
	type PackListItem,
	type BaseTableRowItem,
} from '@/types/pack-types';

import { usePackItemInput } from '@/shared/hooks/pack-item-management/use-pack-item-input';
import { MoveItemDropdown } from '@/shared/components/pack-item-management/move-item-dropdown';
import { useUserPermissionsContext } from '@/hooks/auth/use-user-permissions-context';

import { TableErrorRow } from '../table-error-row/table-error-row';
import { useTableRowActions } from './hooks/use-table-row-actions';
import { useTableRowModal } from './hooks/use-table-row-modal';
import { DraggableTableRow } from './draggable-table-row';
import { TableRowContent } from './table-row-content';
import { TableRowActions } from './table-row-actions';
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
	const { isCreator } = useUserPermissionsContext();

	const { item, index, disabled } = props;
	const { moveToCloset, handleOnSave, handleDelete } = props;

	const {
		packItem,
		onChange,
		packItemChanged,
		formErrors,
		updateFormErrors,
		primaryError,
	} = usePackItemInput(item);

	const {
		handleToggle,
		handleChangeProperty,
		handleMoveItemToCloset,
		handleDeleteItem,
	} = useTableRowActions({
		packItem,
		packItemChanged,
		handleOnSave,
		handleDelete,
		moveToCloset,
		updateFormErrors,
	});

	const {
		toggleGearButtons,
		handleToggleGearButtons,
	} = useTableRowModal();

	const availablePacks = props?.packList || [];

	return (
		<DraggableTableRow index={index} packItemId={packItem.packItemId} disabled={disabled}>
			{(provided, { isDragging }) => (
				<>
					<TableRowContent
						isDragging={isDragging}
						provided={provided}
						disabled={disabled}
						packItem={packItem}
						onChange={onChange}
						formErrors={formErrors}
						onToggle={handleToggle}
						onChangeProperty={handleChangeProperty}>
						<TableRowActions
							packItem={packItem}
							onToggleGearButtons={handleToggleGearButtons}
							onMoveToCloset={handleMoveItemToCloset}
							onDelete={handleDeleteItem}
						/>
					</TableRowContent>
					{toggleGearButtons && isCreator && !isDragging && (
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
