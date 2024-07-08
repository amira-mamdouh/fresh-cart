import axios from "axios";
import { Oval } from "react-loader-spinner";
import { useQuery } from "react-query";

export default function Products() {
  async function getAllProducts() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  const { data, isLoading } = useQuery("getAllProducts", getAllProducts, {
    // refetchOnMount: false,
    // refetchInterval: 3000,
    cacheTime: 3000,
  });

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

  return (
    <>
      <div className="container-fluid px-5">
        <div className="row">
          {data.data.data.map((product, index) => (
            <div key={index} className="col-6 col-md-2">
              <div className="product mb-3">
                <img className="w-100" src={product.imageCover} alt="" />
                <h3 className="mt-2 h6 text-main">{product.category.name}</h3>
                <h2 className="h6">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h2>
                <div className="d-flex justify-content-between">
                  <p className="price">{product.price} EGP</p>
                  <p className="rating">
                    <i className="text-warning me-1 fa-solid fa-star"></i>
                    {product.ratingsAverage}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
