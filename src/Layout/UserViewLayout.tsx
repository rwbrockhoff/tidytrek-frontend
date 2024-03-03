import styled from 'styled-components';
import Sidebar from '../components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import MobileHeader from './MobileHeader';
import SidebarButton from '../components/Sidebar/SidebarButton/SidebarButton';

const UserViewLayout = () => {
	const [showSidebar, setShowSidebar] = useState(true);

	const handleToggleSidebar = () => setShowSidebar(!showSidebar);

	return (
		<OuterContainer>
			<AppViewContainer>
				<MobileHeader onClick={handleToggleSidebar} />
				<Sidebar showSidebar={showSidebar} onToggle={handleToggleSidebar} />
				<ViewLayoutContainer $showSidebar={showSidebar}>
					<SidebarButton isSidebar={false} onClick={handleToggleSidebar} />
					<Outlet />
				</ViewLayoutContainer>
			</AppViewContainer>
		</OuterContainer>
	);
};

const OuterContainer = styled.div`
	width: 100%;
	height: 100%;
	overflow-y: scroll;
	${({ theme: t }) => t.mx.themeBgColor('tidyBg', 'tidy')}
	${({ theme: t }) => t.mx.mobile(`overflow-y: auto;`)}
`;

const AppViewContainer = styled.div`
	${({ theme: t }) => t.mx.themeBgColor('tidyBg', 'tidy')}
	min-height: 100%;
	max-width: 1280px;
	width: 100%;
	margin: 0 auto;
	position: relative;
	display: flex;
`;

const ViewLayoutContainer = styled.div<{ $showSidebar: boolean }>`
	width: ${(props) => (props.$showSidebar ? '80%' : '100%')};
	margin-left: ${(props) => (props.$showSidebar ? '250px' : '0%')};
	min-height: 100%;
	${({ theme: t }) => t.mx.themeBgColor('tidyBg', 'tidy')}
	position: relative;
	padding: 3em 4em 6em 4em;
	transition: all 500ms ease;
	transition-property: margin-left, width;
	${({ theme: t }) =>
		t.mx.mobile(`
			width: 100%;
			margin: 0;
			padding: 10em 1em 3em 1em;
	`)}
`;

export default UserViewLayout;
