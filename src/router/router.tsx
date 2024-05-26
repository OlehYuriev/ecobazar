import { createBrowserRouter, Navigate } from "react-router-dom";
import LayoutComponent from "@/components/layout/LayoutComponent";
import HomePage from "@/pages/HomePage";
import CheckoutPage from "@/pages/CheckoutPage";
import CategoriesPage from "@/pages/CategoriesPage";
import ProductPage from "@/pages/ProductPage";
import { fetchProduct } from "@/services/fetchProduct";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import DashboardPage from "@/pages/DashboardPage";
import LayoutAccount from "@/components/layout/LayoutAccount";
import SettingPage from "@/pages/SettingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutComponent />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/categories",
        element: <CategoriesPage />,
      },
      {
        path: "/categories/:name",
        element: <ProductPage />,
        loader: fetchProduct,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/account",
    element: <LayoutAccount />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "setting",
        element: <SettingPage />,
      },
    ],
  },

  { path: "*", element: <Navigate to="/" replace={true} /> },
]);

export default router;
