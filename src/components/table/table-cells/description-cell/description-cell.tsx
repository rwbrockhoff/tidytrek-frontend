import { useContext } from 'react';
import { Table, TextField } from '@/components/alpine';
import { useUserContext } from '@/hooks/auth/use-user-context';
import { useCellWidth } from '@/components/table/hooks/use-cell-width';
import { TableRowContext } from '../../context/table-row-context';
import { mx } from '@/styles/utils';

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
		<Table.Cell ref={ref} style={{ width }} onBlur={handleToggleOff} className={mx.px0}>
			<TextField.Standalone
				variant="minimal"
				value={packItemDescription || ''}
				placeholder="Description"
				name={'packItemDescription'}
				onChange={onChange}
				disabled={!userView}
				className={mx.textEllipsis}
			/>
		</Table.Cell>
	);
};
