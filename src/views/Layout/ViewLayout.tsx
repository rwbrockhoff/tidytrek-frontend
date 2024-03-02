import styled, { css } from 'styled-components';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Icon, Button } from 'semantic-ui-react';

const ViewLayout = () => {
	const [showSidebar, setShowSidebar] = useState(true);

	const handleToggleSidebar = () => setShowSidebar(!showSidebar);

	return (
		<AppViewContainer>
			<Sidebar showSidebar={showSidebar} onToggle={handleToggleSidebar} />
			<ViewLayoutContainer $showSidebar={showSidebar}>
				<SidebarButton isSidebar={false} onClick={handleToggleSidebar} />
				<Outlet />
			</ViewLayoutContainer>
		</AppViewContainer>
	);
};

type SidebarButtonProps = {
	onClick: () => void;
	isSidebar: boolean;
};

export const SidebarButton = ({ onClick, isSidebar }: SidebarButtonProps) => {
	return (
		<StyledButton
			icon={<Icon name="sidebar" />}
			$isSidebar={isSidebar}
			onClick={onClick}
		/>
	);
};

const StyledButton = styled(Button)<{ $isSidebar: boolean }>`
	&&& {
		opacity: 0.4;
		background-color: transparent;

		${(props) =>
			props.$isSidebar &&
			css`
				color: white;
				position: absolute;
				right: 25px;
				opacity: 0.8;
			`};
	}
`;

const AppViewContainer = styled.div`
	${({ theme: t }) => t.mx.themeBgColor('tidyBg', 'tidy')}
	height: 100%;
	overflow: hidden;
	box-sizing: border-box;
`;

const ViewLayoutContainer = styled.div<{ $showSidebar: boolean }>`
	width: ${(props) => (props.$showSidebar ? '80%' : '100%')};
	height: 100%;
	overflow: auto;
	margin-left: ${(props) => (props.$showSidebar ? '20%' : '0%')};
	position: relative;
	padding-left: 4vw;
	padding-right: 4vw;
	padding-bottom: 10vh;
	padding-top: 5vh;
	transition: all 500ms ease;
	transition-property: margin-left, width;

	${({ theme: t }) =>
		t.mx.mobile(`
			width: 100%;
			margin-left: 0;
	`)}
`;

export default ViewLayout;
