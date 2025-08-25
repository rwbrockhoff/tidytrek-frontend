import { memo } from 'react';
import {
	type PackListItem,
	type BaseTableRowItem,
	TableRowContext,
} from '@/types/pack-types';
import { TableRow as TableRowComponent } from './table-row';

type TableRowProps = {
	item: BaseTableRowItem;
	packList: PackListItem[];
	disabled?: boolean;
	moveToCloset?: (packItemId: number) => void;
	categoryId?: string;
	context: TableRowContext;
};

// Memo for TableRow for drag-drop performance

export const TableRowMemo = memo(
	TableRowComponent,
	(prevProps: TableRowProps, nextProps: TableRowProps) => {
		const prevItem = prevProps.item;
		const nextItem = nextProps.item;

		// re-render if item ID changed
		if (prevItem.packItemId !== nextItem.packItemId) return false;

		// Re-render if other essential props changed
		if (
			prevProps.disabled !== nextProps.disabled ||
			prevProps.categoryId !== nextProps.categoryId ||
			prevProps.context !== nextProps.context ||
			prevProps.packList.length !== nextProps.packList.length
		) {
			return false;
		}

		// Check if editable item properties changed (table cells)
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
	},
);
