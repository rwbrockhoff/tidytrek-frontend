import { useState } from 'react';
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
	const [hasDecimalInput, setHasDecimalInput] = useState(false);
	const { handleKeyDown } = useTableNavigation({ onSave: onToggleOff, rowRef });

	const toggleToEdit = () => !isToggled && toggle();

	const toggleToCell = () => {
		if (isToggled) {
			toggle();
			setHasDecimalInput(false);
			isCreator && onToggleOff();
		}
	};

	const handleWeightChange = (e: InputEvent) => {
		// set decimal flag based on input change
		const value = e.target.value;
		if (value.includes('.') || hasDecimalInput) {
			setHasDecimalInput(true);
		}
		onChange(e);
	};

	const getDisplayValue = () => {
		// example: shows 3 or 3.5 for pack item weight
		if (packItemWeight === undefined || packItemWeight === null) return '';
		const numericalWeight = Number(packItemWeight);
		if (isNaN(numericalWeight)) return '';
		return numericalWeight.toString();
	};

	const getInputValue = () => {
		if (!isToggled) return getDisplayValue();
		if (hasDecimalInput) return packItemWeight?.toString() || '';
		return getDisplayValue();
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
						inputMode="decimal"
						value={getInputValue()}
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
