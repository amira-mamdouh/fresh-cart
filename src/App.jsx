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
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Register /> },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "productDetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "forgotPassword", element: <ForgotPassword /> },
      { path: "verifyResetCode", element: <VerifyResetCode /> },

      { path: "updateData", element: <UpdateUserData /> },
      { path: "/payment", element: <Payment /> },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
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
