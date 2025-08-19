import { Button } from '@/components/alpine';
import { EditPencilIcon, MoveIcon, TrashIcon } from '@/components/icons';
import styles from './pack-item-row.module.css';

type PackItemActionsProps = {
	onEdit?: () => void;
	onMove?: () => void;
	onDelete?: () => void;
	showMoveButton?: boolean;
};

export const PackItemActions = ({
	onEdit,
	onMove,
	onDelete,
	showMoveButton = false,
}: PackItemActionsProps) => {
	return (
		<div className={styles.itemActions}>
			{onEdit && (
				<Button variant="ghost" size="sm" onClick={onEdit} aria-label="Edit item">
					<EditPencilIcon />
				</Button>
			)}

			{showMoveButton && onMove && (
				<Button 
					variant="ghost" 
					size="sm" 
					onClick={onMove} 
					aria-label="Move item"
					iconLeft={<MoveIcon />}
				/>
			)}

			{onDelete && (
				<Button 
					variant="ghost" 
					size="sm" 
					onClick={onDelete} 
					aria-label="Delete item"
					iconLeft={<TrashIcon />}
				/>
			)}
		</div>
	);
};