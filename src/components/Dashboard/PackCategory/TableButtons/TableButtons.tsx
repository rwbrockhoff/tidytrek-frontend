import { Table, Button, Icon, Input } from 'semantic-ui-react';
import styled from 'styled-components';

type ActionButtonsProps = {
	header?: boolean;
	size?: number;
	children: React.ReactNode;
};

export const ActionButtons = ({ header, size = 1, children }: ActionButtonsProps) => {
	const ButtonCell = header ? Table.HeaderCell : Table.Cell;
	return (
		<ButtonCell textAlign="center" colSpan={size}>
			{children}
		</ButtonCell>
	);
};

type MoveButtonProps = {
	display: boolean;
	onToggle: () => void;
};

export const MoveItemButton = ({ display, onToggle }: MoveButtonProps) => {
	return (
		<TableButton onClick={onToggle} style={{ opacity: display ? 100 : 0 }}>
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
		<TableButton onClick={onClickDelete} style={{ opacity: display ? 100 : 0 }}>
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
		<TableButton onClick={minimize} style={{ opacity: display ? 100 : 0 }}>
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

export const TableButton = styled(Button)`
	&&& {
		background-color: transparent;
		border: none;
		cursor: pointer;
		margin: 0px 0px;
		padding: 5px;
		icon:hover {
			color: black;
		}
		input {
			height: 30px;
		}
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
