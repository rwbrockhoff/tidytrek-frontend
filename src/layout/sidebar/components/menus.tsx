import { Link } from 'react-router-dom';
import { FaRegUser as UserIcon } from 'react-icons/fa';
import { BiCloset as ClosetIcon } from 'react-icons/bi';
import { MdLogout as LogoutIcon } from 'react-icons/md';
import { StyledMenu } from './styled-menu';

export const AvatarMenu = ({ logout }: { logout: () => void }) => {
	return (
		<StyledMenu $darkText>
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
		</StyledMenu>
	);
};

export const SidebarMenu = () => {
	return (
		<StyledMenu style={{ marginTop: '2em' }}>
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
		</StyledMenu>
	);
};
