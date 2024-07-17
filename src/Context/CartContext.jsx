// import axios from "axios";
// import { createContext, useContext, useEffect, useState } from "react";
// import { authContext } from "./AuthContext";

// export const cartContext = createContext();

// export default function CartContextProvider({ children }) {
//   const { token } = useContext(authContext);

//   const [numOfCartItems, setNumOfCartItems] = useState(0);
//   const [totalCartPrice, setTotalCartPrice] = useState(0);
//   const [allProducts, setAllProducts] = useState(null);

//   function addProductToCart(id) {
//     return axios
//       .post(
//         `https://ecommerce.routemisr.com/api/v1/cart`,
//         { productId: id },
//         { headers: { token: localStorage.getItem("token") } }
//       )
//       .then((response) => {
//         getUserCart(); // Update the cart after adding a product
//         return response.data;
//       })
//       .catch((error) => {
//         console.error("Error adding product to cart:", error);
//         throw error;
//       });
//   }

//   function getUserCart() {
//     axios
//       .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
//         headers: { token: localStorage.getItem("token") },
//       })
//       .then((res) => {
//         setNumOfCartItems(res.data.numOfCartItems);
//         setTotalCartPrice(res.data.data.totalCartPrice);
//         setAllProducts(res.data.data.products);
//       })
//       .catch((err) => {
//         console.error("Error fetching user cart:", err);
//       });
//   }

//   useEffect(() => {
//     if (token) {
//       getUserCart();
//     }
//   }, [token]);

//   return (
//     <cartContext.Provider
//       value={{
//         addProductToCart,
//         numOfCartItems,
//         totalCartPrice,
//         allProducts,
//       }}
//     >
//       {children}
//     </cartContext.Provider>
//   );
// }
