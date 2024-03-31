import { type User } from '@/types/user-types';
import { createContext } from 'react';
import { Heading } from '@radix-ui/themes';
import { Outlet } from 'react-router-dom';
import { useGetAuth } from '@/hooks';
import { AccountMenu } from '../components/account-menu';

export const UserContext = createContext<{ user: User | null }>({ user: null });

export const Account = () => {
	const { user } = useGetAuth();

	return (
		<main>
			<Heading as="h3" align="center" size="6">
				Account Settings
			</Heading>

			<AccountMenu />

			<UserContext.Provider value={{ user }}>
				<Outlet />
			</UserContext.Provider>
		</main>
	);
};
