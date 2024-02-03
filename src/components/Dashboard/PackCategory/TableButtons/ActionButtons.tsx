import { Table } from 'semantic-ui-react';
import './TableButtons.css';

type ActionButtonsProps = {
	header?: boolean;
	size?: number;
	children: React.ReactNode;
};

const ActionButtons = ({ header, size = 1, children }: ActionButtonsProps) => {
	const ButtonCell = header ? Table.HeaderCell : Table.Cell;
	return (
		<ButtonCell textAlign="center" colSpan={size}>
			{children}
		</ButtonCell>
	);
};

export default ActionButtons;
