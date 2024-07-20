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
import Brands from "./Components/Brands/Brands";
import ProtectedRoute from "./Components/Guard/Guard";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import Payment from "./Components/Payment/Payment";

const routing = createBrowserRouter([
  {
    path: "/fresh-cart/",
    element: <Layout />,
    children: [
      { index: true, element: <Register /> },
      {
        path: "/fresh-cart/products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "/fresh-cart/productDetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      { path: "/fresh-cart/register", element: <Register /> },
      { path: "/fresh-cart/login", element: <Login /> },
      { path: "/fresh-cart/forgotPassword", element: <ForgotPassword /> },
      { path: "/fresh-cart/verifyResetCode", element: <VerifyResetCode /> },

      { path: "/fresh-cart/updateData", element: <UpdateUserData /> },
      { path: "/fresh-cart/payment", element: <Payment /> },
      {
        path: "/fresh-cart/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/fresh-cart/categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "/fresh-cart/brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      { path: "/fresh-cart/*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  const myClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={myClient}>
        <AuthContextProvider>
          <CartContextProvider>
            <RouterProvider router={routing} />
          </CartContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>

      <Toaster />
    </>
  );
}
