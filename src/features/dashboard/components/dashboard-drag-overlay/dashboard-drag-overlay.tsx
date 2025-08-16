import { type Category, type PackListItem } from '@/types/pack-types';
import { TableRowOverlay } from '@/shared/components/pack-item-management/table/table-row-overlay/table-row-overlay';
import { PackCategory } from '../pack-category/pack-category';

type DashboardDragOverlayProps = {
	activeId: string | null;
	localPackCategories: Category[];
	packList: PackListItem[];
};

export const DashboardDragOverlay = ({
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
		if (item) {
			return <TableRowOverlay item={item} />;
		}
	}

	return null;
};
