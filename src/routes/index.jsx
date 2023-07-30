import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Logout from "../pages/Logout";
import Institutions from "../pages/Institutions";
import Wrapper from "../components/Wrapper";

const Routes = () => {
  const { token } = useAuth();

  const routesForPublic = [];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "",
          element: <Institutions />,
        },
        {
          path: "/profile",
          element: <div>User Profile</div>,
        },
        {
          path: "/logout",
          element: <Logout />,
        },
      ],
    },
  ];

  const routesForNotAuthenticated = [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/",
      element: <Login />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(token ? routesForAuthenticatedOnly : []),
    ...routesForNotAuthenticated,
  ]);

  // Provide the router configuration using RouterProvider
  return (
    <Wrapper>
      <RouterProvider router={router} />
    </Wrapper>
  );
};

export default Routes;
