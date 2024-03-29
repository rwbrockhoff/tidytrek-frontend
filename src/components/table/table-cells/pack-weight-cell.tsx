import { SelectEvent, type InputEvent } from '@/types/form-types';
import styled from 'styled-components';
import { useContext } from 'react';
import { Flex, Table, Badge } from '@radix-ui/themes';
import { TableInput } from './table-input';
import { WeightDropdown } from '../table-buttons/weight-dropdown';
import { useUserContext } from '@/hooks/use-viewer-context';
import { TableRowContext } from '../context/table-row-context';
import { useCellWidth } from '@/components/table/hooks/use-cell-width';

type PackWeightCellProps = {
	onToggleOff: () => void;
};

export const PackWeightCell = ({ onToggleOff }: PackWeightCellProps) => {
	const userView = useUserContext();

	const { packItem, onChange, isDragging } = useContext(TableRowContext);
	const { packItemWeight, packItemUnit } = packItem || {};
	const { ref, width } = useCellWidth(isDragging);

	const handleToggleOff = () => userView && onToggleOff();

	const handleOnChange = (e: InputEvent) => {
		if (!e.target.value) e.target.value = '0';
		onChange && onChange(e);
	};

	const handleSelect = (e: SelectEvent) => {
		onChange && onChange(e);
	};

	return (
		<Table.Cell ref={ref} style={{ width }} onBlur={handleToggleOff}>
			{userView ? (
				<Flex display="inline-flex">
					<StyledInput
						value={packItemWeight || ''}
						name={'packItemWeight'}
						placeholder={`0`}
						onChange={handleOnChange}
					/>

					<WeightDropdown unit={packItemUnit || 'oz'} onChange={handleSelect} />
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

const StyledInput = styled(TableInput)`
	padding-right: 0.25em;
	padding-left: 0;
	text-align: right;
`;
