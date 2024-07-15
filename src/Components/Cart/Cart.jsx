export default function Cart() {
  return (
    <>
      <div className="my-5">
        <button className="btn btn-outline-danger d-block ms-auto">
          Clear Cart
        </button>

        <div className="cart-product shadow rounded-2 my-3">
          <div className="row align-items-center">
            <div className="col-md-2">
              <img className="w-100" src={product.product.imageCover} alt="" />
            </div>
            <div className="col-md-8">
              <h2>{product.product.title}</h2>
              <h5>{product.product.category.name}</h5>
              <p className="d-flex justify-content-between">
                <span>{product.price} EGP</span>
                <span>
                  <i className=" fas fa-star rating-color me-1"></i>{" "}
                  {product.product.ratingsAverage}
                </span>
              </p>
              <p>
                <span className="fw-bolder">Total Price:</span>{" "}
                {product.count * product.price} EGP
              </p>
            </div>
            <div className="col-md-2">
              <button className="btn text-danger">Remove</button>
              <div className="d-flex align-items-center">
                <button className="btn bg-main text-white mx-2">-</button>
                <span>{product.count}</span>
                <button className="btn bg-main text-white mx-2">+</button>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <a className="btn bg-main text-white">CheckOut</a>
          <p>Total cart Price: 1000 EGP</p>
        </div>
      </div>
    </>
  );
}
