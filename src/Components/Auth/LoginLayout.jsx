import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Logo from "./../../assets/images/logo.png";

const LoginLayout = (propslogin) => {
   return (
      <>
         <div className="login-page">
            <div className="container-fluid main-container vh-100">
               <div className="row h-100">
                  <div className="col-lg-7 loginBanner">
                     <div className="row align-items-center h-100">
                        <div className="ps-5 py-5">
                           <NavLink to="/" className="text-decoration-none">
                              <img src={Logo} style={{ width: "250px" }} />
                           </NavLink>
                           <h1 className="text-white mb-0 mt-0 letter-spacing-4 fw-500">
                              {/* TAJURBA BUSINESS NETWORK PRIVATE LIMITED */}
                              Tajurba Business Network Private Limited
                           </h1>
                        </div>
                     </div>
                  </div>
                  <div className="col-lg-5 col-12 center-me" style={{ background: "#232332" }}>
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
