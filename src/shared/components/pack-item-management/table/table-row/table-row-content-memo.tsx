import { memo } from 'react';
import { type BaseTableRowItem, type PackItemProperty } from '@/types/pack-types';
import { type InputEvent } from '@/types/form-types';
import { type ZodFormErrors } from '@/hooks/form/use-zod-error';
import { type DraggableAttributes } from '@dnd-kit/core';
import { TableRowContent } from './table-row-content';

type DragProvidedProps = {
	innerRef: (node: HTMLElement | null) => void;
	draggableProps: DraggableAttributes & {
		style: React.CSSProperties;
	};
	dragHandleProps: Record<string, unknown> | undefined | null;
};

type TableRowContentProps = {
	isDragging: boolean;
	provided: DragProvidedProps;
	disabled?: boolean;
	packItem: BaseTableRowItem;
	onChange: (e: InputEvent) => void;
	formErrors: ZodFormErrors<BaseTableRowItem> | null;
	onToggle: () => void;
	onChangeProperty: (property: PackItemProperty) => void;
	onMove: () => void;
	onMoveToCloset: () => void;
	onDelete: () => void;
	children: React.ReactNode;
	categoryId?: string;
};

// Memozation for Table Row Content for improved drag performance
// Dashboard uses state-based visuals, Gear Closet uses transform-based visuals

export const TableRowContentMemo = memo(
	TableRowContent,
	(prevProps: TableRowContentProps, nextProps: TableRowContentProps) => {
		const prevItem = prevProps.packItem;
		const nextItem = nextProps.packItem;

		// Re-render if item ID changed
		if (prevItem.packItemId !== nextItem.packItemId) return false;

		// Check if essential item props changed (editable fields + index for ordering)
		const essentialPropsChanged =
			prevItem.packItemName !== nextItem.packItemName ||
			prevItem.packItemDescription !== nextItem.packItemDescription ||
			prevItem.packItemWeight !== nextItem.packItemWeight ||
			prevItem.packItemWeightUnit !== nextItem.packItemWeightUnit ||
			prevItem.packItemPrice !== nextItem.packItemPrice ||
			prevItem.packItemQuantity !== nextItem.packItemQuantity ||
			prevItem.packItemUrl !== nextItem.packItemUrl ||
			prevItem.wornWeight !== nextItem.wornWeight ||
			prevItem.consumable !== nextItem.consumable ||
			prevItem.favorite !== nextItem.favorite ||
			prevItem.packItemIndex !== nextItem.packItemIndex;

		// Allow re-renders if editable fields changed
		if (essentialPropsChanged) return false;

		// Allow re-renders for form errors
		if (prevProps.formErrors !== nextProps.formErrors) return false;

		// Allow re-renders if isDragging state changes (for visual feedback)
		if (prevProps.isDragging !== nextProps.isDragging) return false;

		// Check if other visual props changed
		const visualPropsChanged =
			prevProps.disabled !== nextProps.disabled ||
			prevProps.categoryId !== nextProps.categoryId;

		if (visualPropsChanged) return false;

		// Gear Closet: Only allow provided changes (needs cursor following)
		const isGearCloset = !nextProps.categoryId; // No categoryId -> Gear Closet

		// Allow transform updates for Gear Closet
		if (isGearCloset && prevProps.provided !== nextProps.provided) {
			return false;
		}

		// All checks pass - safe to skip render
		return true;
	},
);
