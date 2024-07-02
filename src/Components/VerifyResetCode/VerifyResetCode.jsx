import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

// Validation schema using Yup
const mySchema = yup.object({
  resetCode: yup.string().required("Please enter your reset code."),
});

export default function VerifyResetCode() {
  const [isUnSuccess, setIsUnSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const userData = {
    resetCode: "",
  };

  const myFormik = useFormik({
    initialValues: userData,
    validationSchema: mySchema,
    onSubmit: (values) => {
      setIsLoading(true);
      axios
        .post(
          `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
          values
        )
        .then(() => {
          navigate("/updateData", {
            state: { resetCode: values.resetCode },
          });
        })
        .catch((error) => {
          if (error.response) {
            setIsUnSuccess(true);
            setMessage(error.response.data.message);
          }
          setTimeout(() => {
            setIsUnSuccess(false);
          }, 3000);
        })
        .finally(() => {
          setIsLoading(false);
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
      {isUnSuccess && (
        <div className="alert alert-danger text-center">{message}</div>
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
  );
}
