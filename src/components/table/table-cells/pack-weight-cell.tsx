import { SelectEvent, type InputEvent } from '@/types/form-types';
import styled from 'styled-components';
import { useContext, useState } from 'react';
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
	const { packItem, onChange, isDragging } = useContext(TableRowContext);
	const { packItemWeight, packItemUnit } = packItem || {};
	const { ref, width } = useCellWidth(isDragging);

	const userView = useUserContext();

	const [toggleInput, setToggleInput] = useState(false);
	const toggleToEdit = () => !toggleInput && setToggleInput(true);
	const toggleToCell = () => {
		if (toggleInput) {
			setToggleInput(false);
			onToggleOff();
		}
	};

	const handleOnChange = (e: InputEvent) => {
		if (!e.target.value) e.target.value = '0';
		onChange && onChange(e);
	};

	const handleSelect = (e: SelectEvent) => {
		onChange && onChange(e);
	};

	return (
		<Table.Cell ref={ref} onBlur={toggleToCell} onFocus={toggleToEdit} style={{ width }}>
			{userView ? (
				<Flex display="inline-flex">
					<StyledInput
						value={packItemWeight || ''}
						name={'packItemWeight'}
						$toggleInput={toggleInput}
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

const StyledInput = styled(TableInput)<{ $toggleInput: boolean }>`
	padding-right: 0.5em;
	text-align: right;
`;
