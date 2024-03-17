import { type InputEvent, type SelectEvent } from '@/types/form-types';
import { useState } from 'react';
import styled from 'styled-components';
import { TextField } from '@radix-ui/themes';
import { Table } from '@radix-ui/themes';
import { GripButton, MobileToggleButton } from '../../table-buttons';
import { useUserContext } from '@/hooks/use-viewer-context';
import { DisplayLink } from '@/components/ui';
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
	// const display = !toggleInput || !userView;
	return (
		<StyledCell
			colSpan={size}
			onMouseOver={toggleToEdit}
			onMouseLeave={toggleToCell}
			onBlur={toggleToCell}
			onClick={toggleToEdit}>
			<GripButton display={displayIcon && userView} />

			{userView ? (
				<TextField.Root>
					<TextField.Input
						value={value || ''}
						name={itemName}
						placeholder={placeholder}
						onChange={onChange}
					/>
					<TextField.Slot>
						<MobileToggleButton onToggle={toggleMobileView} />
						<LinkPopup
							userView={userView}
							packItemUrl={packItemUrl}
							displayIcon={displayIcon}
							onChange={onChange}
						/>
					</TextField.Slot>
				</TextField.Root>
			) : (
				<LinkContainer>
					<DisplayLink url={packItemUrl} text={value} showIcon />
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
