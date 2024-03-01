import styled from 'styled-components';
import { tidyTheme } from '../../../../shared/theme/tidyTheme';

type EmptyTableRowProps = {
	isDraggingOver: boolean;
	noChildren: boolean;
};
const EmptyTableRow = ({ isDraggingOver, noChildren }: EmptyTableRowProps) => {
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

export default EmptyTableRow;
