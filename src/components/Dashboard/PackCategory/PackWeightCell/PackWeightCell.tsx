import { Table, Input } from 'semantic-ui-react';
import { useState } from 'react';
import WeightDropdown from '../TableButtonCells/WeightDropdown';
import '../TableCell/TableCell.css';
import './PackWeightCell.css';

type PackWeightCellProps = {
	weight: string | number;
	unit: string;
	itemName: string;
	placeholder: number;
	size: number;
	onChange: (
		e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
	) => void;
	onToggleOff: () => void;
};

const PackWeightCell = (props: PackWeightCellProps) => {
	const { weight, unit, itemName, placeholder, size, onChange, onToggleOff } = props;
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
			textAlign="right"
			colSpan={size}
			onMouseOver={toggleToEdit}
			onMouseLeave={toggleToCell}
			onBlur={toggleToCell}
			onClick={toggleToEdit}>
			<div className="pack-weight-cell-container">
				<Input
					className="weight-table-cell-input"
					value={weight || ''}
					name={itemName}
					transparent={!toggleInput}
					placeholder={placeholder}
					onChange={onChange}
					style={{ paddingRight: !toggleInput ? '14px' : 0 }}
				/>

				<WeightDropdown unit={unit} onChange={onChange} />
			</div>
		</Table.Cell>
	);
};

export default PackWeightCell;
