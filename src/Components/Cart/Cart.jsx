import { useContext } from "react";
import { cartContext } from "../../Context/CartContext";
import { FaTrashAlt } from "react-icons/fa";
import Loading from "../Loading/Loading";

export default function Cart() {
  const { numOfCartItems, totalCartPrice, allProducts } =
    useContext(cartContext);

  if (!allProducts) {
    return <Loading />;
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
                  <p className="text-success">
                    <span>{product.price} EGP</span>
                  </p>
                  <div className="remove-item">
                    <FaTrashAlt className="text-success" />
                    <button className="btn text-danger">Remove</button>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="d-flex align-items-center">
                    <button className="btn btn-outline-success mx-2">-</button>
                    <span>{product.count}</span>
                    <button className="btn btn-outline-success mx-2">+</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="d-flex justify-content-between">
            <a className="btn bg-main text-white">CheckOut</a>
            <p>Total cart Price: 1000 EGP</p>
          </div>
        </div>
      </div>
    </>
  );
}
