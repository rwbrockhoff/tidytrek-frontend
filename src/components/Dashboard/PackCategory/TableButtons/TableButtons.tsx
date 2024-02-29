import { Table, Button, Icon, Input } from 'semantic-ui-react';
import styled, { css } from 'styled-components';
import { mobile } from '../../../../shared/mixins/mixins';

type ActionButtonsProps = {
	header?: boolean;
	size?: number;
	children: React.ReactNode;
};

export const ActionButtons = ({ header, size = 1, children }: ActionButtonsProps) => {
	// const ButtonCell = header ? Table.HeaderCell : Table.Cell;
	if (header) {
		return (
			<StyledHeaderCell textAlign="center" colSpan={size}>
				{children}
			</StyledHeaderCell>
		);
	} else {
		return (
			<StyledCell textAlign="center" colSpan={size}>
				{children}
			</StyledCell>
		);
	}
};

const StyledHeaderCell = styled(Table.HeaderCell)`
	&&& {
		${mobile(`
		display: inline-flex;
		border-radius: 0 !important;
		width: fit-content;
		.icon {
			margin-right: 20px !important;
		}
	`)}
	}
`;

const StyledCell = styled(Table.Cell)``;

type MobileToggleProps = {
	onToggle: () => void;
};

export const MobileToggleButton = ({ onToggle }: MobileToggleProps) => {
	return (
		<TableButton onClick={onToggle} $mobileOnly>
			<Icon name="toggle down" />
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
			<Icon name="share" />
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
			<Icon name="trash" />
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
			<Icon name={isMinimized ? 'plus' : 'minus'} />
		</TableButton>
	);
};

export const AddCategoryButton = ({ onClick }: { onClick: () => void }) => {
	return (
		<div>
			<Button color="grey" basic size="small" onClick={onClick}>
				<Icon name="tree" />
				Add Category
			</Button>
		</div>
	);
};

export const GripButton = ({ display }: { display: boolean }) => {
	if (display) {
		return (
			<GripContainer>
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
	&&& {
		${(props) =>
			props.$mobileOnly &&
			css`
				display: none;
				${mobile(`
					display: block;
				`)}
			`}
		background-color: transparent;
		border: none;
		cursor: pointer;
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
		${mobile(`
			opacity: 1;
		`)}
	}
`;

export const TableInput = styled(Input)`
	height: 30px;
`;

const GripContainer = styled.div`
	position: absolute;
	left: -60px;
	opacity: 0.2;
	width: 60px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-left: 15px;
	touch-action: manipulation;
`;
