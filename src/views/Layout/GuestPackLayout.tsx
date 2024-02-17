import { Outlet } from 'react-router-dom';

const GuestPackLayout = () => {
	return (
		<div id="app-view-container">
			<div id="guest-view-container">
				<Outlet />
			</div>
		</div>
	);
};

export default GuestPackLayout;
