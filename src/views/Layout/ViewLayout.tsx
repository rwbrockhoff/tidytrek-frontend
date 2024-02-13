import Sidebar from '../../components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Icon, Button } from 'semantic-ui-react';

const ViewLayout = () => {
	const [showSidebar, setShowSidebar] = useState(true);

	const handleToggleSidebar = () => setShowSidebar(!showSidebar);

	const conditionalStyles = {
		marginLeft: showSidebar ? '20vw' : '0vw',
		width: showSidebar ? '80vw' : '100vw',
	};

	return (
		<div id="app-view-container">
			<Sidebar showSidebar={showSidebar} />
			<div id="view-component-container" style={conditionalStyles}>
				<SidebarButton onClick={handleToggleSidebar} />
				<Outlet />
			</div>
		</div>
	);
};

const SidebarButton = ({ onClick }: { onClick: () => void }) => {
	return (
		<Button id="sidebar-toggle-button" icon={<Icon name="sidebar" />} onClick={onClick} />
	);
};

export default ViewLayout;
