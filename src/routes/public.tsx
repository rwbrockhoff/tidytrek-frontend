import { lazyImport } from '@/utils/lazy-imports';
import { GuestLayout } from '@/layout';
import { AuthRoutes } from '@/features/auth';
import { BubbleError } from '@/components';
const { Dashboard } = lazyImport(() => import('../features/dashboard'), 'Dashboard');
const { Profile } = lazyImport(() => import('../features/profile'), 'Profile');

const guestRoute = (path: string, element: JSX.Element) => ({
	path,
	element: <GuestLayout showFooter={true} showHeader={true} />,
	errorElement: <BubbleError />,
	children: [{ index: true, element }],
});

export const publicRoutes = [
	guestRoute('/user/:userId', <Profile isCreator={false} />),
	guestRoute('/pk/:packId', <Dashboard isCreator={false} />),
	{
		path: '/*',
		element: <AuthRoutes />,
		errorElement: <BubbleError />,
	},
];
