import { Card, Button } from '@/components/alpine';
import { DashboardPackItemRow } from '../../dashboard-pack-item-row';
import { PlusIcon } from '@/components/icons';
import { cn } from '@/styles/utils';
import { type PackItem } from '@/types/pack-types';
import styles from './pack-category-card.module.css';

type PackCategoryItemsProps = {
	packItems: PackItem[];
	isPackOwner: boolean;
	isMinimized: boolean;
	onAddItem: () => void;
};

export const PackCategoryItems = ({
	packItems,
	isPackOwner,
	isMinimized,
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
					<DashboardPackItemRow
						key={item.packItemId || index}
						item={item}
						isPackOwner={isPackOwner}
					/>
				))}
			</Card.Body>
			{isPackOwner && (
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