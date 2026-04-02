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

/**
 * Application Routes
 * Public routes: Home, Products (browsing without login)
 * Protected routes: Orders (user-specific), Checkout (requires login)
 */
export default function AppRoutes() {
  return useRoutes([
    {
      element: <DashboardLayout />,
      children: [
        // Public routes - no login required
        { path: "/", element: <Home /> },
        { path: "products", element: <Products /> },
        
        // Protected routes - login required
        { path: "orders", element: <ProtectedRoute element={<Orders />} /> },
        { path: "checkout", element: <ProtectedRoute element={<Checkout />} /> },
      ],
    },
    {
      element: <UnauthorizedLayout />,
      children: [
        { path: "login", element: <Login /> }
      ],
    },
  ]);
}
