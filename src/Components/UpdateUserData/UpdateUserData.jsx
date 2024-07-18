import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { authContext } from "../../Context/AuthContext";

// Validation schema for password reset
const mySchema = yup.object({
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

// Component for updating user data and resetting password
export default function UpdateUserData() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isUnSuccess, setUnIsSuccess] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { resetPassword, setToken } = useContext(authContext); // useContext to get resetPassword and setToken

  // Initial form data
  const userData = {
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
        .put(
          `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
          {
            currentPassword: values.currentPassword,
            password: values.password,
            rePassword: values.rePassword,
          },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        )
        .then(function () {
          // Reset password
          resetPassword(values.email, values.password);

          // Update token (assuming the server response includes a new token)
          setToken("newToken"); // Replace "newToken" with the actual new token from response

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
            Congratulations, your password has been updated.
          </div>
        ) : (
          ""
        )}
        {isUnSuccess ? (
          <div className="alert alert-danger text-center">{isUnSuccess}</div>
        ) : (
          ""
        )}
        <h3 className="mb-3">Reset Password:</h3>
        <form onSubmit={myFormik.handleSubmit} onKeyPress={handleKeyPress}>
          <label htmlFor="password">New Password:</label>
          <input
            value={myFormik.values.password}
            onChange={myFormik.handleChange}
            onBlur={myFormik.handleBlur}
            type="password"
            id="password"
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
          <label htmlFor="rePassword">Re-enter New Password:</label>
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
                "Reset"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
