import { Badge } from '@radix-ui/themes';
import { type BaseTableRowItem } from '@/types/pack-types';
import { usePackItemNavigation } from '../../hooks/use-pack-item-navigation';
import { PackItemDisplay } from './pack-item-display';
import { PackItemActions } from './pack-item-actions';
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
	const { navigateToEdit } = usePackItemNavigation();

	const handleEdit = () => {
		if (onEdit) {
			onEdit(item);
		} else {
			navigateToEdit(item);
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
			<PackItemDisplay item={item} />
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
					<PackItemActions
						item={item}
						onEdit={onEdit ? handleEdit : undefined}
						onMoveToCloset={onMoveToCloset ? handleMoveToCloset : undefined}
						onDelete={onDelete ? handleDelete : undefined}
						showMoveToCloset={showMoveToCloset}
					/>
				)}
			</div>
		</div>
	);
};
