import { Badge, Button } from '@radix-ui/themes';
import { type BaseTableRowItem } from '@/types/pack-types';
import { convertCurrency } from '@/utils';
import { isPackItem } from '@/types/pack-types';
import { DeleteItemModal } from '@/components/ui';
import { EditPencilIcon, ShareIcon, TrashIcon } from '@/components/ui/icons';
import styles from './pack-item-row.module.css';

type PackItemRowProps<T extends BaseTableRowItem = BaseTableRowItem> = {
	item: T;
	userView?: boolean;
	onEdit?: (item: T) => void;
	onMoveToCloset?: (itemId: number) => void;
	onDelete?: (itemId: number) => void;
	showMoveToCloset?: boolean;
	className?: string;
};

export const PackItemRow = <T extends BaseTableRowItem>({
	item,
	userView = false,
	onEdit,
	onMoveToCloset,
	onDelete,
	showMoveToCloset = true,
	className,
}: PackItemRowProps<T>) => {
	const handleEdit = () => {
		onEdit?.(item);
	};

	const handleMoveToCloset = () => {
		onMoveToCloset?.(item.packItemId);
	};

	const handleDelete = () => {
		onDelete?.(item.packItemId);
	};

	return (
		<div className={`${styles.itemCard} ${className || ''}`}>
			<div className={styles.itemHeader}>
				<h4 className={styles.itemName}>{item.packItemName || 'Name'}</h4>
				{item.packItemPrice && (
					<span className={styles.itemPrice}>
						{convertCurrency(item.packItemPrice, 'USD')}
					</span>
				)}
			</div>

			<div className={styles.itemDetails}>
				{item.packItemDescription && (
					<p className={styles.itemDescription}>{item.packItemDescription}</p>
				)}

				<div className={styles.itemPropertiesRow}>
					<div className={styles.itemProperties}>
						<Badge color="gray" size="1">
							{item.packItemWeight} {item.packItemUnit}
						</Badge>
						{item.packItemQuantity > 1 && (
							<span className={styles.property}>x{item.packItemQuantity}</span>
						)}
					</div>

					{userView && (
						<div className={styles.itemActions}>
							{onEdit && (
								<Button
									variant="ghost"
									color="gray"
									onClick={handleEdit}
									aria-label="Edit item">
									<EditPencilIcon />
								</Button>
							)}

							{showMoveToCloset && onMoveToCloset && (
								<DeleteItemModal
									id={item.packItemId}
									hasPackId={isPackItem(item)}
									onClickMove={handleMoveToCloset}
									onClickDelete={handleDelete}>
									<Button variant="ghost" color="gray" aria-label="Move to closet">
										<ShareIcon />
									</Button>
								</DeleteItemModal>
							)}

							{onDelete && (
								<DeleteItemModal
									id={item.packItemId}
									hasPackId={isPackItem(item)}
									onClickMove={handleMoveToCloset}
									onClickDelete={handleDelete}>
									<Button variant="ghost" color="gray" aria-label="Delete item">
										<TrashIcon />
									</Button>
								</DeleteItemModal>
							)}
						</div>
					)}
				</div>

				{item.packItemUrl && (
					<a
						href={item.packItemUrl}
						className={styles.itemLink}
						target="_blank"
						rel="noopener noreferrer">
						View Product
					</a>
				)}
			</div>
		</div>
	);
};
