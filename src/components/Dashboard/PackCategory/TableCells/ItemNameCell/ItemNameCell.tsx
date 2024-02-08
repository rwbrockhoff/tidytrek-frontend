import { Table, Input, Popup, Icon } from 'semantic-ui-react';
import { useState } from 'react';
import './ItemNameCell.css';
import { GripButton } from '../../TableButtons/TableButtons';
import { useUserContext } from '../../../../../views/Dashboard/useUserContext';

type ItemNameCellProps = {
	value: string | number;
	itemName: string;
	placeholder?: string;
	size: number;
	displayIcon: boolean;
	packItemUrl: string;
	onChange: (
		e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
	) => void;
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
			disabled={!userView}
			onMouseOver={toggleToEdit}
			onMouseLeave={toggleToCell}
			onBlur={toggleToCell}
			onClick={toggleToEdit}>
			<GripButton display={displayIcon && userView} />

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
					paddingRight: '35px',
				}}
			/>
			{userView && (
				<Popup
					on="click"
					pinned
					className="url-popup-container"
					trigger={
						<Icon
							name="linkify"
							className="url-link-icon"
							color={packItemUrl ? 'blue' : 'grey'}
							style={{ opacity: displayIcon || packItemUrl ? 100 : 0 }}
						/>
					}>
					<Input
						name="packItemUrl"
						value={packItemUrl ?? ''}
						onChange={onChange}
						placeholder="Item link"
						className="url-save-input"
					/>
				</Popup>
			)}
		</Table.Cell>
	);
};

export default ItemNameCell;
