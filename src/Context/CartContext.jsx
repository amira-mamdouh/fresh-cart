import axios from "axios";
import { createContext } from "react";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  function addProductToCart(id) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: id,
        },
        {
          headers: { token: localStorage.getItem("token") },
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  }

  return (
    <cartContext.Provider value={{ addProductToCart }}>
      {children}
    </cartContext.Provider>
  );
}
