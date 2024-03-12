import { type User } from '@/types/user-types';
import { createContext } from 'react';
import { useGetAuthStatusQuery } from '@/queries/user-queries';
import { Header } from 'semantic-ui-react';
import { Outlet } from 'react-router-dom';
import { AccountMenu } from '../components/account-menu';

export const UserContext = createContext<{ user: User | null }>({ user: null });

export const Account = () => {
	const { data } = useGetAuthStatusQuery();
	const user = data?.user || null;

	return (
		<main>
			<Header as="h3" textAlign="center">
				User Settings
			</Header>

			<AccountMenu />

			<UserContext.Provider value={{ user }}>
				<Outlet />
			</UserContext.Provider>
		</main>
	);
};
