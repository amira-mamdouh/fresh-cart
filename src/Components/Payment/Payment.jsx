import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

// Validation schema using Yup
const mySchema = yup.object({
  details: yup.string().required(),
  city: yup.string().required(),
  phone: yup.number().required("Phone number is required").positive().integer(),
});

export default function Payment() {
  // State variables to handle loading, success, and error states
  const [isSuccess, setIsSuccess] = useState(false);
  const [isUnSuccess, setUnIsSuccess] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { cartId, getUserCart, setNumOfCartItems } = useContext(cartContext);

  // Initial form data
  const userData = {
    details: "",
    phone: "",
    city: "",
  };

  // useFormik hook for form handling
  const myFormik = useFormik({
    initialValues: userData,
    validationSchema: mySchema,
    onSubmit: function (values) {
      setIsLoading(true);
      axios
        .post(
          `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
          values,
          {
            headers: { token: localStorage.getItem("token") },
          }
        )
        .then(function () {
          setIsSuccess(true);
          toast.success("payment completed");
          getUserCart();
          setNumOfCartItems(0);
          setTimeout(() => {
            setIsSuccess(false);
            navigate("/products");
          }, 2000);
          setIsLoading(false);
        })
        .catch(function (errors) {
          // Improved error handling
          if (errors.response) {
            setUnIsSuccess(errors.response.data.message);
          } else if (errors.request) {
            setUnIsSuccess("Network error, please try again later.");
          } else {
            setUnIsSuccess("An error occurred. Please try again.");
          }
          setTimeout(() => {
            setUnIsSuccess(false);
          }, 2000);
          setIsLoading(false);
        });
    },
  });

  // Function to handle Enter key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      myFormik.handleSubmit();
    }
  };

  return (
    <>
      <div className="container-sm w-md-75 m-md-auto p-5">
        {isSuccess ? (
          <div className="alert alert-success text-center">Congratulation.</div>
        ) : (
          ""
        )}
        {isUnSuccess ? (
          <div className="alert alert-danger text-center">{isUnSuccess}</div>
        ) : (
          ""
        )}
        <h3 className="mb-3">Addresses:</h3>
        <form onSubmit={myFormik.handleSubmit} onKeyPress={handleKeyPress}>
          <label htmlFor="email">Details:</label>
          <input
            value={myFormik.values.details}
            onChange={myFormik.handleChange}
            onBlur={myFormik.handleBlur}
            type="text"
            id="details"
            name="details"
            className="form-control mb-2"
          />
          {myFormik.errors.details ? (
            <div className="error text-danger mb-3">
              {myFormik.errors.details}
            </div>
          ) : (
            ""
          )}
          <label htmlFor="Phone">Phone:</label>
          <input
            value={myFormik.values.phone}
            onChange={myFormik.handleChange}
            onBlur={myFormik.handleBlur}
            type="tel"
            id="Phone"
            name="phone"
            className="form-control mb-2"
          />
          {myFormik.errors.phone ? (
            <div className="error text-danger mb-3">
              {myFormik.errors.phone}
            </div>
          ) : (
            ""
          )}
          <label htmlFor="Password">City:</label>
          <input
            value={myFormik.values.city}
            onChange={myFormik.handleChange}
            onBlur={myFormik.handleBlur}
            type="text"
            id="city"
            name="city"
            className="form-control mb-2"
          />
          {myFormik.errors.city ? (
            <div className="error text-danger mb-3">{myFormik.errors.city}</div>
          ) : (
            ""
          )}

          <div className="button text-end">
            <button className="btn bg-main text-white" type="submit">
              {isLoading ? (
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
                "Confirm"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
