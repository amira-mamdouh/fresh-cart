import axios from "axios";
import { useQuery } from "react-query";
import SimpleSlider from "../HomeSlider/HomeSlider";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import { useContext } from "react";
import { cartContext } from "../../Context/CartContext";

// The Products component fetches and displays a list of products.
export default function Products() {
  // Get the addProductToCart function from the cartContext to handle adding products to the cart.
  const { addProductToCart } = useContext(cartContext);

  // Function to handle adding a product to the cart.
  async function addProduct(id) {
    const res = await addProductToCart(id); // Call addProductToCart with the product ID.
    if (res.status === "success") {
      console.log("Product added to cart successfully");
    }
  }

  // Function to fetch all products from the API.
  async function getAllProducts() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  // Use the useQuery hook to fetch products data.
  const { data, isLoading } = useQuery("getAllProducts", getAllProducts);

  // If the data is still loading, show the Loading component.
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="container-fluid px-5">
        {/* Display the SimpleSlider and CategoriesSlider components. */}
        <SimpleSlider />
        <CategoriesSlider />

        {/* Display the list of products. */}
        <div className="row mt-3 g-3">
          {data.data.data.map((product, index) => (
            <div key={index} className="main-hover col-12 col-md-2">
              {/* Link to the product details page. */}
              <Link to={`/productDetails/${product.id}`}>
                <div className="product">
                  {/* Display the product image. */}
                  <img className="w-100" src={product.imageCover} alt="" />
                  {/* Display the product category name. */}
                  <h3 className="mt-2 h6 text-main">{product.category.name}</h3>
                  {/* Display the product title (first two words). */}
                  <h2 className="h6">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h2>
                  {/* Display the product price and rating. */}
                  <div className="d-flex justify-content-between">
                    <p className="price">{product.price} EGP</p>
                    <p className="rating">
                      <i className="text-warning me-1 fa-solid fa-star"></i>
                      {product.ratingsAverage}
                    </p>
                  </div>
                </div>
              </Link>
              {/* Button to add the product to the cart. */}
              <button
                onClick={() => addProduct(product.id)}
                className="btnAdd btn bg-main text-white w-100 mb-2"
                type="button"
              >
                + add
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
