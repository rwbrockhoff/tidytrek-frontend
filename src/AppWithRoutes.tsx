import Authentication from "./views/Authentication/Authentication.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootState } from "./redux/store.ts";
import { useSelector } from "react-redux";
import { useFetching } from "./redux/hooks/customHooks.ts";
import Dashboard from "./views/Dashboard/Dashboard.tsx";
import Navigation from "./components/Navigation/Navigation.tsx";
import { getAuthStatus } from "./redux/slices/userSlice.ts";

const AppWithRoutes = () => {
  useFetching(getAuthStatus);

  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const isLoading = useSelector((state: RootState) => state.user.authLoading);

  const userRouter = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
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

  return isLoading ? (
    <h3>Loading...</h3>
  ) : (
    <div style={{ height: "100vh" }}>
      {isAuthenticated && <Navigation />}
      <RouterProvider router={isAuthenticated ? userRouter : guestRouter} />
    </div>
  );
};

export default AppWithRoutes;
