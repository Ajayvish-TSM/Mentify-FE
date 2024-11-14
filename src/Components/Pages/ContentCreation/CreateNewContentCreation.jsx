/* eslint-disable */
import React, { useEffect, useState } from "react";
// import AppLayout from "../../Loyout/App";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import DateAndTimeLayout from "../../Common/DateAndTimeLayout";
import IconGallery from "../../../assets/images/IconGallery.svg";
import { useFormik } from "formik";
import API from "../../../Api/Api";
import AdminRoute from "./../../../Route/RouteDetails";
import baseApi from "../../../Api/config";
import { ToastContainer, toast } from "react-toastify";
import FilterSearch from "../../Common/FilterSearch";
import { EditFilled } from "@ant-design/icons";
import { isEditable } from "@testing-library/user-event/dist/utils";
import { Tooltip, message } from "antd";

const CreateNewContentCreation = () => {
  const adminObject = JSON.parse(localStorage.getItem("TajurbaAdminToken"));
  const { state } = useLocation();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [listingData, setListingData] = useState([]);
  const TajurbaAdmin_priviledge_data = JSON.parse(
    localStorage.getItem("TajurbaAdmin_priviledge_data")
  );
  const initialValues = {
    leave_code: "",
    leave_name: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [loadingData, setLoadingData] = useState(false);

  const [currentTab, setCurrentTab] = useState(
    state?.moderator_previousTab
      ? state?.moderator_previousTab
      : "Moderator_pending"
  );

  const CheckAccess =
    TajurbaAdmin_priviledge_data &&
    TajurbaAdmin_priviledge_data.some(
      (ele) =>
        ele.title === "Leave Management" &&
        ele.is_active === true &&
        ele?.submenu &&
        ele?.submenu.some(
          (sub) => sub.title === "Create Leave" && sub.is_active === true
        )
    );

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  const navigate = useNavigate();

  const validate = (values) => {
    console.log(values, "value");
    const errors = {};

    if (!values.leave_name) {
      errors.leave_name = "Please enter leave name";
    }
    if (!values.leave_code) {
      errors.leave_code = "Please enter leave code";
    } else if (values.leave_code.length < 2) {
      errors.leave_code = "Please enter more than 1 character";
    } else if (values.leave_code.trim() === "") {
      errors.leave_code = "Leave Code cannot be blank";
    }
    // if (!values.leaves) {
    //   errors.leave = "Please type numbers of leave to be provide.";
    // }
    setFormErrors(errors);
    console.log("Erroes", errors);

    return errors;
  };
  // const formik = useFormik({
  //   initialValues: {
  //     leave_name: "",
  //     leave_code: "",
  //   },
  //   onSubmit: (values, { setSubmitting }) => {
  //     const errors = validate(values);

  //     if (Object.keys(errors).length === 0) {
  //       // console.log("Run vaidation function no errors");
  //       handleSave();
  //     } else {
  //       // console.log("Run vaidation function if errors is present ");

  //       console.log("Validation errors:", errors);
  //     }

  //     setSubmitting(false);
  //   },
  //   validate,
  // });

  useEffect(() => {
    setLoadingData(true);
    try {
      API?.CommanApiCall({
        data: {},
        agent: "leave_create_list",
      }).then((response) => {
        console.log(response);
        if (response?.data?.data?.status === 200) {
          setLoadingData(false);
          setListingData(response.data.data.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setLoading(true);
      const apiData = {
        leave_code: formValues.leave_code,
        leave_name: formValues.leave_name,
      };
      if (editItemId) {
        apiData["leave_id"] = editItemId;
      }
      try {
        API?.CommanApiCall({
          data: apiData,
          agent: editItemId ? "leave_management_update" : "leave_management",
        }).then((response) => {
          console.log(response);
          if (response?.data?.data?.status === 200) {
            setLoading(false);
            setEditItemId(null);
            navigate(0);
          } else if (response?.data?.data?.status === 201) {
            setErrorMessage(response?.data?.data?.message);
            setLoading(false);

            setTimeout(() => {
              setErrorMessage("");
            }, 5000);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [formErrors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleEdit = (item) => {
    setEditItemId(item._id);
    formik.setValues({
      leave_code: item.leave_code,
      leave_name: item.leave_name,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  // const handleSave = (e) => {
  //   e.preventDefault();
  //   setFormErrors(validate(formValues));
  //   setIsSubmit(true);

  //   if (Object.keys(validate(formValues)).length === 0) {
  //     message.success("Form submitted successfully!");
  //   }
  // };

  console.log("listing data", listingData);

  return (
    <>
      {/* <AppLayout> */}
      <ToastContainer />
      <div className="main-content">
        <div className="page-content">
          {/* start page title */}
          <DateAndTimeLayout />
          {/* end page title */}
          <div className="row">
            <div className="col-6">
              <div className="row position-relative mb-3">
                <div>
                  <h3 className="headText mt-2 mb-2 fw-bold">Create Leave</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="row" id="createContent">
            <div className="row justify-content-between main-card p-4" style={{ marginLeft: "12px" }}>
              {errorMessage ? (
                <span className="text-danger text-end">{errorMessage}</span>
              ) : null}
              <div className="col-xl-6 col-lg-6">
                <div className="me-xl-5">
                  {/* content title */}
                  <div className="d-flex mb-3">
                    <div className="col-8">
                      <label className="form-label">
                        <span className="mandatory-star me-1">*</span>
                        Leave Code
                      </label>
                      {/* <input
                          type="text"
                          className="form-control w-80 border-radius-2"
                          aria-label="Leave Code"
                          name="leave_code"
                          disabled={!CheckAccess}
                          onChange={(e) => {
                            formik.setFieldValue("leave_code", e.target.value);
                          }}
                          value={formik.values.leave_code}
                        /> */}
                      <input
                        type="text"
                        className="form-control w-80 border-radius-2"
                        aria-label="Leave Code"
                        name="leave_code"
                        disabled={!CheckAccess}
                        onChange={(e) => {
                          const inputValue = e.target.value.toUpperCase(); // Convert to uppercase
                          setFormValues((prevValues) => ({
                            ...prevValues,
                            leave_code: inputValue, // Update only the leave_code field
                          }));
                        }}
                        value={formValues.leave_code}
                      />

                      <p className="text-danger">{formErrors?.leave_code}</p>
                    </div>

                    <div className="col-8">
                      <label className="form-label">
                        <span className="mandatory-star me-1">*</span>
                        Leave Name
                      </label>
                      <input
                        type="text"
                        className="form-control w-80 border-radius-2"
                        name="leave_name"
                        aria-label="Leave Name input"
                        disabled={!CheckAccess}
                        onChange={(e) => handleChange(e)}
                        value={formValues.leave_name}
                      />
                      {/* <p className="text-danger">{formik.errors.category}</p> */}
                      <p className="text-danger">{formErrors?.leave_name}</p>
                    </div>

                    {/* <div className="col-8">
                        <label className="form-label">
                          <span className="mandatory-star me-1">*</span>
                          Leave Balance
                        </label>

                        <input
                          type="text"
                          className="form-control w-80 border-radius-2"
                          aria-label="Leave balance input"
                          name="leaves"
                          onChange={formik.handleChange}
                          value={formik.values.leaves} // Ensure 'leaveBalance' is defined in Formik initial values
                        />
                        <datalist id="categoryOptions">
                          {CategoryList &&
                            CategoryList.map((ele, index) => (
                              <option key={index} value={ele?.category_name}>
                                {ele?.category_name}
                              </option>
                            ))}
                        </datalist>
                      </div> */}

                    {/* {formik.errors.category && formik.touched.category ? (
                        <div className="text-danger">
                          {formik.errors.category}
                        </div>
                      ) : null} */}
                    <div style={{ marginTop: "25px" }}>
                      {CheckAccess ? (
                        <div className="saveBtn">
                          <button
                            className="btn profileBtn text-white px-4 float-end"
                            onClick={(e) => handleSave(e)}
                            disabled={loading}
                            style={{
                              display: "flex",
                              backgroundColor: "#62a6dc",
                              borderRadius: "20px",
                              fontWeight: "bold",
                            }}
                          >
                            {loading && (
                              <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                              ></span>
                            )}
                            Submit
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-2" id="">
            <div className="col-6"></div>
          </div>
          <div
            className={
              currentTab === "Moderator_pending"
                ? "tab-pane main-card active p-3 mb-0 box-shadow-bottom-none"
                : "tab-pane main-card p-3 mb-0 box-shadow-bottom-none"
            }
            id="to-Be-Reviewed"
            role="tabpanel"
          // style={{ overflowY: "scroll", height: "20rem" }}
          >
            <div className="table-responsive">
              <table className="table mb-0 tablesWrap">
                <thead>
                  <tr>
                    <th style={{ fontWeight: "700" }}>S.No</th>
                    <th style={{ fontWeight: "700" }}>Leave Code</th>
                    <th style={{ fontWeight: "700" }}>Leave Name</th>

                    <th style={{ fontWeight: "700" }}>Created On</th>
                    <th style={{ fontWeight: "700" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingData ? (
                    <tr>
                      <td colSpan={6}>
                        <div className="d-flex justify-content-center">
                          <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <>
                      {listingData && listingData?.length ? (
                        listingData?.map((ele, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}.</td>
                              <td>{ele?.leave_code}</td>
                              <td>{ele?.leave_name}</td>
                              <td>
                                {new Date(ele?.createdAt).toLocaleString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </td>
                              <td>
                                <Tooltip title="Edit">
                                  <button
                                    className="btn btn-sm"
                                    onClick={() => handleEdit(ele)}
                                  >
                                    <EditFilled
                                      style={{
                                        fontSize: "20px",
                                        color: "#1EB9F3",
                                      }}
                                    />
                                  </button>
                                </Tooltip>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <>
                          <tr>
                            <td colSpan={6} className="text-center">
                              No data Found
                            </td>
                          </tr>
                        </>
                      )}{" "}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateNewContentCreation;
