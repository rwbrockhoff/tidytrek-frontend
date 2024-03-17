import { type InputEvent, type SelectEvent } from '@/types/form-types';
import styled from 'styled-components';
import { useState } from 'react';
import { Table } from '@radix-ui/themes';
import { TableInput } from './table-input';
import { WeightDropdown } from '../table-buttons/weight-dropdown';
import { useUserContext } from '@/hooks/use-viewer-context';

type PackWeightCellProps = {
	weight: string | number;
	unit: string;
	itemName: string;
	placeholder: number;
	size: number;
	onChange: (e: InputEvent | SelectEvent) => void;
	onToggleOff: () => void;
};

export const PackWeightCell = (props: PackWeightCellProps) => {
	const userView = useUserContext();
	const { weight, unit, itemName, placeholder, size, onChange, onToggleOff } = props;
	const [toggleInput, setToggleInput] = useState(false);
	const toggleToEdit = () => !toggleInput && setToggleInput(true);
	const toggleToCell = () => {
		if (toggleInput) {
			setToggleInput(false);
			onToggleOff();
		}
	};

	return (
		<Table.Cell
			colSpan={size}
			onMouseOver={toggleToEdit}
			onMouseLeave={toggleToCell}
			onBlur={toggleToCell}
			onClick={toggleToEdit}
			style={{ paddingLeft: userView ? 0 : '38px' }}>
			{userView ? (
				<CellContainer>
					<StyledInput
						value={weight || ''}
						name={itemName}
						height={'30px'}
						$toggleInput={toggleInput}
						placeholder={`${placeholder}`}
						onChange={onChange}
					/>

					<WeightDropdown unit={unit} onChange={onChange} />
				</CellContainer>
			) : (
				<p>{`${weight}  ${unit}`}</p>
			)}
		</Table.Cell>
	);
};

const CellContainer = styled.div`
	display: inline-flex;
	width: 100px;
`;

const StyledInput = styled(TableInput)<{ $toggleInput: boolean }>`
	width: 55px;
	padding-right: 1em;
	text-align: right;
`;
