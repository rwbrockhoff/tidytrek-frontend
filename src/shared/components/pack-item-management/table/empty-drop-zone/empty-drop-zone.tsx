import { useDroppable } from '@dnd-kit/core';
import styles from './empty-drop-zone.module.css';

type EmptyDropZoneProps = {
	categoryId: number;
};

export const EmptyDropZone = ({ categoryId }: EmptyDropZoneProps) => {
	const { setNodeRef } = useDroppable({
		id: `category-${categoryId}`,
	});

	return (
		<tr ref={setNodeRef} className={styles.emptyDropZone}>
			<td colSpan={24} className={styles.emptyDropZoneCell}></td>
		</tr>
	);
};
