import axios from "axios";
import { useQuery } from "react-query";
import { Navigate, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { useContext } from "react";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  // Get the addProductToCart function from the cartContext to handle adding products to the cart.
  const { addProductToCart } = useContext(cartContext);

  // Get the product ID from the URL parameters.
  const { id } = useParams();

  // Function to handle adding a product to the cart.
  async function addProduct(id) {
    const res = await addProductToCart(id); // Call addProductToCart with the product ID.
    if (res.status === "success") {
      toast.success("Product added to cart successfully", {
        duration: 2000,
        position: "bottom-right",
      });
    } else {
      toast.error("Faild to add", {
        duration: 2000,
        position: "bottom-right",
      });
    }
  }

  // Function to fetch product details from the API.
  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  // Use the useQuery hook to fetch product details.
  const { data, isLoading, isError } = useQuery(
    `getProductDetails-${id}`, // Unique key for caching and synchronization.
    getProductDetails
  );

  // If the data is still loading, show the Loading component.
  if (isLoading) {
    return <Loading />;
  }

  // If there is an error, navigate back to the products page.
  if (isError) {
    return <Navigate to={"/products"} />;
  }

  // Extract the product details from the fetched data.
  const dataDetails = data.data.data;

  return (
    <>
      <div className="container-fluid">
        <div className="row align-items-center py-5">
          <div className="col-12 col-md-3">
            <figure>
              {/* Display the product image. */}
              <img
                className="w-100"
                src={dataDetails.imageCover}
                alt={dataDetails.title}
              />
            </figure>
          </div>
          <div className="col-12 col-md-9">
            <article>
              {/* Display the product title. */}
              <h1>{dataDetails.title}</h1>
              {/* Display the product description. */}
              <p className="px-1">{dataDetails.description}</p>
              {/* Display the product category name. */}
              <h6 className="fw-bold">{dataDetails.category.name}</h6>
              <div className="d-flex justify-content-between">
                {/* Display the product price. */}
                <span>{dataDetails.price} EGP</span>
                {/* Display the product rating. */}
                <span className="me-md-5">
                  <i className="text-warning me-1 fa-solid fa-star"></i>
                  {dataDetails.ratingsAverage}
                </span>
              </div>
              {/* Button to add the product to the cart. */}
              <button
                onClick={() => addProduct(dataDetails.id)}
                className="btn bg-main text-white w-100 mt-3"
                type="button"
              >
                + add to cart
              </button>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
