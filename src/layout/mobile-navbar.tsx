import { Heading, Button } from '@radix-ui/themes';
import { AiOutlineMenu } from 'react-icons/ai';

import styled from 'styled-components';

export const MobileNavbar = ({ onClick }: { onClick: () => void }) => {
	return (
		<Header>
			<Heading as="h1" size="8">
				tidytrek
			</Heading>
			<MenuButton onClick={onClick} size="4">
				<AiOutlineMenu />
			</MenuButton>
		</Header>
	);
};

const Header = styled.header`
	display: none;
	${({ theme: t }) => t.mx.themeBgColor('tidyPrimary', 'tidy')}
	color: white;
	padding: 2.5em 2em;
	width: 100%;
	position: fixed;
	z-index: 100;
	-webkit-box-shadow: inset 0px 1px 14px -7px rgba(0, 0, 0, 0.75);
	-moz-box-shadow: inset 0px 1px 14px -7px rgba(0, 0, 0, 0.75);
	box-shadow: inset 0px 1px 14px -7px rgba(0, 0, 0, 0.75);
	button {
		margin-left: auto !important;
	}
	// width 90% for Radix scaling
	${({ theme: t }) =>
		t.mx.mobile(`
			display: flex;
			width: 90%;
	`)}
`;

const MenuButton = styled(Button)`
	background: transparent;
	color: white;
`;
