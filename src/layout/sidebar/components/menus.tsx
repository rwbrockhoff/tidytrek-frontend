import { Link } from 'react-router-dom';
import { UserIcon, ClosetIcon } from '@/components/ui';
import { MdLogout as LogoutIcon } from 'react-icons/md';
import { StyledMenu } from './styled-menu';

export const AvatarMenu = ({ logout }: { logout: () => void }) => {
	return (
		<StyledMenu>
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
		<StyledMenu className="styledMenuWithTopMargin">
			<li>
				<Link to="/profile">
					<UserIcon />
					Profile
				</Link>
			</li>
			<li>
				<Link to="/gear-closet">
					<ClosetIcon />
					Gear Closet
				</Link>
			</li>
		</StyledMenu>
	);
};
