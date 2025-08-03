import { useMemo } from 'react';
import { type InputEvent } from '@/types/form-types';
import { type BaseTableRowItem } from '@/types/pack-types';
import { type ZodFormErrors } from '@/hooks/form/use-zod-error';
import { Text } from '@radix-ui/themes';
import { Table, TextField } from '@/components/alpine';
import { useUserPermissionsContext } from '@/hooks/auth/use-user-permissions-context';
import { useConvertCurrency } from '@/utils';
import { useCellWidth } from '../hooks/use-cell-width';
import { useToggle } from '@/hooks/ui/use-toggle';

type PriceCellProps = {
	onToggleOff: () => void;
	packItem: BaseTableRowItem;
	onChange: (e: InputEvent) => void;
	isDragging: boolean;
	formErrors: ZodFormErrors<BaseTableRowItem> | null;
};

export const PriceCell = ({
	onToggleOff,
	packItem,
	onChange,
	isDragging,
	formErrors,
}: PriceCellProps) => {
	const { isCreator } = useUserPermissionsContext();
	const convertCurrency = useConvertCurrency();
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
		e.target.value = e.target.value.replace(/[^0-9.-]+/g, '');
		onChange && onChange(e);
	};

	const formattedPrice = useMemo(
		() => convertCurrency(packItemPrice).toString(),
		[packItemPrice, convertCurrency],
	);

	const inputPrice = packItemPrice === 0 ? '' : packItemPrice.toString();
	return (
		<Table.Cell
			ref={ref}
			textAlign="center"
			onFocus={toggleToEdit}
			onBlur={toggleToCell}
			style={{ width, padding: '0 var(--space-4)' }}>
			{isCreator ? (
				<TextField.Standalone
					variant="minimal"
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
