import { Table, Icon } from 'semantic-ui-react';
import './DeleteButton.css';

type ButtonProps = {
	display: boolean;
	header?: boolean;
	onClickDelete: () => void;
};

const DeleteButton = ({ display, header, onClickDelete }: ButtonProps) => {
	const DeleteButtonCell = header ? Table.HeaderCell : Table.Cell;
	return (
		<DeleteButtonCell className="delete-button" textAlign="center">
			<button onClick={onClickDelete} style={{ opacity: display ? 100 : 0 }}>
				<Icon name="trash" color="grey" />
			</button>
		</DeleteButtonCell>
	);
};

export default DeleteButton;
