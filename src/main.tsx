import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "semantic-ui-css/semantic.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Authentication from "./views/Authentication/Authentication.tsx";

const isAuthenticated: boolean = false;

const router = createBrowserRouter([
  {
    path: "/",
    element: isAuthenticated ? (
      <App />
    ) : (
      <Authentication isRegisterForm={false} />
    ),
  },
  { path: "/register", element: <Authentication isRegisterForm={true} /> },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} />
  </>
);
