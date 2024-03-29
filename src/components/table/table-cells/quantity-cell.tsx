import { useContext, useState } from 'react';
import { Badge, Flex, Table, Text, TextFieldInput } from '@radix-ui/themes';
import { useUserContext } from '@/hooks/use-viewer-context';
import { TableRowContext } from '../context/table-row-context';
import { useCellWidth } from '@/components/table/hooks/use-cell-width';

type ButtonProps = {
	onToggleOff: () => void;
};

export const QuantityCell = ({ onToggleOff }: ButtonProps) => {
	const userView = useUserContext();
	const { packItem, onChange, isDragging } = useContext(TableRowContext);
	const { packItemQuantity } = packItem || {};

	const { ref, width } = useCellWidth(isDragging);

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
			ref={ref}
			style={{ width }}
			align="center"
			onMouseOver={toggleToEdit}
			onMouseLeave={toggleToCell}
			onBlur={toggleToCell}
			onClick={toggleToEdit}>
			{userView ? (
				<TextFieldInput
					name="packItemQuantity"
					value={packItemQuantity}
					type="number"
					step={1}
					disabled={!userView}
					onChange={onChange}
				/>
			) : (
				<Flex justify="center">
					<Badge radius="large" color="gray" highContrast>
						<Text>{`x ${packItemQuantity}`}</Text>
					</Badge>
				</Flex>
			)}
		</Table.Cell>
	);
};
