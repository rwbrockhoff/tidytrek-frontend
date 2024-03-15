import { type User } from '@/types/user-types';
import { createContext } from 'react';
import { Header } from 'semantic-ui-react';
import { Outlet } from 'react-router-dom';
import { useGetAuth } from '@/hooks';
import { AccountMenu } from '../components/account-menu';

export const UserContext = createContext<{ user: User | null }>({ user: null });

export const Account = () => {
	const { user } = useGetAuth();

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
