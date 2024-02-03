import { Icon } from 'semantic-ui-react';
import './TableButtons.css';

type MinimizeButtonProps = {
	display: boolean;
	minimize: () => void;
};
const MinimizeButton = ({ display, minimize }: MinimizeButtonProps) => {
	return (
		<button
			className="table-button"
			onClick={minimize}
			style={{ opacity: display ? 100 : 0 }}>
			<Icon name="minus" color="grey" />
		</button>
	);
};

export default MinimizeButton;
