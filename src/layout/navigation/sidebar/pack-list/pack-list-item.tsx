import { PackListItem as ListItem } from '@/types/pack-types';
import { Text } from '@radix-ui/themes';
import { AccessibleButton } from '@/components/ui';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import styles from './pack-list-item.module.css';

type PackListItemProps = {
	pack: ListItem;
	onClick: (packId: number) => void;
};

export const PackListItem = ({ pack, onClick }: PackListItemProps) => {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
		useSortable({
			id: pack.packId.toString(),
		});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0 : 1,
	};

	return (
		<div ref={setNodeRef} style={style} className={styles.packListItemContainer}>
			<AccessibleButton
				{...attributes}
				{...listeners}
				className={styles.gripContainer}
				aria-label={`Drag to reorder ${pack.packName}`}>
				<GripVertical size={16} className={styles.gripIcon} />
			</AccessibleButton>
			<AccessibleButton
				onClick={() => onClick(pack.packId)}
				className={styles.packButton}
				data-testid="pack-list-row"
				aria-label={`Open ${pack.packName} pack`}>
				<Text className={styles.styledText}>{pack.packName}</Text>
			</AccessibleButton>
		</div>
	);
};
