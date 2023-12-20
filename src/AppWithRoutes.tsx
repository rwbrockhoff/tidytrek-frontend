import Authentication from "./views/Authentication/Authentication.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootState } from "./redux/store.ts";
import { useSelector } from "react-redux";
import { useFetching } from "./redux/hooks/customHooks.ts";
import App from "./App.tsx";
import { getAuthStatus } from "./redux/slices/userSlice.ts";

const AppWithRoutes = () => {
  useFetching(getAuthStatus);

  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  const userRouter = createBrowserRouter([
    {
      path: "/",
      element: <App />,
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

  return <RouterProvider router={isAuthenticated ? userRouter : guestRouter} />;
};

export default AppWithRoutes;
