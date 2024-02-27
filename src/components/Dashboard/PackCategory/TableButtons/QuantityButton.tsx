import { Table } from 'semantic-ui-react';
import { TableInput } from './TableButtons';
import { useState } from 'react';
import { ReactInput } from '../../../../types/generalTypes';
import { useUserContext } from '../../../../views/Dashboard/hooks/useUserContext';

type ButtonProps = {
	quantity: number;
	size: number;
	onChange: (e: ReactInput) => void;
	onToggleOff: () => void;
};

const QuantityButton = (props: ButtonProps) => {
	const userView = useUserContext();
	const { quantity, size, onChange, onToggleOff } = props;

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
			textAlign="center"
			colSpan={size}
			disabled={!userView}
			onMouseOver={toggleToEdit}
			onMouseLeave={toggleToCell}
			onBlur={toggleToCell}
			onClick={toggleToEdit}>
			<TableInput
				fluid
				name="packItemQuantity"
				value={quantity}
				type="number"
				step={1}
				transparent={!toggleInput}
				onChange={onChange}
				style={{ paddingLeft: toggleInput ? '0px' : '12px' }}
			/>
		</Table.Cell>
	);
};

export default QuantityButton;
