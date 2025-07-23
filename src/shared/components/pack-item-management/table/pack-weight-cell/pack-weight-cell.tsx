import { useState } from 'react';
import { type InputEvent } from '@/types/form-types';
import { type PackItemProperty, type BaseTableRowItem } from '@/types/pack-types';
import { type ZodFormErrors } from '@/hooks/form/use-zod-error';
import styles from './pack-weight-cell.module.css';
import { Badge } from '@radix-ui/themes';
import { Flex } from '@/components/layout';
import { TextField, Table } from '@/components/alpine';
import { WeightDropdown } from './weight-dropdown';
import { useUserContext } from '@/hooks/auth/use-user-context';
import { useCellWidth } from '../hooks/use-cell-width';
import { useToggle } from '@/hooks/ui/use-toggle';

type PackWeightCellProps = {
	onToggleOff: () => void;
	onSelect: (property: PackItemProperty) => void;
	packItem: BaseTableRowItem;
	onChange: (e: InputEvent) => void;
	isDragging: boolean;
	formErrors: ZodFormErrors<BaseTableRowItem> | null;
};

export const PackWeightCell = ({
	onToggleOff,
	onSelect,
	packItem,
	onChange,
	isDragging,
	formErrors,
}: PackWeightCellProps) => {
	const userView = useUserContext();
	const { packItemWeight, packItemUnit } = packItem || {};
	const { ref, width } = useCellWidth(isDragging);
	const { isToggled, toggle } = useToggle();
	const [hasDecimalInput, setHasDecimalInput] = useState(false);

	const toggleToEdit = () => !isToggled && toggle();

	const toggleToCell = () => {
		if (isToggled) {
			toggle();
			setHasDecimalInput(false);
			userView && onToggleOff();
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

	const handleWeightUnit = (unit: string) => {
		onSelect({ packItemUnit: unit });
	};

	return (
		<Table.Cell ref={ref} style={{ width }} onFocus={toggleToEdit} onBlur={toggleToCell}>
			{userView ? (
				<Flex className="inline-flex items-baseline gap-1">
					<TextField.Standalone
						variant="minimal"
						className={styles.input}
						inputMode="decimal"
						value={getInputValue()}
						name={'packItemWeight'}
						placeholder={`0`}
						onChange={handleWeightChange}
						data-invalid={formErrors?.packItemWeight.error}
					/>

					<WeightDropdown unit={packItemUnit || 'oz'} onChange={handleWeightUnit} />
				</Flex>
			) : (
				<Flex className="justify-center">
					<Badge
						radius="large"
						color="gray"
						highContrast>{`${getDisplayValue() || 0}  ${packItemUnit}`}</Badge>
				</Flex>
			)}
		</Table.Cell>
	);
};
