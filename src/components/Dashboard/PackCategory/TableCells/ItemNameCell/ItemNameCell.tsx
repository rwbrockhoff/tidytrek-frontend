import { Table, Input } from 'semantic-ui-react';
import { useState } from 'react';
import './ItemNameCell.css';
import { GripButton } from '../../TableButtons/TableButtons';
import { useUserContext } from '../../../../../views/Dashboard/hooks/useUserContext';
import Link from '../../../../../shared/ui/Link';
import { InputEvent, SelectEvent } from '../../../../../shared/formHelpers';
import LinkPopup from './LinkPopup';

export type OnChange = (e: InputEvent | SelectEvent) => void;

type ItemNameCellProps = {
	value: string;
	itemName: string;
	placeholder?: string;
	size: number;
	displayIcon: boolean;
	packItemUrl: string;
	onChange: OnChange;
	onToggleOff: () => void;
};

const ItemNameCell = (props: ItemNameCellProps) => {
	const userView = useUserContext();

	const {
		value,
		itemName,
		placeholder,
		size,
		packItemUrl,
		displayIcon,
		onChange,
		onToggleOff,
	} = props;
	const [toggleInput, setToggleInput] = useState(false);
	const toggleToEdit = () => !toggleInput && setToggleInput(true);
	const toggleToCell = () => {
		if (toggleInput) {
			setToggleInput(false);
			onToggleOff();
		}
	};
	const display = !toggleInput || !userView;
	return (
		<Table.Cell
			colSpan={size}
			className="item-name-cell"
			onMouseOver={toggleToEdit}
			onMouseLeave={toggleToCell}
			onBlur={toggleToCell}
			onClick={toggleToEdit}>
			<GripButton display={displayIcon && userView} />

			{userView ? (
				<Input
					className="item-name-input"
					value={value || ''}
					name={itemName}
					placeholder={placeholder}
					onChange={onChange}
					transparent={display}
					fluid
					style={{
						paddingLeft: display ? '13px' : '0px',
						paddingRight: '10px',
					}}>
					<input />
					<LinkPopup
						userView={userView}
						packItemUrl={packItemUrl}
						displayIcon={displayIcon}
						onChange={onChange}
					/>
				</Input>
			) : (
				<Link url={packItemUrl} text={value} className="item-name-text" showIcon />
			)}
		</Table.Cell>
	);
};

export default ItemNameCell;
