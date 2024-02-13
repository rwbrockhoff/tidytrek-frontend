import { Table, Input, Popup, Icon, Button } from 'semantic-ui-react';
import { useState } from 'react';
import './ItemNameCell.css';
import { GripButton } from '../../TableButtons/TableButtons';
import { useUserContext } from '../../../../../views/Dashboard/useUserContext';
import Link from '../../../../../shared/ui/Link';

type OnChange = (
	e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
) => void;

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

type LinkPopupProps = {
	userView: boolean;
	packItemUrl: string;
	displayIcon: boolean;
	onChange: OnChange;
};

const LinkPopup = (props: LinkPopupProps) => {
	const { userView, packItemUrl, displayIcon, onChange } = props;
	if (userView) {
		return (
			<Popup
				on="click"
				pinned
				className="url-popup-container"
				trigger={
					<Button
						className="url-icon-button"
						basic
						size="mini"
						style={{ opacity: displayIcon || packItemUrl ? 100 : 0 }}
						icon={<Icon name="linkify" color={packItemUrl ? 'blue' : 'grey'} />}
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
		);
	} else return null;
};
