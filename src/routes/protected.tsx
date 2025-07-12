import { Navigate } from 'react-router-dom';
import { UserLayout } from '@/layout';
import { lazyImport } from '@/utils';

const { ResetPassword } = lazyImport(() => import('@/features/auth/routes/reset-password'), 'ResetPassword');
const { Welcome } = lazyImport(() => import('../features/auth/routes/welcome'), 'Welcome');
const { ResetSuccess } = lazyImport(() => import('../features/auth/routes/reset-success'), 'ResetSuccess');
import { BubbleError } from '@/components';

const { Dashboard } = lazyImport(() => import('@/features/dashboard'), 'Dashboard');
const { PackEdit } = lazyImport(() => import('@/features/dashboard/'), 'PackEdit');
const { PackItemEdit } = lazyImport(
	() => import('@/features/dashboard/'),
	'PackItemEdit',
);
const { GearCloset } = lazyImport(() => import('@/features/gear-closet'), 'GearCloset');
const { Profile } = lazyImport(() => import('@/features/profile'), 'Profile');
const { AccountRoot } = lazyImport(
	() => import('@/features/account/routes'),
	'AccountRoot',
);
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
			{
				path: '/',
				index: true,
				element: <Dashboard userView={true} key="user-dashboard" />,
			},
			{
				path: '/pack/:packId',
				element: <Dashboard userView={true} key="user-dashboard" />,
			},
			{
				path: '/pack/edit/:packId',
				element: <PackEdit />,
			},
			{
				path: '/pack-item/edit/:packItemId',
				element: <PackItemEdit />,
			},
			{
				path: '/pk/:packId',
				// Force component remount to prevent hook order mismatch between user/guest modes
				element: <Dashboard userView={false} key="guest-dashboard" />,
			},
			{
				path: '/gear-closet',
				element: <GearCloset />,
			},
			{
				path: '/closet-item/edit/:packItemId',
				element: <PackItemEdit />,
			},
			{
				path: '/profile',
				element: <Profile userView={true} key="user-profile" />,
			},
			{
				path: '/user/:userId',
				element: <Profile userView={false} key="guest-profile" />,
			},
			{
				path: '/account',
				element: <AccountRoot />,
				children: [
					{
						path: '/account',
						element: <ProfileSettings />,
					},
					{ path: '/account/settings', element: <AccountSettings /> },
					{
						path: '/account/*',
						index: true,
						element: <Navigate to="/account" />,
					},
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
		path: '/reset-password/*',
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
