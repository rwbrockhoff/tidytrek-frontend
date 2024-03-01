import { type InputEvent, type SelectEvent } from '../../../../../types/formTypes';
import styled from 'styled-components';
import { Table, Input } from 'semantic-ui-react';
import { useState } from 'react';
import { useUserContext } from '../../../../../views/Dashboard/hooks/useViewerContext';
import useCurrency from '../../../../../utils/useCurrency';
import { flexCenter } from '../../../../../shared/mixins/mixins';

type PriceCellProps = {
	price: number;
	unit?: string;
	itemName: string;
	placeholder: number;
	size: number;
	onChange: (e: InputEvent | SelectEvent) => void;
	onToggleOff: () => void;
};

const PriceCell = (props: PriceCellProps) => {
	const userView = useUserContext();
	const { price, itemName, placeholder, size, onChange, onToggleOff } = props;

	const [toggleInput, setToggleInput] = useState(false);
	const toggleToEdit = () => !toggleInput && setToggleInput(true);
	const toggleToCell = () => {
		if (toggleInput) {
			setToggleInput(false);
			onToggleOff();
		}
	};

	const formattedPrice = useCurrency(price, 'USD');

	return (
		<Table.Cell
			textAlign="center"
			colSpan={size}
			onMouseOver={toggleToEdit}
			onMouseLeave={toggleToCell}
			onBlur={toggleToCell}
			onClick={toggleToEdit}
			style={{ paddingLeft: '25px' }}>
			{userView ? (
				<div>
					<StyledInput
						fluid
						value={toggleInput ? price : formattedPrice}
						name={itemName}
						transparent={!toggleInput}
						placeholder={placeholder}
						onChange={onChange}
						$toggleInput={toggleInput}
					/>
				</div>
			) : (
				<Text>{formattedPrice}</Text>
			)}
		</Table.Cell>
	);
};

export default PriceCell;

const StyledInput = styled(Input)<{ $toggleInput: boolean }>`
	&&& {
		height: 30px;
		padding-left: ${(props) => (props.$toggleInput ? 0 : '13px')};
		max-width: 75px;
		width: 75px;
		input {
			text-align: left;
		}
	}
`;

const Text = styled.p`
	height: 30px;
	${flexCenter}
	justify-content: flex-start;
	padding-left: 13px;
`;
