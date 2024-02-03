import { Icon } from 'semantic-ui-react';
import './TableButtons.css';

type MoveButtonProps = {
	display: boolean;
	onToggle: () => void;
};
const MoveItemButton = ({ display, onToggle }: MoveButtonProps) => {
	return (
		<button
			className="table-button"
			onClick={onToggle}
			style={{ opacity: display ? 100 : 0 }}>
			<Icon name="share" color="grey" />
		</button>
	);
};

export default MoveItemButton;
