import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "./AuthContext";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  const { token } = useContext(authContext);

  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [allProducts, setAllProducts] = useState(null);
  const [cartId, setCartId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function addProductToCart(id) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId: id },
        { headers: { token: localStorage.getItem("token") } }
      )
      .then((response) => {
        getUserCart(); // Update the cart after adding a product
        return response.data;
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
        throw error;
      });
  }

  function getUserCart() {
    setLoading(true);
    setError(null);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        setNumOfCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setAllProducts(res.data.data.products);
        setCartId(res.data.data._id);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user cart:", err);
        setError("Failed to load cart. Please try again.");
        setLoading(false);
      });
  }

  async function updateCount(id, newCount) {
    setLoading(true);
    const booleanFlag = await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count: newCount,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setNumOfCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setAllProducts(res.data.data.products);
        setLoading(false);
        return true;
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        return false;
      });

    return booleanFlag;
  }

  async function deletProduct(id) {
    setLoading(true);
    const res = await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setNumOfCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setAllProducts(res.data.data.products);
        setLoading(false);
        return true;
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        return false;
      });
    return res;
  }

  async function deletAllProduct() {
    setLoading(true);
    const res = await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then(() => {
        setNumOfCartItems(0);
        setTotalCartPrice(0);
        setAllProducts([]);
        setLoading(false);
        return true;
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        return false;
      });
    return res;
  }

  useEffect(() => {
    if (token) {
      getUserCart();
    }
  }, [token]);

  return (
    <cartContext.Provider
      value={{
        addProductToCart,
        numOfCartItems,
        totalCartPrice,
        allProducts,
        loading,
        error,
        updateCount,
        deletProduct,
        deletAllProduct,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
