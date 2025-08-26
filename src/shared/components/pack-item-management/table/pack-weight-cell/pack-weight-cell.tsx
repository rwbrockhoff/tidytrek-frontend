import { type InputEvent } from '@/types/form-types';
import {
	type PackItemProperty,
	type BaseTableRowItem,
	WeightUnit,
} from '@/types/pack-types';
import { type ZodFormErrors } from '@/hooks/form/use-zod-error';
import styles from './pack-weight-cell.module.css';
import { Text } from '@radix-ui/themes';
import { Flex } from '@/components/layout';
import { TextField, Table } from '@/components/alpine';
import { WeightDropdown } from './weight-dropdown';
import { usePermissions } from '@/hooks/auth/use-permissions';
import { useUserWeightUnit } from '@/hooks/ui/use-user-weight-unit';
import { useTableNavigation } from '@/shared/hooks/pack-item-management/use-table-navigation';
import { useToggle } from '@/hooks/ui/use-toggle';
import { type RefObject } from 'react';
import { cn } from '@/styles/utils';
import tableStyles from '../table-main/table.module.css';

type PackWeightCellProps = {
	onToggleOff: () => void;
	onSelect: (property: PackItemProperty) => void;
	packItem: BaseTableRowItem;
	onChange: (e: InputEvent) => void;
	formErrors: ZodFormErrors<BaseTableRowItem> | null;
	rowRef: RefObject<HTMLElement>;
};

export const PackWeightCell = ({
	onToggleOff,
	onSelect,
	packItem,
	onChange,
	formErrors,
	rowRef,
}: PackWeightCellProps) => {
	const { isCreator } = usePermissions();
	const defaultWeightUnit = useUserWeightUnit({ unitMode: 'small' });
	const { packItemWeight, packItemWeightUnit } = packItem || {};
	const { isToggled, toggle } = useToggle();
	const { handleKeyDown } = useTableNavigation({ onSave: onToggleOff, rowRef });

	const toggleToEdit = () => !isToggled && toggle();

	const toggleToCell = () => {
		if (isToggled) {
			toggle();
			isCreator && onToggleOff();
		}
	};

	const handleWeightChange = (e: InputEvent) => {
		let cleanValue = e.target.value.replace(/[^0-9.]+/g, '');
		// Ensure only one decimal point
		const parts = cleanValue.split('.');
		if (parts.length > 2) {
			cleanValue = parts[0] + '.' + parts.slice(1).join('');
		}
		e.target.value = cleanValue;
		onChange(e);
	};

	const rawWeight = packItemWeight ?? 0;
	const numericalWeight =
		typeof rawWeight === 'string' ? parseFloat(rawWeight) || 0 : rawWeight;

	const getDisplayValue = () => {
		// Keep string as-is during editing
		if (typeof rawWeight === 'string' && rawWeight !== '') {
			return rawWeight;
		}

		if (numericalWeight === 0) return '';

		// Keeps decimals: 12.5 stays "12.5", not "12.50"
		return numericalWeight.toString();
	};

	const getInputValue = () => {
		if (typeof rawWeight === 'string') return rawWeight;

		if (numericalWeight === 0) return '';
		return numericalWeight.toString();
	};

	const handleWeightUnit = (unit: WeightUnit) => {
		onSelect({ packItemWeightUnit: unit });
	};

	return (
		<Table.Cell
			className={cn(
				tableStyles.weightColumn,
				!isCreator && tableStyles.weightColumnGuestView,
			)}
			onFocus={toggleToEdit}
			onBlur={toggleToCell}>
			{isCreator ? (
				<Flex className="inline-flex items-baseline gap-3">
					<TextField.Standalone
						variant="minimal"
						compact
						className={styles.input}
						value={isToggled ? getInputValue() : getDisplayValue()}
						name={'packItemWeight'}
						placeholder={`0`}
						onChange={handleWeightChange}
						onKeyDown={(e) => handleKeyDown(e, 'packItemWeight')}
						data-invalid={formErrors?.packItemWeight.error}
						collapsibleError
					/>

					<WeightDropdown
						unit={packItemWeightUnit || defaultWeightUnit}
						onChange={handleWeightUnit}
					/>
				</Flex>
			) : (
				<Flex className="gap-1 items-baseline">
					<Text>{getDisplayValue() || 0}</Text>
					<span className={styles.weightUnitGuestView}>{packItemWeightUnit}</span>
				</Flex>
			)}
		</Table.Cell>
	);
};
