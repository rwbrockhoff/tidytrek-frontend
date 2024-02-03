import { Icon } from 'semantic-ui-react';

type ButtonProps = {
	display: boolean;
	header?: boolean;
	onClickDelete: () => void;
};

const DeleteButton = ({ display, onClickDelete }: ButtonProps) => {
	return (
		<button
			className="table-button"
			onClick={onClickDelete}
			style={{ opacity: display ? 100 : 0 }}>
			<Icon name="trash" color="grey" />
		</button>
	);
};

export default DeleteButton;
