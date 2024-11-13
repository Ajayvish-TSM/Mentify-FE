import React from "react";
import { Outlet } from "react-router-dom";

const LoginLayout = (propslogin) => {
  return (
    <div
      className="login-page d-flex align-items-center justify-content-center vh-100"
      style={{
        backgroundColor: "#f5f5f5", // Light background color for the page
      }}
    >
      <div
        className="login-form-container p-4"
        style={{
          width: "100%",
          maxWidth: "450px", // Optional max width for the login form
          backgroundColor: "#fff", // White theme for the form background
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Login form content */}
        <div
          className="login-content"
          style={{ color: "black" }} // All text color set to black
        >
          {propslogin.children}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default LoginLayout;
