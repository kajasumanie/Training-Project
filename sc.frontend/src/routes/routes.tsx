import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import UnauthorizedLayout from "../layouts/UnauthorizedLayout";
import ProtectedRoute from "./ProtectedRoute";

const Home = lazy(() => import("../features/home/Home"));
const Products = lazy(() => import("../features/products/Products"));
const Orders = lazy(() => import("../features/orders/Orders"));
const Login = lazy(() => import("../features/login/Login"));
const Checkout = lazy(() => import("../features/checkout/Checkout"));

export default function AppRoutes() {
  return useRoutes([
    {
      element: <ProtectedRoute element={<DashboardLayout />} />,
      children: [
        { path: "/", element: <Home /> },
        { path: "products", element: <Products /> },
        { path: "orders", element: <Orders /> },
        { path: "checkout", element: <Checkout /> },
      ],
    },
    {
      element: <UnauthorizedLayout />,
      children: [
        { path: "home", element: <Home /> },
        { path: "login", element: <Login /> }
      ],
    },
  ]);
}
