import axios from "axios";
import { createContext } from "react";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  function addProductToCart(id) {
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: id,
        },
        {
          headers: { token: localStorage.getItem("token") },
        }
      )
      .then((success) => {
        console.log(success);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <cartContext.Provider value={{ addProductToCart }}>
      {children}
    </cartContext.Provider>
  );
}
