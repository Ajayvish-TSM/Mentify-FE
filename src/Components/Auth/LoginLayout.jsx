import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import logo1 from "./../../assets/images/logo1.png";

const LoginLayout = (propslogin) => {
  return (
    <>
      <div className="login-page">
        <div className="container-fluid main-container vh-100">
          <div className="row h-100">
            <div className="col-lg-7 loginBanner">
              <div className="row align-items-center  h-100">
                <div className="ps-5 py-5">
                  <NavLink to="/" className="text-decoration-none">
                    <img src={logo1} style={{ width: "250px" }} />
                  </NavLink>
                  <h1 className="text-white  mb-0 mt-0 letter-spacing-4 fw-500">
                    Mentify: Innovate. Lead. Succeed.
                  </h1>
                </div>
              </div>
            </div>
            <div
              className="col-lg-5 col-12 center-me"
              style={{ background: "#120e43" }}
            >
              {propslogin.children}
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};
export default LoginLayout;
