import ViewLayout from './ViewLayout';
import GuestPackLayout from './GuestPackLayout';
import Authentication from '../Authentication/Authentication';
import ResetPassword from '../ResetPassword/ResetPassword';
import Dashboard from '../Dashboard/Dashboard';
import Account from '../Account/Account';
import GearCloset from '../GearCloset/GearCloset';
import { Navigate } from 'react-router-dom';
import AccountSettings from '../Account/AccountSettings/AccountSettings';
import ProfileSettings from '../Account/ProfileSettings/ProfileSettings';
import Profile from '../Profile/Profile';

export const userRoutes = [
	{
		path: '/',
		element: <ViewLayout />,
		children: [{ path: '/', index: true, element: <Dashboard userView={true} /> }],
	},
	{
		path: '/pack/:packId',
		element: <ViewLayout />,
		children: [{ path: '/pack/:packId', element: <Dashboard userView={true} /> }],
	},
	{
		path: '/gear-closet',
		element: <ViewLayout />,
		children: [{ path: '/gear-closet', element: <GearCloset /> }],
	},
	{
		path: '/profile',
		element: <ViewLayout />,
		children: [{ path: '/profile', element: <Profile userView={true} /> }],
	},
	{
		path: '/user/:userId',
		element: <ViewLayout />,
		children: [{ path: '/user/:userId', element: <Profile userView={false} /> }],
	},
	{
		path: '/pk/:packId',
		element: <ViewLayout />,
		children: [{ path: '/pk/:packId', element: <Dashboard userView={false} /> }],
	},
	{
		path: '/account',
		element: <ViewLayout />,
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
		path: '/reset-password',
		element: <ResetPassword />,
	},
	{ path: '/account/*', index: true, element: <Navigate to="/account" /> },
	{ path: '/*', index: true, element: <Navigate to="/" /> },
];

export const guestRoutes = [
	{
		path: '/',
		element: <Authentication isRegisterForm={false} />,
	},
	{ path: '/register', element: <Authentication isRegisterForm={true} /> },
	{
		path: '/reset-password',
		element: <ResetPassword />,
	},
	{
		path: '/reset-password/:resetToken',
		element: <ResetPassword />,
	},
	{
		path: '/user/:userId',
		element: <GuestPackLayout />,
		children: [{ path: '/user/:userId', element: <Profile userView={false} /> }],
	},
	{
		path: '/pk/:packId',
		element: <GuestPackLayout />,
		children: [{ path: '/pk/:packId', element: <Dashboard userView={false} /> }],
	},
	{
		path: '/*',
		index: true,
		element: <Authentication isRegisterForm={false} />,
	},
];
