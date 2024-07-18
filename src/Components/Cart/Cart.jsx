import { useContext } from "react";
import { cartContext } from "../../Context/CartContext";
import { FaTrashAlt } from "react-icons/fa";
import Loading from "../Loading/Loading";
import toast from "react-hot-toast";

export default function Cart() {
  const { updateCount, totalCartPrice, allProducts } = useContext(cartContext);

  if (!allProducts) {
    return <Loading />;
  }

  async function updateProductCount(id, newCount) {
    const res = await updateCount(id, newCount);
    if (res) {
      toast.success("Product updated successfully", {
        position: "top-right",
      });
    } else {
      toast.error("Product updated faild", {
        position: "top-right",
      });
    }
  }

  return (
    <>
      <div className="container-fluid p-5">
        <h2>Shop Cart:</h2>
        <p>Total cart price: {totalCartPrice} EGP</p>

        <div className="my-5">
          {/* <button className="btn btn-outline-danger d-block ms-auto">
            Clear Cart
          </button> */}
          {/* <h2 className="alert alert-warning text-center my-5">
            No products in your cart
          </h2> */}

          {allProducts.map((product, index) => (
            <div key={index} className="cart-product shadow p-3 rounded-2 my-3">
              <div className="row align-items-center">
                <div className="col-md-1">
                  <img
                    className="w-100"
                    src={product.product.imageCover}
                    alt=""
                  />
                </div>
                <div className="col-md-9">
                  <h3>{product.product.title}</h3>
                  <p className="text-main">
                    <span>{product.price} EGP</span>
                  </p>
                  <div className="remove-item">
                    <FaTrashAlt className="text-main" />
                    <button className="btn text-danger">Remove</button>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="d-flex align-items-center">
                    <button
                      disabled={product.count == 1}
                      onClick={() => {
                        updateProductCount(
                          product.product.id,
                          product.count - 1
                        );
                      }}
                      className="btn btn-outline-success mx-2"
                    >
                      -
                    </button>
                    <span>{product.count}</span>
                    <button
                      onClick={() => {
                        updateProductCount(
                          product.product.id,
                          product.count + 1
                        );
                      }}
                      className="btn btn-outline-success mx-2"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="d-flex justify-content-between">
            {/* <link className="btn bg-main text-white">CheckOut</link> */}
          </div>
        </div>
      </div>
    </>
  );
}
