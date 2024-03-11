import { Button, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

export const MobileNavbar = ({ onClick }: { onClick: () => void }) => {
	return (
		<Header>
			<h1>tidytrek</h1>
			<MenuButton icon={<Icon name="sidebar" />} onClick={onClick} />
		</Header>
	);
};

const Header = styled.header`
	display: none;
	${({ theme: t }) => t.mx.mobile(`display: flex`)}
	${({ theme: t }) => t.mx.themeBgColor('tidyPrimary', 'tidy')}
	color: white;
	padding: 3em 2em;
	width: 100%;
	position: fixed;
	z-index: 100;
	-webkit-box-shadow: inset 0px 1px 14px -7px rgba(0, 0, 0, 0.75);
	-moz-box-shadow: inset 0px 1px 14px -7px rgba(0, 0, 0, 0.75);
	box-shadow: inset 0px 1px 14px -7px rgba(0, 0, 0, 0.75);
	button {
		margin-left: auto !important;
	}
`;

const MenuButton = styled(Button)`
	&&& {
		background: transparent;
		color: white;
	}
`;
