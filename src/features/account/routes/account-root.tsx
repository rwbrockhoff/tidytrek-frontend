import { Heading } from '@radix-ui/themes';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { AccountMenu } from '../components';
import { PageLayout } from '@/layout/layouts/page-layout/page-layout';
import { AccountSkeleton } from '../components/account-skeleton';

export const AccountRoot = () => {
	return (
		<PageLayout>
			<Heading as="h3" align="center" size="6" mb="4">
				Account Settings
			</Heading>

			<AccountMenu />

			<Suspense fallback={<AccountSkeleton />}>
				<Outlet />
			</Suspense>
		</PageLayout>
	);
};
