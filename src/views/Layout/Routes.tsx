import ViewLayout from './ViewLayout';
import Authentication from '../Authentication/Authentication';
import ResetPassword from '../ResetPassword/ResetPassword';
import Dashboard from '../Dashboard/Dashboard';
import Account from '../Account/Account';
import { Navigate } from 'react-router-dom';

export const userRoutes = [
  {
    path: '/',
    element: <ViewLayout />,
    children: [{ path: '/', index: true, element: <Dashboard /> }],
  },
  {
    path: '/packs/:packId',
    element: <ViewLayout />,
    children: [{ path: '/packs/:packId', element: <Dashboard /> }],
  },
  {
    path: '/account',
    element: <ViewLayout />,
    children: [{ path: '/account', element: <Account /> }],
  },
  { path: '/register', element: <Navigate to="/" /> },
  { path: '/login', element: <Navigate to="/" /> },
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
    path: '/*',
    index: true,
    element: <Authentication isRegisterForm={false} />,
  },
];
