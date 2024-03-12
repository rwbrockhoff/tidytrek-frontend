import { MenuItem, Menu } from 'semantic-ui-react';
import { Link } from '@/components/ui';
import { useLocation } from 'react-router-dom';

export const AccountMenu = () => {
	const { pathname } = useLocation();
	const link = { account: '/account', profile: '/account/profile' };
	return (
		<Menu secondary>
			<MenuItem active={pathname === link.account}>
				<Link link={link.account}>Account</Link>
			</MenuItem>

			<MenuItem active={pathname === link.profile}>
				<Link link={link.profile}>Profile</Link>
			</MenuItem>
		</Menu>
	);
};
