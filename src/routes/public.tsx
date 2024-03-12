// import { lazyImport } from '@/utils/lazy-imports';
import { GuestLayout } from '@/layout/guest-layout';
import { AuthRoutes } from '@/features/auth';
import { Dashboard } from '@/features/dashboard';
import { Profile } from '@/features/profile';

// const { Authentication } = lazyImport(
// 	() => import('@/pages/Authentication/Authentication'),
// 	'Authentication',
// );

export const publicRoutes = [
	{
		path: '/*',
		element: <AuthRoutes />,
	},
	{
		path: '/user/:userId',
		element: <GuestLayout />,
		children: [{ path: '/user/:userId', element: <Profile userView={false} /> }],
	},
	{
		path: '/pk/:packId',
		element: <GuestLayout />,
		children: [{ path: '/pk/:packId', element: <Dashboard userView={false} /> }],
	},
];
