import { Icon } from 'semantic-ui-react';
import './TableButtons.css';

type MinimizeButtonProps = {
	display: boolean;
	isMinimized: boolean;
	minimize: () => void;
};
const MinimizeButton = ({ display, isMinimized, minimize }: MinimizeButtonProps) => {
	return (
		<button
			className="table-button"
			onClick={minimize}
			style={{ opacity: display ? 100 : 0 }}>
			<Icon name={isMinimized ? 'plus' : 'minus'} color="grey" />
		</button>
	);
};

export default MinimizeButton;
