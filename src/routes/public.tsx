import { lazyImport } from '@/utils/lazy-imports';
import { AdaptiveLayout } from '@/layout';
import { BubbleError } from '@/components';

const { Dashboard } = lazyImport(() => import('../features/dashboard'), 'Dashboard');
const { Profile } = lazyImport(() => import('../features/profile'), 'Profile');
const { Login } = lazyImport(() => import('../features/auth/routes/login'), 'Login');
const { Register } = lazyImport(
	() => import('../features/auth/routes/register'),
	'Register',
);
const { ResetPassword } = lazyImport(
	() => import('../features/auth/routes/reset-password'),
	'ResetPassword',
);
const { ResetSuccess } = lazyImport(
	() => import('../features/auth/routes/reset-success'),
	'ResetSuccess',
);
const { Welcome } = lazyImport(
	() => import('../features/auth/routes/welcome'),
	'Welcome',
);

const guestRoute = (path: string, element: React.ReactNode) => ({
	path,
	element: <AdaptiveLayout showHeader={true} showFooter={true} />,
	errorElement: <BubbleError />,
	children: [{ index: true, element }],
});

export const publicRoutes = [
	guestRoute('/u/:userId', <Profile isCreator={false} />),
	guestRoute('/pk/:packId', <Dashboard isCreator={false} />),
	{ path: '/login', element: <Login />, errorElement: <BubbleError /> },
	{ path: '/register', element: <Register />, errorElement: <BubbleError /> },
	{
		path: '/reset-password/*',
		element: <ResetPassword />,
		errorElement: <BubbleError />,
	},
	{
		path: '/reset-password/success',
		element: <ResetSuccess />,
		errorElement: <BubbleError />,
	},
	{ path: '/welcome/*', element: <Welcome />, errorElement: <BubbleError /> },
	{ path: '/*', element: <Login />, errorElement: <BubbleError /> },
];
