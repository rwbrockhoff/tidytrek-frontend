import { useContext, useState } from 'react';
import { Table, Text } from '@radix-ui/themes';
import { useUserContext } from '@/hooks/use-viewer-context';
import { TableInput } from './table-input';
import { useCellWidth } from '@/components/table/hooks/use-cell-width';
import { TableRowContext } from '../context/table-row-context';

type TableCellProps = {
	onToggleOff: () => void;
};

export const DescriptionCell = (props: TableCellProps) => {
	const userView = useUserContext();
	const { packItem, onChange, isDragging } = useContext(TableRowContext);
	const { packItemDescription } = packItem || {};

	const { onToggleOff } = props;

	const { width, ref } = useCellWidth(isDragging);

	const [toggleInput, setToggleInput] = useState(false);
	const display = !toggleInput || !userView;

	const toggleToEdit = () => display && setToggleInput(true);
	const toggleToCell = () => {
		if (!display) {
			setToggleInput(false);
			onToggleOff();
		}
	};

	return (
		<Table.Cell
			ref={ref}
			style={{ width }}
			onMouseOver={toggleToEdit}
			onMouseLeave={toggleToCell}
			onBlur={toggleToCell}
			onClick={toggleToEdit}>
			{userView ? (
				<TableInput
					value={packItemDescription || ''}
					name={'packItemDescription'}
					placeholder={'Description'}
					onChange={onChange}
					color="gray"
				/>
			) : (
				<Text ml="2">{packItemDescription}</Text>
			)}
		</Table.Cell>
	);
};
