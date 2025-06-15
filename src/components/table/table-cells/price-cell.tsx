import { type InputEvent } from '@/types/form-types';
import { useContext } from 'react';
import { Table, Text } from '@radix-ui/themes';
import { TableInput } from './table-input';
import { useUserContext } from '@/hooks/use-viewer-context';
import { convertCurrency } from '@/utils';
import { TableRowContext } from '../context/table-row-context';
import { useCellWidth } from '@/components/table/hooks/use-cell-width';
import { useToggle } from '@/hooks';

type PriceCellProps = {
	onToggleOff: () => void;
};

export const PriceCell = ({ onToggleOff }: PriceCellProps) => {
	const userView = useUserContext();
	const { packItem, onChange, isDragging, formErrors } = useContext(TableRowContext);
	const { packItemPrice = 0 } = packItem || {};
	const { ref, width } = useCellWidth(isDragging);
	const { isToggled, toggle } = useToggle();

	const toggleToEdit = () => !isToggled && toggle();

	const toggleToCell = () => {
		if (isToggled) {
			toggle();
			onToggleOff();
		}
	};

	const handleOnChange = (e: InputEvent) => {
		if (!e.target.value) e.target.value = '0';
		e.target.value = e.target.value.replace(/[^0-9\.-]+/g, '');
		onChange && onChange(e);
	};

	const formattedPrice = convertCurrency(packItemPrice, 'USD').toString();
	const inputPrice = packItemPrice === 0 ? '' : packItemPrice.toString();
	return (
		<Table.Cell
			ref={ref}
			align="center"
			onFocus={toggleToEdit}
			onBlur={toggleToCell}
			style={{ width, padding: '0 1em' }}>
			{userView ? (
				<TableInput
					value={isToggled ? inputPrice : formattedPrice}
					name="packItemPrice"
					placeholder="0"
					onChange={handleOnChange}
					data-invalid={formErrors?.packItemPrice.error}
				/>
			) : (
				<Text align="center">{formattedPrice}</Text>
			)}
		</Table.Cell>
	);
};
