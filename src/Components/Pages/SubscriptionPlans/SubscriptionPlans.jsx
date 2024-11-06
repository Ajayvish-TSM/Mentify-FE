/* eslint-disable */
import React, { useEffect, useState } from "react";
// import AppLayout from "../../Loyout/App";
import DateAndTimeLayout from "../../Common/DateAndTimeLayout";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import API from "../../../Api/Api";
import baseApi from "../../../Api/config";
import { ToastContainer, toast } from "react-toastify";

// import AdminRoute from '../../../Route/RouteDetails';

const SubscriptionPlans = () => {
  const adminObject = JSON.parse(localStorage.getItem("TajurbaAdminToken"));
  const LoginUserDetails = JSON.parse(localStorage.getItem("TajurbaAdminUser"));
  const TajurbaAdmin_priviledge_data = JSON.parse(
    localStorage.getItem("TajurbaAdmin_priviledge_data")
  );

  const [subscriptionDetails, setSubscriptionDetails] = useState([]);
  const [showCreateSubscriptionPlansPage, setShowCreateSubscriptionPlansPage] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, SetErrorMessage] = useState("");

  // State to manage view more/view less for each subscription
  const [showFullDescriptions, setShowFullDescriptions] = useState(
    Array(subscriptionDetails?.length)?.fill(false)
  );

  // Function to toggle view more/view less for a specific subscription
  const toggleDescription = (index) => {
    const newShowFullDescriptions = [...showFullDescriptions];
    console.log("first ", newShowFullDescriptions);
    newShowFullDescriptions[index] = !newShowFullDescriptions[index];
    console.log("second ", newShowFullDescriptions);
    setShowFullDescriptions(newShowFullDescriptions);
  };
  // Api call for get Subscription  details
  useEffect(() => {
    GetSubscriptionDetails();
  }, []);

  const GetSubscriptionDetails = () => {
    try {
      API?.CommanApiCall({
        agent: "subscription",
        function: "get_list",
        // createdAt: -1,
      }).then((response) => {
        if (response?.data?.data?.status === 200) {
          console.log("Subscription api details", response?.data?.data?.data);
          setSubscriptionDetails(response?.data?.data?.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // click on  Create Subscription Plan
  const handleClickAddSubscription = () => {
    setShowCreateSubscriptionPlansPage(true);
  };

  // click on  Create Subscription Plan
  const handleClickBackButton = () => {
    setShowCreateSubscriptionPlansPage(false);
  };

  const validate = (values) => {
    console.log(values, "value");
    const errors = {};

    if (!values.package_name) {
      errors.package_name = "Please enter package name";
    } else if (values.package_name.trim() === "") {
      errors.package_name = "Package name cannot be blank";
    }
    if (!values.package_description) {
      errors.package_description = "Please enter package description";
    } else if (values.package_description.trim() === "") {
      errors.package_description = "Package description cannot be blank";
    }

    if (!values.package_type) {
      errors.package_type = "Please select package type";
    }

    if (values.package_type === "Free") {
      if (!values.button_name) {
        errors.button_name = "Please enter button name";
      } else if (values.button_name.trim() === "") {
        errors.button_name = "button name cannot be blank";
      }
    }
    if (values.package_type === "Paid") {
      if (!values.amount) {
        errors.amount = "Please enter amount";
      }
    }
    if (values.package_type === "Paid") {
      if (!values.subscription_type) {
        errors.subscription_type = "Please select package type";
      }
    }

    if (!values.package_image) {
      errors.package_image = "Please upload package image";
    }

    // if (!values.Community) {
    //   errors.Community = "Please enter Community";
    // }
    // if (!values.cover_image) {
    //   errors.cover_image = "Please enter cover_image";
    // }
    // if (!values.detail_desciption) {
    //   errors.detail_desciption = "Please enter detail_desciption";
    // }
    console.log("Erroes", errors);
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      package_image: "",
      package_name: "",
      package_description: "",
      package_type: "",
      button_name: "",
      amount: "",
      subscription_type: "",
    },
    onSubmit: (values, { setSubmitting }) => {
      const errors = validate(values);

      if (Object.keys(errors).length === 0) {
        // console.log("Run vaidation function no errors");
        handleSave();
      } else {
        // console.log("Run vaidation function if errors is present ");

        console.log("Validation errors:", errors);
      }

      setSubmitting(false);
    },
    validate,
  });

  const handleSave = () => {
    SetErrorMessage("");
    setLoading(true);
    try {
      API?.CommanApiCall({
        data: {
          name: formik?.values?.package_name,
          description: formik?.values?.package_description,
          image: formik.values?.package_image,
          payment_type: formik.values?.package_type,
          button_name:
            formik.values?.package_type === "Free"
              ? formik?.values?.button_name
              : null,
          amount:
            formik.values?.package_type === "Paid"
              ? formik?.values?.amount
              : null,
          subscription_type:
            formik.values?.package_type === "Paid"
              ? formik?.values?.subscription_type
              : null,
          created_by: LoginUserDetails?._id,
        },
        agent: "subscription",
      }).then((response) => {
        console.log(response?.data?.data);
        if (response?.data?.data?.status === 200) {
          setLoading(false);
          setShowCreateSubscriptionPlansPage(false);
          GetSubscriptionDetails();
          // navigate(
          //   `../${AdminRoute?.ContentCreation?.CreateContent.replace(
          //     "/:id",
          //     ""
          //   )}/${response?.data?.data?.data?.courseedition_id}`
          // );
        } else if (response?.data?.data?.status === 201) {
          SetErrorMessage(response?.data?.data?.message);

          setTimeout(() => {
            SetErrorMessage("");
          }, 5000);
        }
      });
    } catch (error) {
      console.log(error);
    }
    // finally {

    // }
  };

  // Api for FIle Upload

  const UploadFile = (e) => {
    // console.log("e", e.target.value);
    const file = e?.target?.files[0];
    const allowedTypes = ["image/jpeg", "image/png"];

    if (allowedTypes?.includes(file?.type)) {
      var myHeaders = new Headers();

      myHeaders.append("x-access-token", adminObject);

      var formdata = new FormData();
      formdata.append(
        "file",
        e.target.files[0]
        // "Screenshot from 2023-01-05 12-20-01.png"
      );
      formdata.append("action", "formcommand");
      formdata.append("docType", "profile");

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      fetch(
        baseApi?.baseurl,
        // "https://server.qodequay.com/tajurba/dev/api/api/apppipeline/",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          formik.setFieldValue("package_image", result?.data?.data?.Location);
          // setUploadedFile(result?.data?.data?.Location);
        })
        .catch((error) => console.log("error", error));
    } else {
      toast.error("Only jpg or png should be allowed");
    }
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
          {!showCreateSubscriptionPlansPage ? (
            <div className="row">
              <div className="col-6">
                <div className="row position-relative mb-3">
                  <div>
                    <h3 className="headText mt-2 mb-2 fw-bold">
                      Subscription Plans
                    </h3>
                  </div>
                </div>
              </div>
              {TajurbaAdmin_priviledge_data &&
              TajurbaAdmin_priviledge_data.some(
                (ele) =>
                  ele.title === "Subsciption plans" && ele.is_edit === true
              ) ? (
                <div className="col-6">
                  <div className="saveBtn">
                    <button
                      onClick={handleClickAddSubscription}
                      className="btn bgBlack text-white px-4 float-end"
                    >
                      <span>
                        <i className="fa fa-solid fa-plus me-1 text-white"></i>{" "}
                        Create Subscription
                      </span>
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="row">
              <div className="col-6">
                <div className="row position-relative mb-3">
                  <span
                    // to="/subscription-plans"
                    onClick={handleClickBackButton}
                    className="w-auto float-start pe-1 textBlack d-flex align-items-center text-decoration-none"
                  >
                    <div className="backArrow me-3">
                      <i className="fa fa-solid fa-chevron-left"></i>
                    </div>

                    <h4 className="headText mt-2 mb-2 fw-bold w-auto textBlack">
                      Create Subscription Plans
                    </h4>
                  </span>
                </div>
              </div>
              <div className="col-6 d-flex justify-content-end">
                <div class="cancelBtn">
                  <span
                    onClick={handleClickBackButton}
                    disabled={loading}
                    className="btn btn-reject me-3 px-4"
                    //  to="/subscription-plans"
                  >
                    <span class="">Cancel</span>
                  </span>
                </div>
                <div className="saveBtn">
                  <span
                    className="btn bgBlack text-white border-radius-2 px-4 float-end"
                    onClick={formik.handleSubmit}
                    type="submit"
                    disabled={loading}
                  >
                    <span>
                      {loading && (
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      )}
                      Save
                    </span>
                  </span>
                </div>
              </div>
            </div>
          )}
          <div className="row" id="">
            {errorMessage ? (
              <span className="text-danger text-end">{errorMessage}</span>
            ) : null}
            <div className="col-12">
              <div className="main-card bg-white h-100 p-4">
                {!showCreateSubscriptionPlansPage ? (
                  <div className="row p-5">
                    {subscriptionDetails &&
                      subscriptionDetails?.map((ele, index) => {
                        return (
                          <div key={index} className="col-6 mb-4">
                            <div
                              className={
                                ele?.payment_type === "Paid"
                                  ? "buynow-page p-4"
                                  : "freenow-page p-4"
                              }
                            >
                              <div className="p-4">
                                <h2
                                  className={
                                    ele?.payment_type === "Free"
                                      ? "text-white fw-bold self-font-family"
                                      : "text-dark fw-bold self-font-family"
                                  }
                                >
                                  {ele?.name}
                                </h2>
                                {/* <p className={ele?.payment_type === "Free" ? "text-white" : "text-dark "}>
                                                      {showFullDescriptions[index]
                                                         ? ele?.description
                                                         : ele?.description.slice(0, 200)}{" "}
                                                      {ele?.description.length > 200 && (
                                                         <NavLink onClick={() => toggleDescription(index)} className="moreText">
                                                            ... {showFullDescriptions[index] ? "Show less" : "Show more"}
                                                         </NavLink>
                                                      )}
                                                      
                                                   </p> */}
                                <p
                                  className={`text-description ${
                                    showFullDescriptions[index]
                                      ? "auto-height"
                                      : ""
                                  } ${
                                    ele.payment_type === "Free"
                                      ? "text-white"
                                      : "text-dark"
                                  }`}
                                >
                                  {showFullDescriptions[index]
                                    ? ele?.description
                                    : ele?.description.slice(0, 140)}{" "}
                                  {ele?.description.length > 140 && (
                                    <NavLink
                                      onClick={() => toggleDescription(index)}
                                      className="ms-2"
                                    >
                                      ...{" "}
                                      {showFullDescriptions[index]
                                        ? "Show less"
                                        : "Show more"}
                                    </NavLink>
                                  )}
                                </p>

                                <div className="">
                                  <NavLink
                                    className={
                                      ele?.payment_type === "Paid"
                                        ? "btn bgDarkBlack border-0 text-white px-4"
                                        : "btn bg-white border-0 textBlack fw-bold px-5"
                                    }
                                    to=""
                                  >
                                    <span className="self-font-family">
                                      {ele?.payment_type === "Free"
                                        ? "Free"
                                        : `Pay ₹ ${ele?.amount}/-`}
                                    </span>
                                  </NavLink>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    {/* <div className="col-5 mb-4">
                      <div className="buynow-page p-4">
                        <div className="p-4">
                          <h2 className="text-dark fw-bold self-font-family">
                            Paid Plan
                          </h2>
                          <p className="text-dark">
                            This is a yearly plan which provides free access to
                            all the premium courses and its communities so you
                            don`&#39;`t have to wait for anything.
                          </p>
                          <div className="">
                            <NavLink
                              className="btn bgBlack border-0 text-white border-radius-10 px-4"
                              to=""
                            >
                              <span>Pay ₹3500/-</span>
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    {/* <div className="col-5 mb-4">
                      <div className="freenow-page p-4">
                        <div className="p-4">
                          <h2 className="text-white fw-bold self-font-family">
                            Free Plan
                          </h2>
                          <p className="text-white">
                            This is a yearly plan which provides free access to
                            all the premium courses and its communities so you
                            don`&#39;`t have to wait for anything.
                          </p>
                          <div className="">
                            <NavLink
                              className="btn bg-white border-0 textBlack fw-bold border-radius-10 px-5"
                              to=""
                            >
                              <span>Free</span>
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                ) : (
                  <>
                    <div className="row" id="createContent">
                      <form onSubmit={formik.handleSubmit}>
                        <div className="row">
                          <div className="col-5">
                            <p className="mb-2">
                              <span class="mandatory-star me-1">*</span>Upload
                              package image here
                            </p>
                            <p class="addUserPic rounded-3 borderDashed border-2 mb-2 p-0 d-flex justify-content-center align-items-center">
                              {formik.values.package_image ? (
                                <img
                                  // crossOrigin="Anonymous"
                                  src={formik.values.package_image}
                                  alt=""
                                  className="img-fluid w-auto"
                                  id="profile-picture-custome"
                                  style={{ height: "223px" }}
                                />
                              ) : (
                                <div className="d-flex align-items-end justify-content-center h-100 w-100">
                                  <div className="bg-white w-100 p-3">
                                    <span class="d-flex align-items-center justify-content-center">
                                      {/* <i class="fa-solid fa-arrow-up-from-bracket font-size-16 me-2"></i> */}
                                      <svg
                                        width="24"
                                        height="16"
                                        viewBox="0 0 24 16"
                                        className="me-2"
                                      >
                                        <path
                                          id="Icon_material-cloud-upload"
                                          data-name="Icon material-cloud-upload"
                                          d="M19.35,12.04a7.492,7.492,0,0,0-14-2A6,6,0,0,0,6,22H19a4.986,4.986,0,0,0,.35-9.96ZM14,15v4H10V15H7l5-5,5,5Z"
                                          transform="translate(0 -6)"
                                          fill="#707070"
                                        />
                                      </svg>
                                      <p className="m-0">
                                        Upload package image
                                      </p>
                                    </span>
                                  </div>
                                </div>
                              )}
                              <label
                                class="custom-file-label mb-0"
                                for="customFile"
                              ></label>
                              <input
                                type="file"
                                class="custom-file-input"
                                id="Title"
                                name="package_image"
                                accept="image/jpeg, image/png"
                                onChange={(e) => {
                                  UploadFile(e);
                                }}
                              />
                            </p>
                            {formik.errors.package_image &&
                            formik.touched.package_image ? (
                              <div className="text-danger">
                                {formik.errors.package_image}
                              </div>
                            ) : null}
                          </div>

                          <div className="col-7">
                            <div className="row">
                              <div className="col-12">
                                <label class="form-label" for="name">
                                  Package Name
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="name"
                                  placeholder="Enter Package Name"
                                  required=""
                                  name="package_name"
                                  onChange={formik.handleChange}
                                />
                                {formik.errors.package_name &&
                                formik.touched.package_name ? (
                                  <div className="text-danger">
                                    {formik.errors.package_name}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                            <div className="row mt-3">
                              <div className="col-12">
                                <label class="form-label" for="name">
                                  Package Descriptions
                                </label>

                                <textarea
                                  className="form-control"
                                  placeholder="Mention description in details..."
                                  id="floatingTextarea2"
                                  name="package_description"
                                  onChange={formik.handleChange}
                                  rows={4}
                                ></textarea>
                                {formik.errors.package_description &&
                                formik.touched.package_description ? (
                                  <div className="text-danger">
                                    {formik.errors.package_description}
                                  </div>
                                ) : null}
                              </div>
                            </div>

                            <div className="row my-3">
                              <div className="col-12">
                                <div className="form-check form-check-inline">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    id="inlineRadio1"
                                    name="package_type"
                                    defaultValue="Free"
                                    onChange={formik.handleChange}
                                  />

                                  <label
                                    className="form-check-label"
                                    htmlFor="inlineRadio1"
                                  >
                                    Free
                                  </label>
                                </div>
                                <div className="form-check form-check-inline">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="package_type"
                                    id="inlineRadio2"
                                    defaultValue="Paid"
                                    onChange={formik.handleChange}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="inlineRadio2"
                                  >
                                    Paid
                                  </label>
                                </div>
                                {formik.errors.package_type &&
                                formik.touched.package_type ? (
                                  <div className="text-danger">
                                    {formik.errors.package_type}
                                  </div>
                                ) : null}
                              </div>
                            </div>

                            {formik?.values?.package_type === "Free" ? (
                              <div className="row mb-3">
                                <div className="col-12">
                                  <label className="form-label">
                                    Name the button
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control w-50"
                                    placeholder="Free"
                                    name="button_name"
                                    onChange={formik.handleChange}
                                  />
                                  {formik.errors.button_name &&
                                  formik.touched.button_name ? (
                                    <div className="text-danger">
                                      {formik.errors.button_name}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            ) : null}
                            {formik?.values?.package_type === "Paid" ? (
                              <div className="row mb-3" id="rupees">
                                <div className="col-6">
                                  <label className="form-label">
                                    Mention amount for joining this classroom
                                  </label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    min={0}
                                    placeholder="₹ 300"
                                    name="amount"
                                    onChange={formik.handleChange}
                                    onKeyPress={(e) => {
                                      if (
                                        e.key === "-" ||
                                        e.key === "." ||
                                        e.key === "+" ||
                                        e.key === "e" ||
                                        e.key === "E"
                                      ) {
                                        e.preventDefault();
                                      }
                                    }}
                                  />
                                  {formik.errors.amount &&
                                  formik.touched.amount ? (
                                    <div className="text-danger">
                                      {formik.errors.amount}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-6">
                                  <label className="form-label">
                                    Select the type of subscription
                                  </label>
                                  <select
                                    className="form-select w-50"
                                    aria-label="Default select example"
                                    name="subscription_type"
                                    onChange={formik.handleChange}
                                  >
                                    <option selected="" value="">
                                      Select
                                    </option>

                                    <option value="Monthly">Monthly</option>
                                    <option value="One Time">One Time</option>
                                    <option value="Yearly">Yearly</option>
                                  </select>
                                  {formik.errors.subscription_type &&
                                  formik.touched.subscription_type ? (
                                    <div className="text-danger">
                                      {formik.errors.subscription_type}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </form>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </AppLayout> */}
    </>
  );
};

export default SubscriptionPlans;
