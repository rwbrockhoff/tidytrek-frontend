import { type InputEvent } from '../../../types/formTypes';
import { Table } from 'semantic-ui-react';
import { TableInput } from '../table-buttons/table-buttons';
import { useState } from 'react';
import { useUserContext } from '../../../features/dashboard/hooks/useViewerContext';

type ButtonProps = {
	quantity: number;
	size: number;
	onChange: (e: InputEvent) => void;
	onToggleOff: () => void;
};

export const QuantityCell = (props: ButtonProps) => {
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
				style={{
					paddingLeft: toggleInput ? '0px' : '12px',
					width: '70px',
				}}
			/>
		</Table.Cell>
	);
};
