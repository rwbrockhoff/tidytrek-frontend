import { useMemo } from 'react';
import { type InputEvent } from '@/types/form-types';
import { type BaseTableRowItem } from '@/types/pack-types';
import { type ZodFormErrors } from '@/hooks/form/use-zod-error';
import { type RefObject } from 'react';
import { Text } from '@radix-ui/themes';
import { Table, TextField } from '@/components/alpine';
import { usePermissions } from '@/hooks/auth/use-permissions';
import { useConvertCurrency } from '@/utils';
import { usePackDetails } from '@/hooks/pack/use-pack-details';
import { useCellWidth } from '../hooks/use-cell-width';
import { useToggle } from '@/hooks/ui/use-toggle';
import { useTableNavigation } from '@/shared/hooks/pack-item-management/use-table-navigation';
import { cn } from '@/styles/utils';
import tableStyles from '../table-main/table.module.css';

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
	const { isCreator } = usePermissions();
	const { currency } = usePackDetails();
	const convertCurrency = useConvertCurrency(currency);
	const { isToggled, toggle } = useToggle();

	const { ref, width } = useCellWidth(isDragging);
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
			className={cn(
				tableStyles.priceColumn,
				isCreator ? tableStyles.priceColumnText : tableStyles.priceColumnGuestView,
			)}
			onFocus={toggleToEdit}
			onBlur={toggleToCell}
			style={{ width }}>
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
					collapsibleError
				/>
			) : (
				<Text align="center">{formattedPrice}</Text>
			)}
		</Table.Cell>
	);
};
