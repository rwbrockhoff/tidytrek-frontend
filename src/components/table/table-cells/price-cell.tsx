import { type InputEvent, type SelectEvent } from '@/types/form-types';
import styled from 'styled-components';
import { useState } from 'react';
import { Table } from '@radix-ui/themes';
import { TableInput } from './table-input';
import { useUserContext } from '@/hooks/use-viewer-context';
import { convertCurrency } from '@/utils';

type PriceCellProps = {
	price: number;
	unit?: string;
	itemName: string;
	placeholder: number;
	onChange: (e: InputEvent | SelectEvent) => void;
	onToggleOff: () => void;
};

export const PriceCell = (props: PriceCellProps) => {
	const userView = useUserContext();
	const { price, itemName, placeholder, onChange, onToggleOff } = props;

	const [toggleInput, setToggleInput] = useState(false);
	const toggleToEdit = () => !toggleInput && setToggleInput(true);
	const toggleToCell = () => {
		if (toggleInput) {
			setToggleInput(false);
			onToggleOff();
		}
	};

	const formattedPrice = convertCurrency(price, 'USD');

	return (
		<Table.Cell
			align="center"
			onMouseOver={toggleToEdit}
			onMouseLeave={toggleToCell}
			onBlur={toggleToCell}
			onClick={toggleToEdit}
			style={{ paddingLeft: '15px' }}>
			{userView ? (
				<TableInput
					value={toggleInput ? price : formattedPrice}
					name={itemName}
					placeholder={`${placeholder}`}
					onChange={onChange}
				/>
			) : (
				<Text>{formattedPrice}</Text>
			)}
		</Table.Cell>
	);
};

const Text = styled.p`
	height: 30px;
	${({ theme: t }) => t.mx.flexCenter()}
	justify-content: flex-start;
	padding-left: 1em;
`;
