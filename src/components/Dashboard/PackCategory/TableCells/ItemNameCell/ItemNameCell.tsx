import { Table, Input } from 'semantic-ui-react';
import { useState } from 'react';
import styled from 'styled-components';
import { GripButton } from '../../TableButtons/TableButtons';
import { useUserContext } from '../../../../../views/Dashboard/hooks/useViewerContext';
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
		<StyledCell
			colSpan={size}
			onMouseOver={toggleToEdit}
			onMouseLeave={toggleToCell}
			onBlur={toggleToCell}
			onClick={toggleToEdit}>
			<GripButton display={displayIcon && userView} />

			{userView ? (
				<Input
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
				<LinkContainer>
					<Link url={packItemUrl} text={value} showIcon />
				</LinkContainer>
			)}
		</StyledCell>
	);
};

export default ItemNameCell;

const StyledCell = styled(Table.Cell)`
	&&& {
		position: relative;
		input {
			height: 30px;
			margin-left: 10px;
		}
	}
`;

const LinkContainer = styled.div`
	margin-left: 20px;
`;
