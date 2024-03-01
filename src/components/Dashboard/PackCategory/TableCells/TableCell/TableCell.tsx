import { type InputEvent, type SelectEvent } from '../../../../../types/formTypes';
import { Table, Input } from 'semantic-ui-react';
import styled from 'styled-components';
import { useState } from 'react';
import { useUserContext } from '../../../../../views/Dashboard/hooks/useViewerContext';

type TableCellProps = {
	value: string | number;
	itemName: string;
	placeholder?: string;
	size: number;
	onChange: (e: InputEvent | SelectEvent) => void;
	onToggleOff: () => void;
};

const TableCell = (props: TableCellProps) => {
	const userView = useUserContext();
	const { value, itemName, placeholder, size, onChange, onToggleOff } = props;

	const [toggleInput, setToggleInput] = useState(false);
	const display = !toggleInput || !userView;

	const toggleToEdit = () => display && setToggleInput(true);
	const toggleToCell = () => {
		if (!display) {
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
			onClick={toggleToEdit}>
			{userView ? (
				<StyledInput
					value={value || ''}
					name={itemName}
					placeholder={placeholder}
					onChange={onChange}
					transparent={display}
					$display={display}
				/>
			) : (
				<p>{value}</p>
			)}
		</Table.Cell>
	);
};

export default TableCell;

const StyledInput = styled(Input)<{ $display: boolean }>`
	&&& {
		width: 100%;
		height: 30px;
		padding-left: ${({ $display }) => ($display ? '13px' : 0)};
	}
`;
