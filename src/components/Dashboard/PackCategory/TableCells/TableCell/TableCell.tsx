import { Table, Input } from 'semantic-ui-react';
import { useState } from 'react';
import './TableCell.css';

type TableCellProps = {
	value: string | number;
	itemName: string;
	placeholder?: string;
	size: number;
	onChange: (
		e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
	) => void;
	onToggleOff: () => void;
};

const TableCell = (props: TableCellProps) => {
	const { value, itemName, placeholder, size, onChange, onToggleOff } = props;
	const [toggleInput, setToggleInput] = useState(false);
	const toggleToEdit = () => !toggleInput && setToggleInput(true);
	const toggleToCell = () => {
		if (toggleInput) {
			setToggleInput(false);
			onToggleOff();
		}
	};

	return (
		<Table.Cell
			colSpan={size}
			onMouseOver={toggleToEdit}
			onMouseLeave={toggleToCell}
			onBlur={toggleToCell}
			onClick={toggleToEdit}>
			<Input
				className="table-cell-input"
				value={value || ''}
				name={itemName}
				placeholder={placeholder}
				onChange={onChange}
				transparent={!toggleInput}
				style={{
					paddingLeft: !toggleInput ? '13px' : '0px',
				}}
			/>
		</Table.Cell>
	);
};

export default TableCell;
