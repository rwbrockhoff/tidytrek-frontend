import styled, { css } from 'styled-components';
import { Flex, Table, Button } from '@radix-ui/themes';
import {
	PlusIcon,
	MinusIcon,
	TrashIcon,
	CaretDownIcon,
	ShareIcon,
} from '@/components/ui';

type ActionButtonsProps = {
	header?: boolean;
	size?: number;
	children: React.ReactNode;
};

export const ActionButtons = ({ header, size = 1, children }: ActionButtonsProps) => {
	// const ButtonCell = header ? Table.HeaderCell : Table.Cell;
	if (header) {
		return (
			<StyledHeaderCell align="center" colSpan={size}>
				{children}
			</StyledHeaderCell>
		);
	} else {
		return (
			<Table.Cell align="center" colSpan={size}>
				{children}
			</Table.Cell>
		);
	}
};

const StyledHeaderCell = styled(Table.ColumnHeaderCell)`
	${({ theme: t }) =>
		t.mx.mobile(`
			display: inline-flex;
			border-radius: 0 !important;
			width: fit-content;
			.icon {
				margin-right: 10px !important;
			}
	`)}
`;

type MobileToggleProps = {
	onToggle: () => void;
};

export const MobileToggleButton = ({ onToggle }: MobileToggleProps) => {
	return (
		<TableButton
			onClick={onToggle}
			$mobileOnly
			$marginLeft="15px"
			style={{ fontSize: '1.1em' }}>
			<CaretDownIcon />
		</TableButton>
	);
};

type MoveButtonProps = {
	display: boolean;
	onToggle: () => void;
};

export const MoveItemButton = ({ display, onToggle }: MoveButtonProps) => {
	return (
		<TableButton onClick={onToggle} $display={display}>
			<ShareIcon />
		</TableButton>
	);
};

type ButtonProps = {
	display: boolean;
	onClickDelete: () => void;
};

export const DeleteButton = ({ display, onClickDelete }: ButtonProps) => {
	return (
		<TableButton onClick={onClickDelete} $display={display} $marginLeft="15px">
			<TrashIcon />
		</TableButton>
	);
};

type MinimizeButtonProps = {
	display: boolean;
	isMinimized: boolean;
	minimize: () => void;
};

export const MinimizeButton = ({
	display,
	isMinimized,
	minimize,
}: MinimizeButtonProps) => {
	return (
		<TableButton onClick={minimize} $display={display}>
			{isMinimized ? <PlusIcon /> : <MinusIcon />}
		</TableButton>
	);
};

export const AddCategoryButton = ({ onClick }: { onClick: () => void }) => {
	return (
		<Button variant="outline" color="gray" size="2" radius="medium" onClick={onClick}>
			<PlusIcon />
			Add Category
		</Button>
	);
};

export const GripButton = ({ display }: { display: boolean }) => {
	if (display) {
		return (
			<GripContainer align="center" justify="center">
				<i className="fa-solid fa-grip-vertical" />
			</GripContainer>
		);
	} else return null;
};

export const TableButton = styled(Button)<{
	$display?: boolean;
	$marginLeft?: string;
	$mobileOnly?: boolean;
}>`
	${(props) =>
		props.$mobileOnly &&
		css`
			display: none;
			${({ theme: t }) =>
				t.mx.mobile(`
					display: block;
				`)}
		`}
	background-color: transparent;
	border: none;
	cursor: pointer;
	color: grey;
	margin: 0px 0px;
	margin-left: ${({ $marginLeft }) => ($marginLeft ? $marginLeft : 0)};
	opacity: ${({ $display }) => ($display ? 1 : 0)};
	padding: 5px;
	icon:hover {
		color: black;
	}
	input {
		height: 30px;
	}
	${({ theme: t }) =>
		t.mx.mobile(`
			opacity: 1;
		`)}
`;

const GripContainer = styled(Flex)`
	position: absolute;
	left: -60px;
	opacity: 0.2;
	width: 60px;
	height: 30px;
	margin-left: 15px;
	touch-action: manipulation;
`;
