import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Products from "./Components/Products/Products";
import NotFound from "./Components/NotFound/NotFound";
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/Categories/Categories";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import VerifyResetCode from "./Components/VerifyResetCode/VerifyResetCode";
import UpdateUserData from "./Components/UpdateUserData/UpdateUserData";
import { AuthContextProvider } from "./Context/AuthContext";

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
        { path: "/verifyResetCode", element: <VerifyResetCode /> },
        { path: "/updateData", element: <UpdateUserData /> },
        { path: "/cart", element: <Cart /> },
        { path: "/categories", element: <Categories /> },
        { path: "/brands", element: <Categories /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={routing} />
      </AuthContextProvider>
    </>
  );
}
