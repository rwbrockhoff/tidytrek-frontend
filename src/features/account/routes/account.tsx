import { Heading } from '@radix-ui/themes';
import { Outlet } from 'react-router-dom';
import { AccountMenu } from '../components/account-menu';
import { PageLayout } from '@/layout/layouts/page-layout/page-layout';

export const Account = () => {
	return (
		<PageLayout>
			<Heading as="h3" align="center" size="6" mb="4">
				Account Settings
			</Heading>

			<AccountMenu />

			<Outlet />
		</PageLayout>
	);
};
