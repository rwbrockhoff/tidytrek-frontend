import { lazyImport } from '@/utils/lazy-imports';
import { AdaptiveLayout } from '@/layout';
import { BubbleError } from '@/components';
import { AuthRedirect } from './auth-redirect';

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
	// Welcome route is public & private for onboarding flow
	{ path: '/welcome/*', element: <Welcome />, errorElement: <BubbleError /> },
	{
		element: <AuthRedirect />,
		errorElement: <BubbleError />,
		children: [
			{ path: '/login', element: <Login /> },
			{ path: '/register', element: <Register /> },
			{ path: '/reset-password/*', element: <ResetPassword /> },
			{ path: '/reset-password/success', element: <ResetSuccess /> },
			{ path: '/*', element: <Login /> },
		],
	},
];
