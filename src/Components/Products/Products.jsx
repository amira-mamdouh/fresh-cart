import axios from "axios";
import { useMutation, useQuery } from "react-query";
import SimpleSlider from "../HomeSlider/HomeSlider";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import { useContext } from "react";
import { cartContext } from "../../Context/CartContext";
import { ColorRing } from "react-loader-spinner";

export default function Products() {
  const { addProductToCart } = useContext(cartContext);

  const addProductMutation = useMutation(addProductToCart, {
    onSuccess: (data) => {
      if (data.status === "success") {
        console.log("Product added to cart");
      }
    },
    onError: (error) => {
      console.error("Error adding product to cart:", error);
    },
  });

  async function getAllProducts() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  const { data, isLoading } = useQuery("getAllProducts", getAllProducts);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="container-fluid px-5">
        <SimpleSlider />
        <CategoriesSlider />

        <div className="row mt-3 g-3">
          {data.data.data.map((product, index) => (
            <div key={index} className="main-hover col-12 col-md-2">
              <Link to={`/productDetails/${product.id}`}>
                <div className="product">
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
              </Link>
              <button
                onClick={() => addProductMutation.mutate(product.id)}
                className="btn bg-main text-white w-100 mt-3"
                type="button"
                disabled={addProductMutation.isLoading}
              >
                {addProductMutation.isLoading ? (
                  <ColorRing
                    visible={true}
                    height="35"
                    width="35"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
                  />
                ) : (
                  "+ add to cart"
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
