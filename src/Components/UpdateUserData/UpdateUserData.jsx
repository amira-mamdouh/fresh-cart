import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { authContext } from "../../Context/AuthContext";

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

export default function UpdatePassword() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { resetPassword } = useContext(authContext);

  const myFormik = useFormik({
    initialValues: {
      password: "",
      rePassword: "",
    },
    validationSchema: mySchema,
    onSubmit: function (values) {
      setIsLoading(true);
      const email = localStorage.getItem("resetEmail");
      const resetCode = localStorage.getItem("resetCode");

      if (!email || !resetCode) {
        setError(
          "Missing email or reset code. Please start the process again."
        );
        setIsLoading(false);
        return;
      }

      resetPassword(email, values.password, resetCode)
        .then(() => {
          setIsSuccess(true);
          setTimeout(() => {
            setIsSuccess(false);
            navigate("/login");
          }, 3000);
        })
        .catch((err) => {
          setError(err.message || "An error occurred. Please try again.");
          setTimeout(() => {
            setError(null);
          }, 3000);
        })
        .finally(() => {
          setIsLoading(false);
          localStorage.removeItem("resetEmail");
          localStorage.removeItem("resetCode");
        });
    },
  });

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      myFormik.handleSubmit();
    }
  };

  return (
    <div className="container-sm w-md-75 m-md-auto p-5">
      {isSuccess && (
        <div className="alert alert-success text-center">
          Congratulations, your password has been updated.
        </div>
      )}
      {error && <div className="alert alert-danger text-center">{error}</div>}
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
        {myFormik.errors.password && (
          <div className="error text-danger mb-3">
            {myFormik.errors.password}
          </div>
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
        {myFormik.errors.rePassword && (
          <div className="error text-danger mb-3">
            {myFormik.errors.rePassword}
          </div>
        )}
        <div className="button text-end">
          <button className="btn bg-main text-white" type="submit">
            {isLoading ? (
              <ColorRing
                visible={true}
                height="35"
                width="35"
                ariaLabel="color-ring-loading"
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
  );
}
