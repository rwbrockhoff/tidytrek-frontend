import styles from './empty-table-row.module.css';

type EmptyTableRowProps = {
	isDraggingOver: boolean;
	noChildren: boolean;
};
export const EmptyTableRow = ({ isDraggingOver, noChildren }: EmptyTableRowProps) => {
	const isTransparent = isDraggingOver && noChildren;

	return (
		<tr 
			className={styles.tableRow}
			style={{
				'--row-bg-color': isTransparent ? 'white' : 'var(--color-bg-tertiary)'
			} as React.CSSProperties}
		>
			<td colSpan={24} />
		</tr>
	);
};

