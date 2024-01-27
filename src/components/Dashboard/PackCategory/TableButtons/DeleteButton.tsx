import { Table, Icon } from 'semantic-ui-react';
import './DeleteButton.css';

type ButtonProps = {
	display: boolean;
	size: number;
	header?: boolean;
	moveItemEnabled?: boolean;
	onClickToggle: () => void;
	onClickDelete: () => void;
};

const DeleteButton = (props: ButtonProps) => {
	const { size, header, display, moveItemEnabled, onClickToggle, onClickDelete } = props;

	return header ? (
		<Table.HeaderCell className="delete-button" textAlign="center" colSpan={size}>
			<button onClick={onClickDelete} style={{ opacity: display ? 100 : 0 }}>
				<Icon name="trash" color="grey" />
			</button>
		</Table.HeaderCell>
	) : (
		<Table.Cell className="delete-button" textAlign="center" colSpan={size}>
			{moveItemEnabled && (
				<button onClick={onClickToggle} style={{ opacity: display ? 100 : 0 }}>
					<Icon name="share" color="grey" />
				</button>
			)}
			<button onClick={onClickDelete} style={{ opacity: display ? 100 : 0 }}>
				<Icon name="trash" color="grey" />
			</button>
		</Table.Cell>
	);
};

export default DeleteButton;
