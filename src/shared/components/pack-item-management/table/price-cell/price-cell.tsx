import { useMemo } from 'react';
import { type InputEvent } from '@/types/form-types';
import { type BaseTableRowItem } from '@/types/pack-types';
import { type ZodFormErrors } from '@/hooks/form/use-zod-error';
import { type RefObject } from 'react';
import { Text } from '@radix-ui/themes';
import { Table, TextField } from '@/components/alpine';
import { useUserPermissionsContext } from '@/hooks/auth/use-user-permissions-context';
import { useConvertCurrency } from '@/utils';
import { useCellWidth } from '../hooks/use-cell-width';
import { useToggle } from '@/hooks/ui/use-toggle';
import { useTableNavigation } from '@/shared/hooks/pack-item-management/use-table-navigation';

type PriceCellProps = {
	onToggleOff: () => void;
	packItem: BaseTableRowItem;
	onChange: (e: InputEvent) => void;
	isDragging: boolean;
	formErrors: ZodFormErrors<BaseTableRowItem> | null;
	rowRef: RefObject<HTMLElement>;
};

export const PriceCell = ({
	onToggleOff,
	packItem,
	onChange,
	isDragging,
	formErrors,
	rowRef,
}: PriceCellProps) => {
	const { isCreator } = useUserPermissionsContext();
	const convertCurrency = useConvertCurrency();
	const { ref, width } = useCellWidth(isDragging);
	const { isToggled, toggle } = useToggle();
	const { handleKeyDown } = useTableNavigation({ onSave: onToggleOff, rowRef });

	const rawPrice = packItem?.packItemPrice ?? 0;
	// Keep the raw value for input, but convert to number only for currency display
	const packItemPrice =
		typeof rawPrice === 'string' ? parseFloat(rawPrice) || 0 : rawPrice;

	const toggleToEdit = () => !isToggled && toggle();

	const toggleToCell = () => {
		if (isToggled) {
			toggle();
			onToggleOff();
		}
	};

	const handleNumericChange = (e: InputEvent) => {
		const cleanValue = e.target.value.replace(/[^0-9.-]+/g, '');
		e.target.value = cleanValue;
		onChange && onChange(e);
	};

	const formattedPrice = useMemo(
		() => convertCurrency(packItemPrice).toString(),
		[packItemPrice, convertCurrency],
	);

	const inputPrice = useMemo(() => {
		// If rawPrice is a string (during editing), use it directly
		if (typeof rawPrice === 'string') {
			return rawPrice;
		}

		// If it's a number, format it
		if (rawPrice === 0) return '';
		const hasDecimals = rawPrice % 1 !== 0;
		return hasDecimals ? rawPrice.toFixed(2) : rawPrice.toString();
	}, [rawPrice]);

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
					onChange={handleNumericChange}
					onKeyDown={(e) => handleKeyDown(e, 'packItemPrice')}
					data-invalid={formErrors?.packItemPrice.error}
					compact
				/>
			) : (
				<Text align="center">{formattedPrice}</Text>
			)}
		</Table.Cell>
	);
};
