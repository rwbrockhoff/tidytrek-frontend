import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppDispatch, RootState } from '../../redux/store.ts';
import { useSelector, useDispatch } from 'react-redux';
import { getAuthStatus } from '../../redux/slices/userSlice.ts';
import ViewLayout from './ViewLayout.tsx';
import { useEffect, useRef } from 'react';
import { userRoutes, guestRoutes } from './Routes.tsx';

const AppWithRoutes = () => {
  const dispatch: AppDispatch = useDispatch();
  const appInit = useRef(false);

  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated,
  );
  const isLoading = useSelector((state: RootState) => state.user.authLoading);

  useEffect(() => {
    if (!appInit || !isAuthenticated) {
      dispatch(getAuthStatus());
      appInit.current = true;
    }
  }, [dispatch, isAuthenticated]);

  const appRouter = createBrowserRouter(
    isAuthenticated ? userRoutes : guestRoutes,
  );

  return isLoading && !appInit.current ? (
    <ViewLayout />
  ) : (
    <div style={{ height: '100vh' }}>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default AppWithRoutes;
