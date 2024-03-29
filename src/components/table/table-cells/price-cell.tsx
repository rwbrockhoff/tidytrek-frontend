import { type InputEvent } from '@/types/form-types';
import { useContext, useState } from 'react';
import { Table, Text } from '@radix-ui/themes';
import { TableInput } from './table-input';
import { useUserContext } from '@/hooks/use-viewer-context';
import { convertCurrency } from '@/utils';
import { TableRowContext } from '../context/table-row-context';
import { useCellWidth } from '@/components/table/hooks/use-cell-width';

type PriceCellProps = {
	onToggleOff: () => void;
};

export const PriceCell = ({ onToggleOff }: PriceCellProps) => {
	const userView = useUserContext();
	const { packItem, onChange, isDragging } = useContext(TableRowContext);
	const { packItemPrice = 0 } = packItem || {};
	const { ref, width } = useCellWidth(isDragging);

	const [toggleInput, setToggleInput] = useState(false);
	const toggleToEdit = () => {
		!toggleInput && setToggleInput(true);
	};

	const toggleToCell = () => {
		if (toggleInput) {
			setToggleInput(false);
			onToggleOff();
		}
	};

	const handleOnChange = (e: InputEvent) => {
		if (!e.target.value) e.target.value = '0';
		onChange && onChange(e);
	};

	const formattedPrice = convertCurrency(packItemPrice, 'USD');
	const inputPrice = packItemPrice === 0 ? '' : packItemPrice;
	return (
		<Table.Cell
			ref={ref}
			align="center"
			onBlur={toggleToCell}
			onFocus={toggleToEdit}
			style={{ width }}>
			{userView ? (
				<TableInput
					value={toggleInput ? inputPrice : formattedPrice}
					name="packItemPrice"
					placeholder={'0'}
					onChange={handleOnChange}
				/>
			) : (
				<Text align="center">{formattedPrice}</Text>
			)}
		</Table.Cell>
	);
};
