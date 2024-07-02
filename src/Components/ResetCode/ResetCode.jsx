import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

// Validation schema using Yup
const mySchema = yup.object({
  resetCode: yup.number().required("Please enter your reset code."),
});

export default function ResetCode() {
  // State variables to handle loading, success, and error states
  const [isSuccess, setIsSuccess] = useState(false);
  const [isUnSuccess, setIsUnSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Initial form data
  const userData = {
    resetCode: "535863",
  };

  // useFormik hook for form handling
  const myFormik = useFormik({
    initialValues: userData,
    validationSchema: mySchema,
    onSubmit: async function (values) {
      setIsLoading(true); // Set loading state to true
      try {
        // Make API request to verify reset code
        const response = await axios.post(
          `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
          values
        );
        setIsSuccess(true); // Set success state to true
        setMessage(response.data.message); // Set success message
        setTimeout(() => {
          setIsSuccess(false); // Reset success state
          navigate("/products"); // Navigate to products page
        }, 3000);
      } catch (error) {
        if (error.response) {
          setIsUnSuccess(true); // Set error state to true
          setMessage(error.response.data.message); // Set error message
        }
        setTimeout(() => {
          setIsUnSuccess(false); // Reset error state
        }, 3000);
      } finally {
        setIsLoading(false); // Reset loading state
      }
    },
  });

  // Function to handle Enter key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default form submission
      myFormik.handleSubmit(); // Trigger form submission
    }
  };

  return (
    <>
      <div className="container-sm w-md-75 m-md-auto p-5">
        {isSuccess && (
          <div className="alert alert-success text-center">{message}</div> // Display success message
        )}
        {isUnSuccess && (
          <div className="alert alert-danger text-center">{message}</div> // Display error message
        )}
        <h3 className="mb-3">Verify Reset Code:</h3>
        <form onSubmit={myFormik.handleSubmit} onKeyPress={handleKeyPress}>
          <label htmlFor="resetCode">Reset Code:</label>
          <input
            value={myFormik.values.resetCode}
            onChange={myFormik.handleChange}
            onBlur={myFormik.handleBlur}
            type="text"
            id="resetCode"
            name="resetCode"
            className="form-control mb-2"
          />
          {myFormik.errors.resetCode && (
            <div className="error text-danger mb-3">
              {myFormik.errors.resetCode}
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
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
                />
              ) : (
                "Verify"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
