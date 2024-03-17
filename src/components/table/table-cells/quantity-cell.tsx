import { type InputEvent } from '@/types/form-types';
import { useState } from 'react';
import { Table, TextFieldInput } from '@radix-ui/themes';
import { useUserContext } from '@/hooks/use-viewer-context';

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
			align="center"
			colSpan={size}
			onMouseOver={toggleToEdit}
			onMouseLeave={toggleToCell}
			onBlur={toggleToCell}
			onClick={toggleToEdit}>
			<TextFieldInput
				name="packItemQuantity"
				value={quantity}
				type="number"
				step={1}
				disabled={!userView}
				onChange={onChange}
			/>
		</Table.Cell>
	);
};
