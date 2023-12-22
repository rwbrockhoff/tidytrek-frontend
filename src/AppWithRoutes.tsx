import Authentication from "./views/Authentication/Authentication.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootState } from "./redux/store.ts";
import { useSelector } from "react-redux";
import { useFetching } from "./redux/hooks/customHooks.ts";
import Dashboard from "./views/Dashboard/Dashboard.tsx";
import Account from "./views/Account/Account.tsx";
import { getAuthStatus } from "./redux/slices/userSlice.ts";
import ViewLayout from "./ViewLayout.tsx";

const AppWithRoutes = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  useFetching(getAuthStatus);

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
  return isLoading ? (
    <ViewLayout />
  ) : (
    <div style={{ height: "100vh" }}>
      <RouterProvider router={availableRouter} />
    </div>
  );
};

export default AppWithRoutes;
