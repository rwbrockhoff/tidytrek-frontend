import { Table, Input } from 'semantic-ui-react';
import styled from 'styled-components';
import { useState } from 'react';
import WeightDropdown from '../../TableButtons/WeightDropdown';
import '../TableCell/TableCell.css';
import { useUserContext } from '../../../../../views/Dashboard/hooks/useViewerContext';
import { type InputEvent, type SelectEvent } from '../../../../../shared/formHelpers';

type PackWeightCellProps = {
	weight: string | number;
	unit: string;
	itemName: string;
	placeholder: number;
	size: number;
	onChange: (e: InputEvent | SelectEvent) => void;
	onToggleOff: () => void;
};

const PackWeightCell = (props: PackWeightCellProps) => {
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
						transparent={!toggleInput}
						$toggleInput={toggleInput}
						placeholder={placeholder}
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

export default PackWeightCell;

const CellContainer = styled.div`
	display: inline-flex;
	width: 100px;
`;

const StyledInput = styled(Input)<{ $toggleInput: boolean }>`
	&&& {
		width: 55px;
		height: 35px;
		padding-right: ${(props) => (props.$toggleInput ? 0 : '13px')};
		input {
			text-align: right;
		}
	}
`;
