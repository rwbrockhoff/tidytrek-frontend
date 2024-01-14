import ViewLayout from './ViewLayout';
import Authentication from '../Authentication/Authentication';
import Dashboard from '../Dashboard/Dashboard';
import Account from '../Account/Account';

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
  { path: '/register', element: <Authentication isRegisterForm={true} /> },
];

export const guestRoutes = [
  {
    path: '/',
    element: <Authentication isRegisterForm={false} />,
  },
  { path: '/register', element: <Authentication isRegisterForm={true} /> },
  {
    path: '/*',
    index: true,
    element: <Authentication isRegisterForm={false} />,
  },
];
