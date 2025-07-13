import { type InputEvent } from '@/types/form-types';
import { type PackItemProperty, type BaseTableRowItem } from '@/types/pack-types';
import { type ZodFormErrors } from '@/hooks/form/use-zod-error';
import styles from './pack-weight-cell.module.css';
import { Flex, Badge } from '@radix-ui/themes';
import { TextField, Table } from '@/components/alpine';
import { WeightDropdown } from './weight-dropdown';
import { useUserContext } from '@/hooks/auth/use-user-context';
import { useCellWidth } from '@/components/table/hooks/use-cell-width';

type PackWeightCellProps = {
	onToggleOff: () => void;
	onSelect: (property: PackItemProperty) => void;
	packItem: BaseTableRowItem;
	onChange: (e: InputEvent) => void;
	isDragging: boolean;
	formErrors: ZodFormErrors<any> | null;
};

export const PackWeightCell = ({ 
	onToggleOff, 
	onSelect, 
	packItem, 
	onChange, 
	isDragging, 
	formErrors 
}: PackWeightCellProps) => {
	const userView = useUserContext();
	const { packItemWeight, packItemUnit } = packItem || {};
	const { ref, width } = useCellWidth(isDragging);

	const handleToggleOff = () => userView && onToggleOff();

	const handleOnChange = (e: InputEvent) => {
		if (!e.target.value) e.target.value = '0';
		onChange(e);
	};

	const handleWeightUnit = (unit: string) => {
		onSelect({ packItemUnit: unit });
	};

	return (
		<Table.Cell ref={ref} style={{ width }} onBlur={handleToggleOff}>
			{userView ? (
				<Flex display="inline-flex" align="baseline" gap="1">
					<TextField.Standalone
						variant="minimal"
						className={styles.input}
						value={packItemWeight?.toString() || ''}
						name={'packItemWeight'}
						placeholder={`0`}
						onChange={handleOnChange}
						data-invalid={formErrors?.packItemWeight.error}
					/>

					<WeightDropdown unit={packItemUnit || 'oz'} onChange={handleWeightUnit} />
				</Flex>
			) : (
				<Flex justify="center">
					<Badge
						radius="large"
						color="gray"
						highContrast>{`${packItemWeight}  ${packItemUnit}`}</Badge>
				</Flex>
			)}
		</Table.Cell>
	);
};
