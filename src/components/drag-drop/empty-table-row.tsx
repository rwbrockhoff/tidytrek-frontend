import styled from 'styled-components';
import { tidyTheme } from '@/styles/theme/tidy-theme';

type EmptyTableRowProps = {
	isDraggingOver: boolean;
	noChildren: boolean;
};
export const EmptyTableRow = ({ isDraggingOver, noChildren }: EmptyTableRowProps) => {
	const isTransparent = isDraggingOver && noChildren;

	return (
		<TableRow $transparent={isTransparent}>
			<td colSpan={24} />
		</TableRow>
	);
};

const TableRow = styled.tr<{ $transparent: boolean }>`
	background-color: ${({ $transparent }) =>
		$transparent ? 'white' : `${tidyTheme.tidyLightGrey}`};
`;
