import { Outlet } from 'react-router-dom';

const GuestPackLayout = () => {
	return (
		<div id="app-view-container">
			<div id="view-component-container">
				<Outlet />
			</div>
		</div>
	);
};

export default GuestPackLayout;
