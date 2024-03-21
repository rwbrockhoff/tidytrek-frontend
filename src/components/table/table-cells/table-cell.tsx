import { type InputEvent, type SelectEvent } from '@/types/form-types';
import { useState } from 'react';
import { Table } from '@radix-ui/themes';
import { useUserContext } from '@/hooks/use-viewer-context';
import { TableInput } from './table-input';

type TableCellProps = {
	value: string | number;
	itemName: string;
	placeholder?: string;
	onChange: (e: InputEvent | SelectEvent) => void;
	onToggleOff: () => void;
};

export const TableCell = (props: TableCellProps) => {
	const userView = useUserContext();
	const { value, itemName, placeholder, onChange, onToggleOff } = props;

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
			onMouseOver={toggleToEdit}
			onMouseLeave={toggleToCell}
			onBlur={toggleToCell}
			onClick={toggleToEdit}>
			{userView ? (
				<TableInput
					value={value || ''}
					name={itemName}
					placeholder={placeholder}
					onChange={onChange}
					color="gray"
				/>
			) : (
				<p>{value}</p>
			)}
		</Table.Cell>
	);
};
