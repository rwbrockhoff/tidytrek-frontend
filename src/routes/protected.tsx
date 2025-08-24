import { Navigate } from 'react-router-dom';
import { UserLayout } from '@/layout';
import { lazyImport } from '@/utils';
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
	() => import('@/features/account/routes/account-root'),
	'AccountRoot',
);
const { AccountSettings } = lazyImport(
	() => import('@/features/account/routes/account-settings'),
	'AccountSettings',
);
const { ProfileSettings } = lazyImport(
	() => import('@/features/account/routes/profile-settings'),
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
				element: <Dashboard isCreator={true} />,
			},
			{
				path: '/pack/:packId',
				element: <Dashboard isCreator={true} />,
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
				path: '/gear-closet',
				element: <GearCloset />,
			},
			{
				path: '/closet-item/edit/:packItemId',
				element: <PackItemEdit />,
			},
			{
				path: '/profile',
				element: <Profile isCreator={true} />,
			},
			{
				path: '/u/:userId',
				element: <Profile isCreator={false} />,
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
];
