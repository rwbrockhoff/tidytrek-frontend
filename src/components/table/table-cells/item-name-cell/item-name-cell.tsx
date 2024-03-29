import { type InputEvent, type SelectEvent } from '@/types/form-types';
import { useState, useContext } from 'react';
import styled from 'styled-components';
import { Box, TextField } from '@radix-ui/themes';
import { Table } from '@radix-ui/themes';
import { GripButton, MobileToggleButton } from '../../table-buttons';
import { useUserContext } from '@/hooks/use-viewer-context';
import { DisplayLink } from '@/components/ui';
import { LinkPopup } from './link-popup';
import { TableRowContext } from '../../context/table-row-context';
import { useCellWidth } from '@/components/table/hooks/use-cell-width';

export type OnChange = (e: InputEvent | SelectEvent) => void;

type ItemNameCellProps = {
	displayIcon: boolean;
	dragProps: object;
	onToggleOff: () => void;
	toggleMobileView: () => void;
};

export const ItemNameCell = (props: ItemNameCellProps) => {
	const userView = useUserContext();
	const { packItem, onChange, isDragging } = useContext(TableRowContext);
	const { packItemName, packItemUrl } = packItem || {};
	const { ref, width } = useCellWidth(isDragging);

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
			ref={ref}
			onMouseOver={toggleToEdit}
			onMouseLeave={toggleToCell}
			onBlur={toggleToCell}
			onClick={toggleToEdit}
			style={{ width }}>
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
				<Box ml="2">
					<DisplayLink url={packItemUrl || ''} text={packItemUrl || ''} showIcon />
				</Box>
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
