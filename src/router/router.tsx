/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import LayoutComponent from "@/components/layout/LayoutComponent";
import LayoutAccount from "@/components/layout/LayoutAccount";

import { fetchProduct } from "@/services/fetchProduct";
import { fetchOrder } from "@/services/fetchOrder";

const HomePage = lazy(() => import("@/pages/HomePage"));
const CheckoutPage = lazy(() => import("@/pages/CheckoutPage"));
const CategoriesPage = lazy(() => import("@/pages/CategoriesPage"));
const ProductPage = lazy(() => import("@/pages/ProductPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const SettingPage = lazy(() => import("@/pages/SettingPage"));
const OrderPage = lazy(() => import("@/pages/OrderPage"));
const ShoppingCartPage = lazy(() => import("@/pages/ShoppingCartPage"));
const OrderItemPage = lazy(() => import("@/pages/OrderItemPage"));
const WishlistPage = lazy(() => import("@/pages/WishlistPage"));

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
        path: "order",
        element: <OrderPage />,
      },
      {
        path: "order/:idOrder",
        element: <OrderItemPage />,
        loader: fetchOrder,
      },
      {
        path: "setting",
        element: <SettingPage />,
      },
      {
        path: "shoppingCart",
        element: <ShoppingCartPage />,
      },
      {
        path: "wishlist",
        element: <WishlistPage />,
      },
    ],
  },

  { path: "*", element: <Navigate to="/" replace={true} /> },
]);

export default router;
