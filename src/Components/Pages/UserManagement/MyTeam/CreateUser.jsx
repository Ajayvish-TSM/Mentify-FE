/* eslint-disable */
import React, { useEffect, useState } from "react";
// import AppLayout from "../../../Loyout/App";
import { NavLink, useNavigate } from "react-router-dom";
import DateAndTimeLayout from "../../../Common/DateAndTimeLayout";
import { useDispatch, useSelector } from "react-redux";
import baseApi from "../../../../Api/config";
import { ToastContainer, toast } from "react-toastify";
import API from "../../../../Api/Api";

const CreateUser = () => {
  const initialValues = {
    firstName: "",
    email: "",
    mobile: "",
    roles: "",
  };
  const navigate = useNavigate();
  const adminObject = JSON.parse(localStorage.getItem("TajurbaAdminToken"));
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [profileStatus, setProfileStatus] = useState(true);
  const [profileImg, setProfileImg] = useState("");
  const [roleListing, setRoleisting] = useState([]);
  const errorMessageData = useSelector((state) => state.counter.errorData);
  const [loading, setLoading] = useState(false);
  const [errorMessage, SetErrorMessage] = useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Validate all the  Fields
  const validate = (values) => {
    const errors = {};

    const emailregex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    // const emailregex =
    //   /^(?!\.)[a-zA-Z0-9._%+-]{1,10}@([a-zA-Z0-9-]{1,10}\.){1,}[a-zA-Z]{2,}$/;
    const mobileregex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    const specialCharacter = /^[A-Za-z0-9 ]+$/;

    if (!values?.email) {
      errors.email = "Please enter Email Id";
    } else if (values.email.trim() === "") {
      errors.email = "Email cannot be blank";
    } else if (!emailregex.test(values?.email)) {
      errors.email = "Invalid email address. Please enter valid Email Id";
    }
    if (!values?.firstName) {
      errors.firstName = "Please enter  Name";
    } else if (values.firstName.trim() === "") {
      errors.firstName = "Name cannot be blank";
    } else if (!specialCharacter.test(values?.firstName)) {
      errors.firstName = "Please enter valid Name";
    }
    // else if (
    //   values?.firstName?.length < 3 ||
    //   values?.firstName?.length > 10
    // ) {
    //   errors.firstName = "Name length should be 3 to 10 characters";
    // }

    if (!values?.mobile) {
      errors.mobile = "Please enter Mobile no";
    } else if (values.mobile.trim() === "") {
      errors.mobile = "Mobile no cannot be blank";
    } else if (!mobileregex.test(values?.mobile)) {
      errors.mobile = "Invalid Mobile No. Please enter valid Mobile No";
    }

    if (!values?.roles) {
      errors.roles = "Please select Role";
    }
    if (!profileImg) {
      errors.profileImg = "Profile Image is required";
    }

    return errors;
  };

  // Function for role listing
  useEffect(() => {
    try {
      var payload = {
        agent: "role",
        function: "list",
        flag: "Active",
        page_no: 1,
        limit: 200,
        filter: {},
      };

      API?.CommanApiCall(payload).then((response) => {
        console.log(
          "Response from Roles listing api ",
          response?.data?.data?.data
        );
        if (response?.data?.data?.status === 200) {
          setRoleisting(response?.data?.data?.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Api call for creating new user
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("formValues", formValues);
      setLoading(true);
      try {
        API?.CommanApiCall({
          data: {
            first_name: formValues?.firstName,
            mobile_no: formValues?.mobile,
            email: formValues?.email,
            status: profileStatus,
            image: profileImg,
            is_admin: 1,
            loggedin_via: "email",
            usertype_in: 1,
            social_media_flag: false,
            role_id: parseInt(formValues?.roles),
            is_subscribed: false,
          },
          agent: "createAdminUser",
        }).then((response) => {
          console.log(response?.data?.data);
          if (response?.data?.data?.status === 200) {
            toast.success(response?.data?.data?.message);
            setTimeout(() => {
              setLoading(false);
              navigate(-1);
            }, 1500);
          } else if (response?.data?.data?.status === 201) {
            console.log("201111", response?.data?.data?.message);
            setLoading(false);
            // dispatch(userdata(response?.data));
            // dispatch(errorData(response?.data?.message));
            SetErrorMessage(response?.data?.data?.message);

            setTimeout(() => {
              SetErrorMessage("");
            }, 5000);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [formErrors]);

  // Function for change values
  const handleSave = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  // Function for upload File
  const UploadFile = (file) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    const fileType = file?.type;

    if (allowedTypes.includes(fileType)) {
      var myHeaders = new Headers();
      myHeaders.append("x-access-token", adminObject);

      var formdata = new FormData();
      formdata.append("file", file);
      formdata.append("action", "formcommand");
      formdata.append("docType", "profile");

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      fetch(baseApi?.baseurl, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setProfileImg(result?.data?.data?.Location);
        })
        .catch((error) => console.log("error", error));
    } else {
      toast.error("Only jpg or png should be allowed");
    }
  };

  // function for image file uplaod
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    UploadFile(file);
  };

  return (
    <>
      {/* <AppLayout> */}
      <ToastContainer />
      <div className="main-content">
        <div className="page-content">
          {/* start page title */}
          <DateAndTimeLayout />
          {/* end page title */}
          <div className="row d-flex align-items-center mb-3">
            <div className="col-6 row d-flex align-items-center">
              <NavLink
                to="/my-team"
                className="w-auto float-start pe-1 textBlack d-flex align-items-center text-decoration-none"
              >
                <div className="backArrow me-3">
                  <i className="fa fa-solid fa-chevron-left"></i>
                </div>

                <h4 className="headText mt-2 mb-2 fw-bold w-auto textBlack">
                  Create User
                </h4>
              </NavLink>
            </div>
            <div className="col-6">
              <div className="col-12 d-flex justify-content-end">
                <div className="cancelBtn">
                  <NavLink
                    to="/my-team"
                    disabled={loading}
                    className="btn btn-reject me-3 px-4"
                  >
                    <span className="">Close</span>
                  </NavLink>
                </div>
                <div className="saveBtn">
                  <button
                    disabled={loading}
                    onClick={(e) => handleSave(e)}
                    className="btn bgBlack text-white border-radius-2 px-4 float-end"
                  >
                    <span className="">
                      {loading && (
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      )}
                      Save
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="main-card p-4" id="uploadUser">
                {errorMessage && errorMessage ? (
                  <p className="text-danger ">{errorMessage}</p>
                ) : null}
                {/* <p className="text-danger ">{errorMessage}</p> */}
                <div className="row">
                  <div className="mb-3 col-12">
                    <div className="col-md-4 col-sm-12 col-12 float-start">
                      <div className="col-12 float-start mt-2 mb-4">
                        <p className="addUserPic mx-auto mt-1 mb-1 ">
                          {/* <span className="addPicIcon">
                              <i className="fas fa-pen" />
                            </span> */}
                          <input
                            type="file"
                            className="custom-file-input"
                            id="customFile"
                            name="filename"
                            multiple="multiple"
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                          <img
                            // crossorigin="anonymous"
                            src={profileImg}
                            className="rounded-circle img-fluid"
                            style={{ height: "196px", width: "193px" }}
                          />
                          <label
                            className="custom-file-label mb-0"
                            htmlFor="customFile"
                          />
                        </p>
                        <div className="mx-auto text-center">
                          <button className="btn btn-main btn-main-orange btn-sm mt-3">
                            <i className="fa fa-solid fa-plus textBlack"></i>
                          </button>
                          <p className="text-danger">
                            {formErrors?.profileImg}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-8 col-sm-12 col-12 float-start mb-4 border-left-grey">
                      <div className="row ps-0 ps-md-4">
                        <div className="col-12">
                          <h4 className="fw-bold mb-3">Personal Information</h4>
                        </div>
                        <hr className="borderHr" />
                        <div className="col-12 mb-3">
                          <label className="form-label">Name</label>
                          <input
                            type="text"
                            className="form-control bg-white"
                            placeholder=" Enter Full Name"
                            name="firstName"
                            onChange={(e) => handleChange(e)}
                          />
                          <p className="text-danger">{formErrors?.firstName}</p>
                        </div>

                        <div className="col-12 mb-3">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label">Email</label>
                              <input
                                type="email"
                                name="email"
                                className="form-control bg-white"
                                placeholder="Enter Email"
                                onChange={(e) => handleChange(e)}
                              />{" "}
                              <p className="text-danger">{formErrors?.email}</p>
                            </div>
                            <div className="col-4">
                              <label className="form-label">Mobile No.</label>
                              <input
                                type="number"
                                name="mobile"
                                className="form-control bg-white"
                                placeholder="Enter Mobile No."
                                onChange={(e) => handleChange(e)}
                              />
                              <p className="text-danger">
                                {formErrors?.mobile}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row ps-0 ps-md-4 mt-4">
                        <div className="col-12">
                          <h4 className="fw-bold mb-3">Roles</h4>
                        </div>
                        <hr className="borderHr" />
                        <div className="col-4 mb-3">
                          <select
                            className="form-select bg-white"
                            aria-label="Default select example"
                            name="roles"
                            onChange={(e) => handleChange(e)}
                          >
                            <option value="">Select</option>
                            {roleListing?.map((ele, index) => {
                              // if (ele?.is_active)
                              return (
                                <option key={index} value={ele?.role_id}>
                                  {ele?.name}
                                </option>
                              );
                            })}
                          </select>
                          <p className="text-danger">{formErrors?.roles}</p>
                        </div>
                      </div>

                      <div className="row ps-0 ps-md-4 mt-4">
                        <div className="col-12">
                          <h4 className="fw-bold mb-3">Status</h4>
                        </div>
                        <hr className="borderHr" />
                        <div className="col-4 mb-3">
                          <div className="d-flex">
                            <div
                              className="button b2 me-xxl-3 me-2"
                              id="button-13"
                            >
                              <input
                                type="checkbox"
                                disabled
                                checked={!profileStatus}
                                className="checkbox"
                                onChange={(e) => {
                                  setProfileStatus(
                                    e.target.checked === true ? false : true
                                  );
                                }}
                              />

                              <div className="knobs">
                                <span>|||</span>
                              </div>
                              <div className="layer"></div>
                            </div>

                            <p className="mt-1">
                              {profileStatus === false ? "Inactive" : "Active"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </AppLayout> */}
    </>
  );
};

export default CreateUser;
