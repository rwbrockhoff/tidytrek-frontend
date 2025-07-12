import { Badge } from '@radix-ui/themes';
import { Button } from '@/components/alpine';
import { useNavigate } from 'react-router-dom';
import { type BaseTableRowItem } from '@/types/pack-types';
import { convertCurrency, encodePackItemId } from '@/utils';
import { isPackItem } from '@/types/pack-types';
import { DeleteItemModal } from '@/components/ui/modals/modals';
import { EditPencilIcon, ShareIcon, TrashIcon, LinkIcon } from '@/components/icons';
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
	const navigate = useNavigate();

	const handleEdit = () => {
		// For mobile, navigate to edit page
		const encodedPackItemId = encodePackItemId(item.packItemId);
		const hasPack = item.packId !== null;

		if (hasPack) {
			// Navigate to pack item edit
			navigate(`/pack-item/edit/${encodedPackItemId}`, {
				state: {
					packId: item.packId,
					packCategoryId: item.packCategoryId,
				},
			});
		} else {
			// Navigate to gear closet item edit
			navigate(`/closet-item/edit/${encodedPackItemId}`, {
				state: {
					gearCloset: true,
				},
			});
		}
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
				<div className={styles.itemNameContainer}>
					{item.packItemUrl ? (
						<a
							href={item.packItemUrl}
							className={styles.itemNameLink}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="View pack item product link">
							<LinkIcon />
							<h4 className={styles.itemName}>{item.packItemName || 'Name'}</h4>
						</a>
					) : (
						<h4 className={styles.itemName}>{item.packItemName || 'Name'}</h4>
					)}
				</div>
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
									<Button
										variant="ghost"
										aria-label="Move to closet"
										iconLeft={<ShareIcon />}
									/>
								</DeleteItemModal>
							)}

							{onDelete && (
								<DeleteItemModal
									id={item.packItemId}
									hasPackId={isPackItem(item)}
									onClickMove={handleMoveToCloset}
									onClickDelete={handleDelete}>
									<Button
										variant="ghost"
										aria-label="Delete item"
										iconLeft={<TrashIcon />}
									/>
								</DeleteItemModal>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
