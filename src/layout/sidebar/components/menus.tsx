import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaRegUser as UserIcon } from 'react-icons/fa';
import { BiCloset as ClosetIcon } from 'react-icons/bi';
import { MdLogout as LogoutIcon } from 'react-icons/md';

export const AvatarMenu = ({ logout }: { logout: () => void }) => {
	return (
		<Menu>
			<li>
				<Link to="/account">
					<UserIcon />
					Account
				</Link>
			</li>

			<li onClick={logout}>
				<LogoutIcon />
				Log Out
			</li>
		</Menu>
	);
};

export const SidebarMenu = () => {
	return (
		<Menu style={{ marginTop: '2em' }}>
			<li>
				<Link to="/profile">
					<UserIcon />
					Profile
				</Link>
			</li>
			<li>
				<Link to="/gear-closet">
					<ClosetIcon style={{ marginBottom: '-2px' }} />
					Gear Closet
				</Link>
			</li>
		</Menu>
	);
};

const Menu = styled.menu`
	padding-inline-start: 0;
	margin: 0;
	padding: 0 !important;
	a {
		color: black;
		cursor: pointer;
		text-decoration: none;
	}

	li {
		list-style: none;
		cursor: pointer;
		display: flex;
		align-items: center;

		margin: 10px 5px;
		margin-right: 15px;

		:hover {
			opacity: 0.7;
		}

		svg {
			margin-right: 5px;
		}

		${({ theme: t }) =>
			t.mx.mobile(`
				font-size: 1.2rem;
		`)}
	}
`;
