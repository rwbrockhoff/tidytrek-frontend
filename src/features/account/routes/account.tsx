import { Heading } from '@radix-ui/themes';
import { Outlet } from 'react-router-dom';
import { useGetAuth } from '@/hooks';
import { AccountMenu } from '../components/account-menu';
import { UserContext } from '../contexts';

export const Account = () => {
	const { user } = useGetAuth();

	return (
		<main className="page-layout">
			<Heading as="h3" align="center" size="6" mb="4">
				Account Settings
			</Heading>

			<AccountMenu />

			<UserContext.Provider value={{ user }}>
				<Outlet />
			</UserContext.Provider>
		</main>
	);
};
