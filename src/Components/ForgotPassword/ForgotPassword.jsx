import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const mySchema = yup.object({
  email: yup
    .string()
    .email("Invalid email")
    .required("Please enter your email address to search for your account."),
});

export default function ForgotPassword() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isUnSuccess, setIsUnSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const myFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: mySchema,
    onSubmit: async function (values) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
          values
        );
        setIsSuccess(true);
        setMessage(response.data.message);
        localStorage.setItem("resetEmail", values.email);
        setTimeout(() => {
          setIsSuccess(false);
          navigate("/verifyResetCode");
        }, 3000);
      } catch (error) {
        if (error.response) {
          setIsUnSuccess(true);
          setMessage(error.response.data.message);
        }
        setTimeout(() => {
          setIsUnSuccess(false);
        }, 3000);
      } finally {
        setIsLoading(false);
      }
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
        <div className="alert alert-success text-center">{message}</div>
      )}
      {isUnSuccess && (
        <div className="alert alert-danger text-center">{message}</div>
      )}
      <h3 className="mb-3">Find Your Account:</h3>
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
        {myFormik.errors.email && (
          <div className="error text-danger mb-3">{myFormik.errors.email}</div>
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
              "Search"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
