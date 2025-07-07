import { Heading } from '@radix-ui/themes';
import { Outlet } from 'react-router-dom';
import { useGetAuth } from '@/hooks';
import { AccountMenu } from '../components/account-menu';
import { UserContext } from '../contexts';
import { PageLayout } from '@/layout/layouts/page-layout/page-layout';

export const Account = () => {
	const { user } = useGetAuth();

	return (
		<PageLayout>
			<Heading as="h3" align="center" size="6" mb="4">
				Account Settings
			</Heading>

			<AccountMenu />

			<UserContext.Provider value={{ user }}>
				<Outlet />
			</UserContext.Provider>
		</PageLayout>
	);
};
