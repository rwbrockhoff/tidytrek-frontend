import { type InputEvent, type SelectEvent } from '../../../../types/formTypes';
import { Table, Input } from 'semantic-ui-react';
import { useState } from 'react';
import styled from 'styled-components';
import { GripButton, MobileToggleButton } from '../../table-buttons/table-buttons';
import { useUserContext } from '../../../../features/dashboard/hooks/useViewerContext';
import { DisplayLink } from '../../../ui/Link';
import { LinkPopup } from './link-popup';

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
	toggleMobileView: () => void;
};

export const ItemNameCell = (props: ItemNameCellProps) => {
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
		toggleMobileView,
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
					<MobileToggleButton onToggle={toggleMobileView} />
					<LinkPopup
						userView={userView}
						packItemUrl={packItemUrl}
						displayIcon={displayIcon}
						onChange={onChange}
					/>
				</Input>
			) : (
				<LinkContainer>
					<DisplayLink url={packItemUrl} text={value} showIcon />
				</LinkContainer>
			)}
		</StyledCell>
	);
};

const StyledCell = styled(Table.Cell)`
	&&& {
		position: relative;
		input {
			height: 30px;
			margin-left: 10px;
			${({ theme: t }) =>
				t.mx.mobile(`
				height: 40px;
				margin-left: 10px;
			`)}
		}
	}
`;

const LinkContainer = styled.div`
	margin-left: 20px;
`;
