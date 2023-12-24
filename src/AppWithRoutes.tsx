import Authentication from "./views/Authentication/Authentication.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppDispatch, RootState } from "./redux/store.ts";
import { useSelector, useDispatch } from "react-redux";
import Dashboard from "./views/Dashboard/Dashboard.tsx";
import Account from "./views/Account/Account.tsx";
import { getAuthStatus } from "./redux/slices/userSlice.ts";
import ViewLayout from "./ViewLayout.tsx";
import { useEffect, useRef } from "react";

const AppWithRoutes = () => {
  const dispatch: AppDispatch = useDispatch();
  const appInit = useRef(false);

  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  useEffect(() => {
    if (!appInit || !isAuthenticated) {
      dispatch(getAuthStatus());
      appInit.current = true;
    }
  }, [dispatch, isAuthenticated]);

  const isLoading = useSelector((state: RootState) => state.user.authLoading);

  const userRouter = createBrowserRouter([
    {
      path: "/",
      element: <ViewLayout />,
      children: [
        { path: "/", element: <Dashboard /> },
        { path: "/account", element: <Account /> },
      ],
    },
    { path: "/register", element: <Authentication isRegisterForm={true} /> },
  ]);

  const guestRouter = createBrowserRouter([
    {
      path: "/",
      element: <Authentication isRegisterForm={false} />,
    },
    { path: "/register", element: <Authentication isRegisterForm={true} /> },
  ]);

  const availableRouter = isAuthenticated ? userRouter : guestRouter;

  return isLoading && !appInit.current ? (
    <ViewLayout />
  ) : (
    <div style={{ height: "100vh" }}>
      <RouterProvider router={availableRouter} />
    </div>
  );
};

export default AppWithRoutes;
