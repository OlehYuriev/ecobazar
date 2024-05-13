import { createBrowserRouter, Navigate } from "react-router-dom";
import LayoutComponent from "@/components/layout/LayoutComponent";
import HomePage from "@/pages/HomePage";
import CheckoutPage from "@/pages/CheckoutPage";
import CategoriesPage from "@/pages/CategoriesPage";

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
    ],
  },

  { path: "*", element: <Navigate to="/" replace={true} /> },
]);

export default router;
