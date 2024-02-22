import { Table, Input } from 'semantic-ui-react';
import { useState } from 'react';
import './TableCell.css';
import { useUserContext } from '../../../../../views/Dashboard/hooks/useUserContext';

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
	const userView = useUserContext();
	const { value, itemName, placeholder, size, onChange, onToggleOff } = props;

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
			colSpan={size}
			onMouseOver={toggleToEdit}
			onMouseLeave={toggleToCell}
			onBlur={toggleToCell}
			onClick={toggleToEdit}>
			{userView ? (
				<Input
					className="table-cell-input"
					value={value || ''}
					name={itemName}
					placeholder={placeholder}
					onChange={onChange}
					transparent={display}
					style={{
						paddingLeft: display ? '13px' : '0px',
					}}
				/>
			) : (
				<p>{value}</p>
			)}
		</Table.Cell>
	);
};

export default TableCell;
