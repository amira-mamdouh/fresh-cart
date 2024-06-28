import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";

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
  const userData = {
    name: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
  };

  const myFormik = useFormik({
    initialValues: userData,
    validationSchema: mySchema,
    onSubmit: function (values) {
      axios
        .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
        .then(function (success) {
          console.log(success);
        })
        .catch(function (errors) {
          console.log(errors);
        });
    },
  });

  return (
    <>
      <div className="container-sm w-md-75 m-md-auto p-5">
        <h3 className="mb-3">Register Now:</h3>
        <form onSubmit={myFormik.handleSubmit}>
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
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
