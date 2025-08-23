import { memo } from 'react';
import { type Category, type PackListItem } from '@/types/pack-types';
import { TableRowOverlay } from '@/shared/components/pack-item-management/table/table-row-overlay/table-row-overlay';
import { PackCategory } from '../pack-category/pack-category';

type DashboardDragOverlayProps = {
	activeId: string | null;
	localPackCategories: Category[];
	packList: PackListItem[];
};

const DashboardDragOverlayComponent = ({
	activeId,
	localPackCategories,
	packList,
}: DashboardDragOverlayProps) => {
	if (!activeId) return null;

	const activeIdStr = activeId.toString();

	// Category drag overlay
	if (!activeIdStr.includes('-')) {
		const category = localPackCategories.find(
			(cat) => cat.packCategoryId.toString() === activeIdStr,
		);
		if (category) {
			return <PackCategory category={category} packList={packList} isMinimized={true} />;
		}
		return null;
	}

	// Item drag overlay
	const getItemId = (id: string) => {
		const parts = id.split('-');
		return parts.length > 1 ? parts[1] : id;
	};

	const activeItemId = getItemId(activeIdStr);

	for (const cat of localPackCategories) {
		const item = cat.packItems.find(
			(item) => item.packItemId.toString() === activeItemId,
		);

		if (item) return <TableRowOverlay item={item} />;
	}

	return null;
};

export const DashboardDragOverlay = memo(
	DashboardDragOverlayComponent,
	(prevProps, nextProps) => {
		// Only re-render if activeId changed (or if the dragged category/item changed)
		if (prevProps.activeId !== nextProps.activeId) {
			return false;
		}

		// If no active drag, prevent re-render
		if (!prevProps.activeId || !nextProps.activeId) return true;

		const activeIdStr = prevProps.activeId.toString();

		// For category drag, only re-render if the category itself changed
		if (!activeIdStr.includes('-')) {
			const prevCategory = prevProps.localPackCategories.find(
				(cat) => cat.packCategoryId.toString() === activeIdStr,
			);
			const nextCategory = nextProps.localPackCategories.find(
				(cat) => cat.packCategoryId.toString() === activeIdStr,
			);

			if (!prevCategory || !nextCategory) {
				return false;
			}

			// Only re-render if essential category props changed
			return (
				prevCategory.packCategoryName === nextCategory.packCategoryName &&
				prevCategory.packCategoryColor === nextCategory.packCategoryColor &&
				prevCategory.packItems.length === nextCategory.packItems.length
			);
		}

		// For item drag, only re-render if the item itself changed
		const getItemId = (id: string) => {
			const parts = id.split('-');
			return parts.length > 1 ? parts[1] : id;
		};

		const activeItemId = getItemId(activeIdStr);

		// Find the item in both prev and next categories
		let prevItem = null;
		let nextItem = null;

		for (const cat of prevProps.localPackCategories) {
			const item = cat.packItems.find(
				(item) => item.packItemId.toString() === activeItemId,
			);
			if (item) {
				prevItem = item;
				break;
			}
		}

		for (const cat of nextProps.localPackCategories) {
			const item = cat.packItems.find(
				(item) => item.packItemId.toString() === activeItemId,
			);
			if (item) {
				nextItem = item;
				break;
			}
		}

		// If items don't exist in both, allow re-render
		if (!prevItem || !nextItem) return false;

		// Only re-render if essential item properties changed
		return (
			prevItem.packItemName === nextItem.packItemName &&
			prevItem.packItemId === nextItem.packItemId
		);
	},
);
