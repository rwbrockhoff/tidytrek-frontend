type EmptyTableRowProps = {
	isDraggingOver: boolean;
	noChildren: boolean;
};

export const EmptyTableRow = ({ isDraggingOver, noChildren }: EmptyTableRowProps) => {
	const isTransparent = isDraggingOver && noChildren;

	return (
		<tr
			style={{
				backgroundColor: isTransparent
					? 'var(--color-bg-secondary)'
					: 'var(--color-bg-primary)',
			}}>
			<td colSpan={24} />
		</tr>
	);
};
