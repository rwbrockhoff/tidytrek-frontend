import styled, { css } from 'styled-components';
import Sidebar from '../components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Icon, Button } from 'semantic-ui-react';
import { mobile } from '../shared/mixins/mixins';

const UserViewLayout = () => {
	const [showSidebar, setShowSidebar] = useState(true);

	const handleToggleSidebar = () => setShowSidebar(!showSidebar);

	return (
		<OuterContainer>
			<AppViewContainer>
				<Sidebar showSidebar={showSidebar} onToggle={handleToggleSidebar} />
				<ViewLayoutContainer $showSidebar={showSidebar}>
					<SidebarButton isSidebar={false} onClick={handleToggleSidebar} />
					<Outlet />
				</ViewLayoutContainer>
			</AppViewContainer>
		</OuterContainer>
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

const OuterContainer = styled.div`
	width: 100%;
	${({ theme: t }) => t.mx.themeBgColor('tidyBg', 'tidy')}
	height: 100%;
	overflow-y: scroll;
	${mobile(`overflow-y: auto;`)}
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
			padding: 3em 1em 3em 1em;
	`)}
`;

export default UserViewLayout;
