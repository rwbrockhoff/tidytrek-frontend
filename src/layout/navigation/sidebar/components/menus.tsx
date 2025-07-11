import { Link } from 'react-router-dom';
import { UserIcon, ClosetIcon, LogoutIcon } from '@/components/ui';
import { StyledMenu } from './styled-menu';

export const AvatarMenu = ({ logout }: { logout: () => void }) => {
	return (
		<StyledMenu>
			<li>
				<Link to="/account">
					<UserIcon size={16} />
					Account
				</Link>
			</li>

			<li onClick={logout}>
				<LogoutIcon size={16} />
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
					<UserIcon size={16} />
					Profile
				</Link>
			</li>
			<li>
				<Link to="/gear-closet">
					<ClosetIcon size={16} />
					Gear Closet
				</Link>
			</li>
		</StyledMenu>
	);
};
