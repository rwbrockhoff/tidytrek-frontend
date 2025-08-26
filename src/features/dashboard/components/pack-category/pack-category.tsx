import { memo } from 'react';
import {
	type PackListItem,
	type Category,
	type PackItem,
	TableRowContext,
} from '@/types/pack-types';
import styles from './pack-category.module.css';
import { cn, mx } from '@/styles/utils';
import { Flex } from '@/components/layout';
import {
	useSortable,
	SortableContext,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Table } from '@/shared/components/pack-item-management/table';
import { EmptyDropZone } from '@/shared/components/pack-item-management/table/empty-drop-zone/empty-drop-zone';
import { TableRowMemo } from '@/shared/components/pack-item-management/table/table-row/table-row-memo';
import { TableHeader } from '@/shared/components/pack-item-management/table/table-header/table-header';
import { TableFooter } from '@/shared/components/pack-item-management/table/table-footer/table-footer';
import { usePermissions } from '@/hooks/auth/use-permissions';
import { Body as TableBody } from '@/components/alpine/table/table';
import { usePackCategory } from '../../hooks/use-pack-category';
import {
	useAddNewPackItemMutation,
	useMoveItemToClosetMutation,
} from '@/queries/pack-queries';

type PackCategoryProps = {
	category: Category;
	packList: PackListItem[];
	isMinimized?: boolean;
};

const PackCategoryComponent = ({
	category,
	packList,
	isMinimized: forceMinimized,
}: PackCategoryProps) => {
	const { isCreator } = usePermissions();

	const {
		packCategoryName,
		packCategoryColor,
		packCategoryId,
		packId,
		packItems,
		isMinimized,
		handleMinimizeCategory,
		convertedCategoryWeight,
		formattedTotalPrice,
		itemQuantity,
	} = usePackCategory(category, forceMinimized);

	const { mutate: addPackItem } = useAddNewPackItemMutation();
	const { mutate: moveItemToCloset } = useMoveItemToClosetMutation();

	const handleAddItem = () => {
		addPackItem({ packId, packCategoryId });
	};

	const handleMoveItemToCloset = (packItemId: number) => {
		moveItemToCloset(packItemId);
	};

	const categoryHeaderInfo = { packCategoryId, packCategoryName, packCategoryColor };

	const showCategoryItems = !isMinimized;

	const {
		attributes,
		listeners,
		setNodeRef: setSortableNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: category?.packCategoryId?.toString() ?? '',
		disabled: !isCreator,
	});

	const { setNodeRef: setDroppableNodeRef } = useDroppable({
		id: `category-${category?.packCategoryId ?? ''}`,
	});

	const setNodeRef = (node: HTMLElement | null) => {
		setSortableNodeRef(node);
		setDroppableNodeRef(node);
	};

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0 : 1,
		userSelect: 'none' as const,
		WebkitUserSelect: 'none' as const,
		touchAction: 'none' as const,
	};

	return (
		<Flex
			ref={setNodeRef}
			style={style}
			className={cn(
				styles.tableContainer,
				isMinimized && styles.minimized,
				'w-full',
				mx.textCenter,
			)}
			data-testid="pack-category-row">
			<Table>
				<TableHeader
					dragProps={{ ...attributes, ...listeners }}
					categoryHeaderInfo={categoryHeaderInfo}
					isMinimized={isMinimized}
					minimizeCategory={handleMinimizeCategory}
				/>

				<TableBody style={{ minHeight: 10 }}>
					{showCategoryItems && packItems.length > 0 ? (
						<SortableContext
							items={packItems.map((item) => `${packCategoryId}-${item.packItemId}`)}
							strategy={verticalListSortingStrategy}>
							{packItems.map((item: PackItem) => (
								<TableRowMemo
									key={`${packCategoryId}-${item.packItemId}`}
									item={item}
									packList={packList}
									disabled={!isCreator}
									moveToCloset={handleMoveItemToCloset}
									context={TableRowContext.PACK}
									categoryId={packCategoryId?.toString() ?? ''}
								/>
							))}
						</SortableContext>
					) : (
						<EmptyDropZone categoryId={packCategoryId} />
					)}
				</TableBody>

				{!isMinimized && (
					<TableFooter
						handleAddItem={handleAddItem}
						showTotals={true}
						itemQuantity={itemQuantity}
						weight={convertedCategoryWeight}
						price={formattedTotalPrice}
					/>
				)}
			</Table>
		</Flex>
	);
};

export const PackCategory = memo(PackCategoryComponent, (prevProps, nextProps) => {
	// Only re-render if essential props changed
	const prevCategory = prevProps.category;
	const nextCategory = nextProps.category;

	// Always re-render if category ID changed (different category)
	if (prevCategory.packCategoryId !== nextCategory.packCategoryId) {
		return false;
	}

	// Check if other props changed
	if (
		prevProps.isMinimized !== nextProps.isMinimized ||
		prevProps.packList.length !== nextProps.packList.length
	) {
		return false;
	}

	// Check if essential category props changed (non-drag related)
	const essentialCategoryPropsChanged =
		prevCategory.packCategoryName !== nextCategory.packCategoryName ||
		prevCategory.packCategoryColor !== nextCategory.packCategoryColor ||
		prevCategory.packItems.length !== nextCategory.packItems.length;

	if (essentialCategoryPropsChanged) return false;

	// Check if items changed (order or properties affecting totals)
	if (prevCategory.packItems.length === nextCategory.packItems.length) {
		const prevItemIds = prevCategory.packItems.map((item) => item.packItemId);
		const nextItemIds = nextCategory.packItems.map((item) => item.packItemId);

		// Re-render if the order of items changed
		const orderChanged = prevItemIds.some((id, index) => id !== nextItemIds[index]);
		if (orderChanged) return false;

		// Re-render if any item properties affecting totals changed
		const totalsChanged = prevCategory.packItems.some((prevItem, index) => {
			const nextItem = nextCategory.packItems[index];
			return (
				prevItem.packItemPrice !== nextItem.packItemPrice ||
				prevItem.packItemWeight !== nextItem.packItemWeight ||
				prevItem.packItemQuantity !== nextItem.packItemQuantity
			);
		});
		if (totalsChanged) return false;
	}

	// If we get here, nothing essential changed - prevent re-render
	return true;
});
