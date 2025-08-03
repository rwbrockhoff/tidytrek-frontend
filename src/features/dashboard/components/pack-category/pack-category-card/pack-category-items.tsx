import { Card, Button } from '@/components/alpine';
import { DashboardPackItemRow } from '../../dashboard-pack-item-row';
import { PlusIcon } from '@/components/icons';
import { cn } from '@/styles/utils';
import { type PackItem } from '@/types/pack-types';
import styles from './pack-category-card.module.css';

type PackCategoryItemsProps = {
	packItems: PackItem[];
	canEdit: boolean;
	isMinimized: boolean;
	onAddItem: () => void;
};

export const PackCategoryItems = ({
	packItems,
	canEdit,
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
						canEdit={canEdit}
					/>
				))}
			</Card.Body>
			{canEdit && (
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