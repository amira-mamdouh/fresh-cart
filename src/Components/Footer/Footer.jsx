import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="bg-main-light py-5">
        <div className="container-fluid px-4">
          <h4>Get the Frech Cart App</h4>
          <p>
            We will send you a link, ioen it on your phone to download the app.
          </p>
          <div className="row gy-3">
            <div className="col-12 col-md-10">
              <input
                type="text"
                className="form-control py-2"
                placeholder="Email..."
              />
            </div>
            <div className="col-12 col-md-2">
              <button className="btn w-100 bg-main text-white">
                Share App Link
              </button>
            </div>
          </div>
          <div className="line border-bottom border-2 my-4"></div>
        </div>
      </footer>
    </>
  );
}
