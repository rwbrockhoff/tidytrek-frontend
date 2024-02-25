import { Table, Button, Icon } from 'semantic-ui-react';
import './TableButtons.css';

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
		<button
			className="table-button"
			onClick={onToggle}
			style={{ opacity: display ? 100 : 0 }}>
			<Icon name="share" color="grey" />
		</button>
	);
};

type ButtonProps = {
	display: boolean;
	onClickDelete: () => void;
};

export const DeleteButton = ({ display, onClickDelete }: ButtonProps) => {
	return (
		<button
			className="table-button"
			onClick={onClickDelete}
			style={{ opacity: display ? 100 : 0 }}>
			<Icon name="trash" color="grey" />
		</button>
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
		<button
			className="table-button"
			onClick={minimize}
			style={{ opacity: display ? 100 : 0 }}>
			<Icon name={isMinimized ? 'plus' : 'minus'} color="grey" />
		</button>
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
			<div className="grip-icon">
				<i className="fa-solid fa-grip-vertical" />
			</div>
		);
	} else return null;
};
