import { MenuItem as SemMenuItem, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const AccountMenu = () => {
	const { pathname } = useLocation();
	const link = { account: '/account', profile: '/account/profile' };
	return (
		<Menu secondary>
			<MenuItem active={pathname === link.account}>
				<Link to={link.account}>Account</Link>
			</MenuItem>

			<MenuItem active={pathname === link.profile}>
				<Link to={link.profile}>Profile</Link>
			</MenuItem>
		</Menu>
	);
};

export default AccountMenu;

const MenuItem = styled(SemMenuItem)`
	&&&& {
		color: red;
	}
`;
