import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import { authContext } from "../../Context/AuthContext";
import { cartContext } from "../../Context/CartContext";

export default function Navbar() {
  const { token, setToken } = useContext(authContext);
  const { numOfCartItems } = useContext(cartContext);
  const navigate = useNavigate();

  function logOut() {
    //1- rempve token from state
    setToken(null);
    //2- rempve token from srorege
    localStorage.removeItem("token");
    //3- navigate to login component
    navigate("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary p-3">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="fresh cart logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {token ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/products"
                  >
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/products">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/categories">
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/brands">
                    Brands
                  </Link>
                </li>
                <li className="nav-item position-relative">
                  <Link className="nav-link" to="/cart">
                    Cart
                  </Link>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-3 bg-main">
                    {numOfCartItems ?? ""}
                  </span>
                </li>
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item">
                <ul className="list-unstyled d-flex ">
                  <li>
                    <i className="me-2 fa-brands fa-instagram"></i>
                  </li>
                  <li>
                    <i className="me-2 fa-brands fa-facebook"></i>
                  </li>
                  <li>
                    <i className="me-2 fa-brands fa-tiktok"></i>
                  </li>
                  <li>
                    <i className="me-2 fa-brands fa-twitter"></i>
                  </li>
                  <li>
                    <i className="me-2 fa-brands fa-linkedin"></i>
                  </li>
                  <li>
                    <i className="me-2 fa-brands fa-youtube"></i>
                  </li>
                </ul>
              </li>

              {token ? (
                <li className="nav-item">
                  <span onClick={logOut} role="button" className="nav-link">
                    SignOut
                  </span>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
