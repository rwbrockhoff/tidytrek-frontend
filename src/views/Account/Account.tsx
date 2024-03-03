import { useGetAuthStatusQuery } from '../../queries/userQueries';
import { Header } from 'semantic-ui-react';
import { Outlet } from 'react-router-dom';
import { createContext } from 'react';
import { User } from '../../types/userTypes';
import AccountMenu from '../../components/Account/AccountMenu/AccountMenu';

export const UserContext = createContext<{ user: User | null }>({ user: null });

const Account = () => {
	const { data } = useGetAuthStatusQuery();
	const user = data?.user || null;

	return (
		<div>
			<Header as="h3" textAlign="center">
				User Settings
			</Header>

			<AccountMenu />

			<UserContext.Provider value={{ user }}>
				<Outlet />
			</UserContext.Provider>
		</div>
	);
};

export default Account;
