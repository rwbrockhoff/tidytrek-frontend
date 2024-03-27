import { SelectEvent, type InputEvent } from '@/types/form-types';
import styled from 'styled-components';
import { useContext, useState } from 'react';
import { Flex, Table } from '@radix-ui/themes';
import { TableInput } from './table-input';
import { WeightDropdown } from '../table-buttons/weight-dropdown';
import { useUserContext } from '@/hooks/use-viewer-context';
import { TableRowContext } from '../context/table-row-context';

type PackWeightCellProps = {
	onToggleOff: () => void;
};

export const PackWeightCell = ({ onToggleOff }: PackWeightCellProps) => {
	const { packItem, onChange } = useContext(TableRowContext);
	const { packItemWeight, packItemUnit } = packItem || {};

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
		<Table.Cell
			onMouseOver={toggleToEdit}
			onMouseLeave={toggleToCell}
			onBlur={toggleToCell}
			onClick={toggleToEdit}
			style={{ paddingLeft: userView ? 0 : '38px' }}>
			{userView ? (
				<Flex display="inline-flex" width="100%">
					<StyledInput
						value={packItemWeight || ''}
						name={'packItemWeight'}
						height={'30px'}
						$toggleInput={toggleInput}
						placeholder={`0`}
						onChange={handleOnChange}
					/>

					<WeightDropdown unit={packItemUnit || 'oz'} onChange={handleSelect} />
				</Flex>
			) : (
				<p>{`${packItemWeight}  ${packItemUnit}`}</p>
			)}
		</Table.Cell>
	);
};

const StyledInput = styled(TableInput)<{ $toggleInput: boolean }>`
	width: 55px;
	padding-right: 1em;
	text-align: right;
`;
