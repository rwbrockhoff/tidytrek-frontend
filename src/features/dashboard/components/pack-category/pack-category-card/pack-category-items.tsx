import { Card, Button } from '@/components/alpine';
import { PackItemRow } from '../../pack-item-row/pack-item-row';
import { PlusIcon } from '@/components/icons';
import { cn } from '@/styles/utils';
import { type PackItem, type BaseTableRowItem } from '@/types/pack-types';
import styles from './pack-category-card.module.css';

type PackCategoryItemsProps = {
	packItems: PackItem[];
	userView: boolean;
	isMinimized: boolean;
	onEdit: (packItem: BaseTableRowItem) => void;
	onMoveToCloset: (packItemId: number) => void;
	onDelete: (packItemId: number) => void;
	onAddItem: () => void;
};

export const PackCategoryItems = ({
	packItems,
	userView,
	isMinimized,
	onEdit,
	onMoveToCloset,
	onDelete,
	onAddItem,
}: PackCategoryItemsProps) => {
	const showCategoryItems = !isMinimized;

	if (!showCategoryItems) {
		return null;
	}

	return (
		<>
			<Card.Body className={styles.itemsContainer}>
				{packItems.map((item: PackItem, index) => (
					<PackItemRow
						key={item.packItemId || index}
						item={item}
						userView={userView}
						onEdit={onEdit}
						onMoveToCloset={onMoveToCloset}
						onDelete={onDelete}
					/>
				))}
			</Card.Body>
			{userView && (
				<Card.Footer className={cn('aow', styles.categoryFooter)}>
					<Button
						variant="outline"
						size="sm"
						onClick={onAddItem}
						aria-label="Add new item to list"
						iconLeft={<PlusIcon />}>
						Add Item
					</Button>
				</Card.Footer>
			)}
		</>
	);
};