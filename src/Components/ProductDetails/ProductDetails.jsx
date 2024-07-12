import axios from "axios";
import { useQuery } from "react-query";
import { Navigate, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { useContext } from "react";
import { cartContext } from "../../Context/CartContext";

export default function ProductDetails() {
  const { addProductToCart } = useContext(cartContext);

  const { id } = useParams();

  async function addProduct(id) {
    await addProductToCart(id);
  }

  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { data, isLoading, isError } = useQuery(
    `getProductDetails-${id}`,
    getProductDetails
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Navigate to={"/products"} />;
  }

  const dataDetails = data.data.data;

  return (
    <>
      <div className="container-fluid">
        <div className="row align-items-center py-5">
          <div className="col-12 col-md-3">
            <figure>
              <img
                className="w-100"
                src={dataDetails.imageCover}
                alt={dataDetails.title}
              />
            </figure>
          </div>
          <div className="col-12 col-md-9">
            <article>
              <h1>{dataDetails.title}</h1>
              <p className="px-1">{dataDetails.description}</p>
              <h6 className="fw-bold">{dataDetails.category.name}</h6>
              <div className="d-flex justify-content-between">
                <span>{dataDetails.price} EGP</span>
                <span className="me-md-5">
                  <i className="text-warning me-1 fa-solid fa-star"></i>
                  {dataDetails.ratingsAverage}
                </span>
              </div>
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
