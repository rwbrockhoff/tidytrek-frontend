import { Link } from 'react-router-dom';
import { UserIcon, LogoutIcon } from '@/components/ui';
import { StyledMenu } from './styled-menu/styled-menu';

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
