import { Table, Icon } from 'semantic-ui-react';

type MoveButtonProps = {
	display: boolean;
	onToggle: () => void;
};
const MoveItemButton = ({ display, onToggle }: MoveButtonProps) => {
	return (
		<Table.Cell className="delete-button" textAlign="center" colSpan={1}>
			<button onClick={onToggle} style={{ opacity: display ? 100 : 0 }}>
				<Icon name="share" color="grey" />
			</button>
		</Table.Cell>
	);
};

export default MoveItemButton;
