import { Button } from '@/components/alpine';
import { DeleteItemModal } from '@/components/ui/modals/modals';
import { EditPencilIcon, ShareIcon, TrashIcon } from '@/components/icons';
import { isPackItem, type BaseTableRowItem } from '@/types/pack-types';
import styles from './pack-item-row.module.css';

type PackItemActionsProps = {
	item: BaseTableRowItem;
	onEdit?: () => void;
	onMoveToCloset?: () => void;
	onDelete?: () => void;
	showMoveToCloset?: boolean;
};

export const PackItemActions = ({
	item,
	onEdit,
	onMoveToCloset,
	onDelete,
	showMoveToCloset = true,
}: PackItemActionsProps) => {
	return (
		<div className={styles.itemActions}>
			{onEdit && (
				<Button variant="ghost" color="gray" onClick={onEdit} aria-label="Edit item">
					<EditPencilIcon />
				</Button>
			)}

			{showMoveToCloset && onMoveToCloset && (
				<DeleteItemModal
					id={item.packItemId}
					hasPackId={isPackItem(item)}
					onClickMove={onMoveToCloset}
					onClickDelete={onDelete}>
					<Button variant="ghost" aria-label="Move to closet" iconLeft={<ShareIcon />} />
				</DeleteItemModal>
			)}

			{onDelete && (
				<DeleteItemModal
					id={item.packItemId}
					hasPackId={isPackItem(item)}
					onClickMove={onMoveToCloset}
					onClickDelete={onDelete}>
					<Button variant="ghost" aria-label="Delete item" iconLeft={<TrashIcon />} />
				</DeleteItemModal>
			)}
		</div>
	);
};
