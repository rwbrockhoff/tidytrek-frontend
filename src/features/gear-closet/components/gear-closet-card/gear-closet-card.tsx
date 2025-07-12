import { type GearClosetItem } from '@/types/pack-types';
import { Button, Card } from '@/components/alpine';
import { PlusIcon } from '@/components/icons';
import { PackItemRow } from '@/features/dashboard/components/pack-item-row/pack-item-row';
import { cn } from '@/styles/utils';
import styles from './gear-closet-card.module.css';

type GearClosetCardProps = {
	items: GearClosetItem[];
	userView?: boolean;
	onEdit?: (item: GearClosetItem) => void;
	onDelete?: (itemId: number) => void;
	onAddItem?: () => void;
	className?: string;
};

export const GearClosetCard = ({
	items,
	userView = false,
	onEdit,
	onDelete,
	onAddItem,
	className,
}: GearClosetCardProps) => {
	return (
		<Card.Root
			shadow="paper"
			override
			className={`${styles.closetCard} ${className || ''}`}>
			<Card.Body className={styles.itemsContainer}>
				{items.map((item: GearClosetItem, index) => (
					<PackItemRow
						key={item.packItemId || index}
						item={item}
						userView={userView}
						onEdit={onEdit}
						onDelete={onDelete}
						showMoveToCloset={false}
					/>
				))}
			</Card.Body>

			{userView && onAddItem && (
				<Card.Footer className={cn('aow', styles.cardFooter)}>
					<Button
						variant="outline"
						size="sm"
						onClick={onAddItem}
						iconLeft={<PlusIcon />}
						aria-label="Add new item to gear closet">
						Add Item
					</Button>
				</Card.Footer>
			)}
		</Card.Root>
	);
};
