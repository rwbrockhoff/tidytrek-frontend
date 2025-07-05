import { type InputEvent } from '@/types/form-types';
import { type PackItemProperty } from '@/types/pack-types';
import styles from './pack-weight-cell.module.css';
import { useContext } from 'react';
import { Flex, Badge } from '@radix-ui/themes';
import { TextField, Table } from '@/components/ui/alpine';
import { WeightDropdown } from './weight-dropdown';
import { useUserContext } from '@/hooks/use-viewer-context';
import { TableRowContext } from '../../context/table-row-context';
import { useCellWidth } from '@/components/table/hooks/use-cell-width';

type PackWeightCellProps = {
	onToggleOff: () => void;
	onSelect: (property: PackItemProperty) => void;
};

export const PackWeightCell = ({ onToggleOff, onSelect }: PackWeightCellProps) => {
	const userView = useUserContext();

	const { packItem, onChange, isDragging, formErrors } = useContext(TableRowContext);
	const { packItemWeight, packItemUnit } = packItem || {};
	const { ref, width } = useCellWidth(isDragging);

	const handleToggleOff = () => userView && onToggleOff();

	const handleOnChange = (e: InputEvent) => {
		if (!e.target.value) e.target.value = '0';
		onChange && onChange(e);
	};

	const handleWeightUnit = (unit: string) => {
		onChange && onSelect({ packItemUnit: unit });
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
