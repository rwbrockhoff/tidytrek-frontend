import { type InputEvent, type SelectEvent } from '@/types/form-types';
import { useState, useContext } from 'react';
import styled from 'styled-components';
import { TextField } from '@radix-ui/themes';
import { Table } from '@radix-ui/themes';
import { GripButton, MobileToggleButton } from '../../table-buttons';
import { useUserContext } from '@/hooks/use-viewer-context';
import { DisplayLink } from '@/components/ui';
import { LinkPopup } from './link-popup';
import { TableRowContext } from '../../context/table-row-context';

export type OnChange = (e: InputEvent | SelectEvent) => void;

type ItemNameCellProps = {
	displayIcon: boolean;
	dragProps: object;
	onToggleOff: () => void;
	toggleMobileView: () => void;
};

export const ItemNameCell = (props: ItemNameCellProps) => {
	const userView = useUserContext();
	const { packItem, onChange } = useContext(TableRowContext);
	const { packItemName, packItemUrl } = packItem || {};

	const { displayIcon, dragProps } = props;
	const { onToggleOff, toggleMobileView } = props;

	const [toggleInput, setToggleInput] = useState(false);
	const toggleToEdit = () => !toggleInput && setToggleInput(true);
	const toggleToCell = () => {
		if (toggleInput) {
			setToggleInput(false);
			onToggleOff();
		}
	};

	return (
		<StyledCell
			onMouseOver={toggleToEdit}
			onMouseLeave={toggleToCell}
			onBlur={toggleToCell}
			onClick={toggleToEdit}>
			<GripButton display={displayIcon && userView} {...dragProps} />

			{userView ? (
				<TextField.Root>
					<TextField.Input
						value={packItemName || ''}
						name={'packItemName'}
						placeholder={'Name'}
						onChange={onChange}
					/>
					<TextField.Slot>
						<MobileToggleButton onToggle={toggleMobileView} />
						<LinkPopup displayIcon={displayIcon} />
					</TextField.Slot>
				</TextField.Root>
			) : (
				<LinkContainer>
					<DisplayLink url={packItemUrl || ''} text={packItemUrl || ''} showIcon />
				</LinkContainer>
			)}
		</StyledCell>
	);
};

const StyledCell = styled(Table.Cell)`
	position: relative;
	input {
		margin-left: 10px;
		${({ theme: t }) =>
			t.mx.mobile(`
				height: 40px;
			`)}
	}
`;

const LinkContainer = styled.div`
	margin-left: 10px;
`;
