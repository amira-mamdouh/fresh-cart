import { useFormik } from "formik";
import React from "react";

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
    onSubmit: function (values) {
      console.log(values);
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
            type="text"
            id="name"
            name="name"
            className="form-control mb-3"
          />
          <label htmlFor="email">Email:</label>
          <input
            value={myFormik.values.email}
            onChange={myFormik.handleChange}
            type="email"
            id="email"
            name="email"
            className="form-control mb-3"
          />
          <label htmlFor="Phone">Phone:</label>
          <input
            value={myFormik.values.phone}
            onChange={myFormik.handleChange}
            type="tel"
            id="Phone"
            name="phone"
            className="form-control mb-3"
          />
          <label htmlFor="Password">Password:</label>
          <input
            value={myFormik.values.password}
            onChange={myFormik.handleChange}
            type="password"
            id="Password"
            name="password"
            className="form-control mb-3"
          />
          <label htmlFor="rePassword">rePassword:</label>
          <input
            value={myFormik.values.rePassword}
            onChange={myFormik.handleChange}
            type="password"
            id="rePassword"
            name="rePassword"
            className="form-control mb-3"
          />
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
