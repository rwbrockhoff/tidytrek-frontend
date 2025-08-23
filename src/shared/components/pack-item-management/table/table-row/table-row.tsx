import {
	type PackListItem,
	type BaseTableRowItem,
	TableRowContext,
} from '@/types/pack-types';
import { memo } from 'react';
import { MoveItemModal } from '@/shared/components/pack-item-management/move-item-modal';
import { useUserPermissionsContext } from '@/hooks/auth/use-user-permissions-context';
import { TableErrorRow } from '../table-error-row/table-error-row';
import { useTableRowActions } from './hooks/use-table-row-actions';
import { useTableRowModal } from './hooks/use-table-row-modal';
import { usePackItemRow } from './hooks/use-pack-item-row';
import { usePackItemMutations } from './hooks/use-pack-item-mutations';
import { useClosetItemMutations } from './hooks/use-closet-item-mutations';
import { DraggableTableRow } from './draggable-table-row';
import { TableRowContent } from './table-row-content';
import { TableRowActions } from './table-row-actions';

type TableRowContextType = TableRowContext;

type TableRowProps = {
	item: BaseTableRowItem;
	packList: PackListItem[];
	disabled?: boolean;
	moveToCloset?: (packItemId: number) => void;
	categoryId?: string;
	context: TableRowContextType;
};

// Table Row is used in PackCategory + GearCloset

export const TableRowComponent = (props: TableRowProps) => {
	const { isCreator } = useUserPermissionsContext();

	const { item, disabled, categoryId, moveToCloset, context } = props;

	// Get pack/closet mutations - always call both hooks
	const packMutations = usePackItemMutations();
	const closetMutations = useClosetItemMutations();
	const mutations = context === TableRowContext.PACK ? packMutations : closetMutations;

	// Server logic (mutations, API errors)
	const { apiError, handleSave, handleDelete, handleMoveItemToCloset } = usePackItemRow({
		mutations,
		moveToCloset,
	});

	// Local state & validation hook
	const {
		packItem,
		onChange,
		// packItemChanged,
		formErrors,
		primaryError,
		handleToggle,
		handleChangeProperty,
		handleDeleteItem,
		handleMoveToCloset,
	} = useTableRowActions({
		item,
		apiError,
		handleSave,
		handleDelete,
		handleMoveItemToCloset,
	});

	const { toggleGearButtons, handleToggleGearButtons } = useTableRowModal();

	const availablePacks = props?.packList || [];

	return (
		<DraggableTableRow
			packItemId={packItem.packItemId}
			disabled={disabled}
			categoryId={categoryId}>
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
						onChangeProperty={handleChangeProperty}
						onMove={handleToggleGearButtons}
						onMoveToCloset={handleMoveToCloset}
						onDelete={handleDeleteItem}
						categoryId={categoryId}>
						<TableRowActions
							packItem={packItem}
							onToggleGearButtons={handleToggleGearButtons}
							onMoveToCloset={handleMoveToCloset}
							onDelete={handleDeleteItem}
						/>
					</TableRowContent>
					{isCreator && (
						<MoveItemModal
							packItem={item}
							availablePacks={availablePacks}
							open={toggleGearButtons && !isDragging}
							onOpenChange={handleToggleGearButtons}
							onMoveToCloset={handleMoveToCloset}
						/>
					)}

					{primaryError.error && <TableErrorRow error={primaryError} />}
				</>
			)}
		</DraggableTableRow>
	);
};

export const TableRow = memo(TableRowComponent, (prevProps, nextProps) => {
	// Only re-render if essential properties changed
	// This prevents re-renders during drag when only references change

	const prevItem = prevProps.item;
	const nextItem = nextProps.item;

	// Always re-render if the item ID changed (different item)
	if (prevItem.packItemId !== nextItem.packItemId) return false;

	// Check if other props changed
	if (
		prevProps.disabled !== nextProps.disabled ||
		prevProps.categoryId !== nextProps.categoryId ||
		prevProps.context !== nextProps.context ||
		prevProps.packList.length !== nextProps.packList.length
	) {
		return false;
	}

	// Check if essential item properties changed (what user can edit)
	const essentialPropsChanged =
		prevItem.packItemName !== nextItem.packItemName ||
		prevItem.packItemDescription !== nextItem.packItemDescription ||
		prevItem.packItemWeight !== nextItem.packItemWeight ||
		prevItem.packItemPrice !== nextItem.packItemPrice ||
		prevItem.packItemQuantity !== nextItem.packItemQuantity ||
		prevItem.packItemUrl !== nextItem.packItemUrl ||
		prevItem.wornWeight !== nextItem.wornWeight ||
		prevItem.consumable !== nextItem.consumable ||
		prevItem.favorite !== nextItem.favorite;

	// Return true to prevent re-render, false to allow re-render
	return !essentialPropsChanged;
});
