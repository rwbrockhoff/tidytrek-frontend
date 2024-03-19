import { Navigate } from 'react-router-dom';
import { UserLayout } from '../layout/user-layout';
import { ResetPassword } from '@/features/auth/routes/reset-password';
import { Welcome } from '../features/auth/routes/welcome';
import { ResetSuccess } from '../features/auth/routes/reset-success';
import { lazyImport } from '@/utils';
import { BubbleError } from '@/components/error-boundary';

const { Dashboard } = lazyImport(() => import('@/features/dashboard'), 'Dashboard');
const { GearCloset } = lazyImport(() => import('@/features/gear-closet'), 'GearCloset');
const { Profile } = lazyImport(() => import('@/features/profile'), 'Profile');
const { Account } = lazyImport(() => import('@/features/account/routes'), 'Account');
const { AccountSettings } = lazyImport(
	() => import('@/features/account/routes'),
	'AccountSettings',
);
const { ProfileSettings } = lazyImport(
	() => import('@/features/account/routes'),
	'ProfileSettings',
);

export const protectedRoutes = [
	{
		path: '/',
		element: <UserLayout />,
		errorElement: <BubbleError />,
		children: [
			{ path: '/', index: true, element: <Dashboard userView={true} /> },
			{
				path: '/pack/:packId',
				element: <Dashboard userView={true} />,
			},
			{
				path: '/pk/:packId',
				element: <Dashboard userView={false} />,
			},
			{
				path: '/gear-closet',
				element: <GearCloset />,
			},
			{
				path: '/profile',
				element: <Profile userView={true} />,
			},
			{
				path: '/user/:userId',
				element: <Profile userView={false} />,
			},
			{
				path: '/account',
				element: <Account />,
				children: [
					{
						path: '/account',
						element: <AccountSettings />,
					},
					{ path: '/account/profile', element: <ProfileSettings /> },
					{ path: '/account/*', index: true, element: <Navigate to="/account" /> },
				],
			},
			{
				path: '/*',
				index: true,
				element: <Navigate to="/" />,
			},
		],
	},
	{
		path: '/reset-password',
		element: <ResetPassword />,
		errorElement: <BubbleError />,
	},
	{
		path: '/reset-password/success',
		element: <ResetSuccess />,
		errorElement: <BubbleError />,
	},
	{
		path: '/welcome',
		element: <Welcome />,
		errorElement: <BubbleError />,
	},
];
