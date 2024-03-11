import { UserLayout } from '../layout/user-layout';
import { ResetPassword } from '@/features/auth/routes/reset-password';
import Dashboard from '../pages/dashboard';
import Account from '../pages/Account/Account';
import GearCloset from '../pages/gear-closet';
import { Navigate } from 'react-router-dom';
import AccountSettings from '../pages/Account/AccountSettings/AccountSettings';
import ProfileSettings from '../pages/Account/ProfileSettings/ProfileSettings';
import Profile from '../pages/profile';
import { Welcome } from '../features/auth/routes/welcome';
import ResetSuccess from '../features/auth/components/reset-password/reset-success';

export const protectedRoutes = [
	{
		path: '/',
		element: <UserLayout />,
		children: [{ path: '/', index: true, element: <Dashboard userView={true} /> }],
	},
	{
		path: '/welcome',
		element: <Welcome />,
	},
	{
		path: '/pack/:packId',
		element: <UserLayout />,
		children: [{ path: '/pack/:packId', element: <Dashboard userView={true} /> }],
	},
	{
		path: '/gear-closet',
		element: <UserLayout />,
		children: [{ path: '/gear-closet', element: <GearCloset /> }],
	},
	{
		path: '/profile',
		element: <UserLayout />,
		children: [{ path: '/profile', element: <Profile userView={true} /> }],
	},
	{
		path: '/user/:userId',
		element: <UserLayout />,
		children: [{ path: '/user/:userId', element: <Profile userView={false} /> }],
	},
	{
		path: '/pk/:packId',
		element: <UserLayout />,
		children: [{ path: '/pk/:packId', element: <Dashboard userView={false} /> }],
	},
	{
		path: '/account',
		element: <UserLayout />,
		children: [
			{
				path: '/account',
				element: <Account />,
				children: [
					{
						index: true,
						element: <AccountSettings />,
					},
					{ path: '/account/profile', element: <ProfileSettings /> },
				],
			},
		],
	},
	{
		path: '/reset-password/*',
		element: <ResetPassword />,
	},
	{ path: '/reset-password/success', element: <ResetSuccess /> },
	{ path: '/account/*', index: true, element: <Navigate to="/account" /> },
	{ path: '/*', index: true, element: <Navigate to="/" /> },
];
