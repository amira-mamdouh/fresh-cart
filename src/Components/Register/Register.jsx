import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

// Validation schema using Yup
const mySchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Too Short, at least 3 characters")
    .max(20, "Too Long!"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.number().required("Phone number is required").positive().integer(),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      "Password must contain both letters and numbers"
    ),
  rePassword: yup
    .string()
    .required("Re-entering the password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export default function Register() {
  // State variables to handle loading, success, and error states
  const [isSuccess, setIsSuccess] = useState(false);
  const [isUnSuccess, setUnIsSuccess] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Initial form data
  const userData = {
    name: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
  };

  // useFormik hook for form handling
  const myFormik = useFormik({
    initialValues: userData,
    validationSchema: mySchema,
    onSubmit: function (values) {
      setIsLoading(true);
      axios
        .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
        .then(function () {
          setIsSuccess(true);
          setTimeout(() => {
            setIsSuccess(false);
            navigate("/login");
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
          <div className="alert alert-success text-center">
            Congratulation your account has been created.
          </div>
        ) : (
          ""
        )}
        {isUnSuccess ? (
          <div className="alert alert-danger text-center">{isUnSuccess}</div>
        ) : (
          ""
        )}
        <h3 className="mb-3">Register Now:</h3>
        <form onSubmit={myFormik.handleSubmit} onKeyPress={handleKeyPress}>
          <label htmlFor="name">Name:</label>
          <input
            value={myFormik.values.name}
            onChange={myFormik.handleChange}
            onBlur={myFormik.handleBlur}
            type="text"
            id="name"
            name="name"
            className="form-control mb-2"
          />
          {myFormik.errors.name ? (
            <div className="error text-danger mb-3">{myFormik.errors.name}</div>
          ) : (
            ""
          )}

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
          <label htmlFor="rePassword">rePassword:</label>
          <input
            value={myFormik.values.rePassword}
            onChange={myFormik.handleChange}
            onBlur={myFormik.handleBlur}
            type="password"
            id="rePassword"
            name="rePassword"
            className="form-control mb-2"
          />
          {myFormik.errors.rePassword ? (
            <div className="error text-danger mb-3">
              {myFormik.errors.rePassword}
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
                "Register"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
