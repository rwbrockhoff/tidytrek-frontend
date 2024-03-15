import { lazyImport } from '@/utils/lazy-imports';
import { GuestLayout } from '@/layout/guest-layout';
import { AuthRoutes } from '@/features/auth';
import { BubbleError } from '@/components';
const { Dashboard } = lazyImport(() => import('@/features/dashboard'), 'Dashboard');
const { Profile } = lazyImport(() => import('@/features/profile'), 'Profile');

export const publicRoutes = [
	{
		path: '/*',
		errorElement: <BubbleError />,
		element: <AuthRoutes />,
	},
	{
		path: '/user/:userId',
		element: <GuestLayout />,
		errorElement: <BubbleError />,
		children: [{ path: '/user/:userId', element: <Profile userView={false} /> }],
	},
	{
		path: '/pk/:packId',
		element: <GuestLayout />,
		errorElement: <BubbleError />,
		children: [{ path: '/pk/:packId', element: <Dashboard userView={false} /> }],
	},
];
