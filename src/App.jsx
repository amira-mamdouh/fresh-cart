import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Products from "./Components/Products/Products";
import NotFound from "./Components/NotFound/NotFound";
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/Categories/Categories";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";

export default function App() {
  const routing = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Register /> },
        { path: "/products", element: <Products /> },
        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
        { path: "/forgotPassword", element: <ForgotPassword /> },
        { path: "/cart", element: <Cart /> },
        { path: "/categories", element: <Categories /> },
        { path: "/brands", element: <Categories /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routing} />
    </>
  );
}
