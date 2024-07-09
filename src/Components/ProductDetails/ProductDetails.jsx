import axios from "axios";
import { Oval } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Navigate, useParams } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();

  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { data, isLoading, isError } = useQuery(
    `getProductDetails-${id}`,
    getProductDetails
  );

  if (isLoading) {
    return (
      <div className="d-flex vh-100 justify-content-center align-items-center opacity-100 bg-main-light ">
        <Oval
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
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
