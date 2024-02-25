import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';

export const AvatarMenu = ({ logout }: { logout: () => void }) => {
	return (
		<Menu>
			<li>
				<Link to="/account">
					<Icon name="user outline" />
					Account
				</Link>
			</li>

			<li onClick={logout}>
				<Icon name="log out" />
				Log Out
			</li>
		</Menu>
	);
};

export const SidebarMenu = () => {
	return (
		<Menu>
			<li>
				<Link to="/gear-closet">
					<Icon name="archive" />
					Gear Closet
				</Link>
			</li>
		</Menu>
	);
};

const Menu = styled.menu`
	padding-inline-start: 0;

	a {
		color: black;
		cursor: pointer;
		text-decoration: none;
	}

	li {
		list-style: none;
		cursor: pointer;
		margin: 15px 0px;
		margin-right: 30px;
		:hover {
			opacity: 0.7;
		}
		@media only screen and (max-width: 768px) {
			font-size: 1.2em;
		}
	}
`;
