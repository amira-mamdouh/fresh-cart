import axios from "axios";
import { createContext } from "react";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
 function addProductToCart() {
  axios.post()
 }
 
  return <cartContext.Provider value={}>{children}</cartContext.Provider>;
}
