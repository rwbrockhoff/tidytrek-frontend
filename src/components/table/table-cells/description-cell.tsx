import { useContext } from 'react';
import { Table } from '@radix-ui/themes';
import { useUserContext } from '@/hooks/use-viewer-context';
import { TableInput } from './table-input';
import { useCellWidth } from '@/components/table/hooks/use-cell-width';
import { TableRowContext } from '../context/table-row-context';

type TableCellProps = {
	onToggleOff: () => void;
};

export const DescriptionCell = ({ onToggleOff }: TableCellProps) => {
	const userView = useUserContext();
	const { packItem, onChange, isDragging } = useContext(TableRowContext);
	const { packItemDescription } = packItem || {};

	const { width, ref } = useCellWidth(isDragging);

	const handleToggleOff = () => userView && onToggleOff();

	return (
		<Table.Cell ref={ref} style={{ width }} onBlur={handleToggleOff}>
			<TableInput
				value={packItemDescription || ''}
				placeholder="Description"
				name={'packItemDescription'}
				onChange={onChange}
				disabled={!userView}
			/>
		</Table.Cell>
	);
};
