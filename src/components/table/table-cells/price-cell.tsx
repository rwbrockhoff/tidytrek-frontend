import { type InputEvent } from '@/types/form-types';
import styled from 'styled-components';
import { useContext, useState } from 'react';
import { Table } from '@radix-ui/themes';
import { TableInput } from './table-input';
import { useUserContext } from '@/hooks/use-viewer-context';
import { convertCurrency } from '@/utils';
import { TableRowContext } from '../context/table-row-context';

type PriceCellProps = {
	unit?: string;
	onToggleOff: () => void;
};

export const PriceCell = (props: PriceCellProps) => {
	const { packItem, onChange } = useContext(TableRowContext);
	const { packItemPrice = 0 } = packItem || {};
	const { onToggleOff } = props;

	const userView = useUserContext();
	const [toggleInput, setToggleInput] = useState(false);

	const toggleToEdit = () => {
		!toggleInput && setToggleInput(true);
	};

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

	const formattedPrice = convertCurrency(packItemPrice, 'USD');
	const inputPrice = packItemPrice === 0 ? '' : packItemPrice;
	return (
		<Table.Cell
			align="center"
			onBlur={toggleToCell}
			onClick={toggleToEdit}
			style={{ paddingLeft: '15px' }}>
			{userView ? (
				<TableInput
					value={toggleInput ? inputPrice : formattedPrice}
					name="packItemPrice"
					placeholder={'0'}
					onChange={handleOnChange}
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
