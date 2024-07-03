import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { authContext } from "../../Context/AuthContext";

// Validation schema using Yup
const mySchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      "Password must contain both letters and numbers"
    ),
});

export default function Login() {
  // State variables to handle loading, success, and error states
  const [isSuccess, setIsSuccess] = useState(false);
  const [isUnSuccess, setUnIsSuccess] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useContext(authContext);

  // Initial form data
  const userData = {
    email: "",
    password: "",
  };

  // useFormik hook for form handling
  const myFormik = useFormik({
    initialValues: userData,
    validationSchema: mySchema,
    onSubmit: function (values) {
      setIsLoading(true);
      axios
        .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
        .then(function (success) {
          localStorage.setItem("token", success.data.token);
          setToken(success.data.token);
          setIsSuccess(true);
          setTimeout(() => {
            setIsSuccess(false);
            navigate("/products");
          }, 3000);
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
          }, 3000);
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
          <div className="alert alert-success text-center">Welcome Back.</div>
        ) : (
          ""
        )}
        {isUnSuccess ? (
          <div className="alert alert-danger text-center">{isUnSuccess}</div>
        ) : (
          ""
        )}
        <h3 className="mb-3">Login Now:</h3>
        <form onSubmit={myFormik.handleSubmit} onKeyPress={handleKeyPress}>
          <label htmlFor="email">Email:</label>
          <input
            value={myFormik.values.email}
            onChange={myFormik.handleChange}
            onBlur={myFormik.handleBlur}
            type="email"
            id="email"
            name="email"
            className="form-control mb-2"
          />
          {myFormik.errors.email ? (
            <div className="error text-danger mb-3">
              {myFormik.errors.email}
            </div>
          ) : (
            ""
          )}
          <label htmlFor="Password">Password:</label>
          <input
            value={myFormik.values.password}
            onChange={myFormik.handleChange}
            onBlur={myFormik.handleBlur}
            type="password"
            id="Password"
            name="password"
            className="form-control mb-2"
          />
          {myFormik.errors.password ? (
            <div className="error text-danger mb-3">
              {myFormik.errors.password}
            </div>
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
                "Login"
              )}
            </button>
            <div className="pt-3">
              <Link className="text-main forget-link" to="/forgotPassword">
                Forgotten password?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
