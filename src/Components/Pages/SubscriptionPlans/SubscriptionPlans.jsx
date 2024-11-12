/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DateAndTimeLayout from "../../Common/DateAndTimeLayout";
import { useFormik } from "formik";
import API from "../../../Api/Api";
import { ToastContainer, toast } from "react-toastify";
import { Tooltip } from "antd";

const SubscriptionPlans = () => {
  const adminObject = JSON.parse(localStorage.getItem("TajurbaAdminToken"));
  const { state } = useLocation();
  const [listingData, setListingData] = useState([]);
  const [leaveData, setLeaveData] = useState([]);
  const TajurbaAdmin_priviledge_data = JSON.parse(
    localStorage.getItem("TajurbaAdmin_priviledge_data")
  );

  const [formErrors, setFormErrors] = useState({});
  const [currentTab, setCurrentTab] = useState(
    state?.moderator_previousTab
      ? state?.moderator_previousTab
      : "Moderator_pending"
  );

  const CheckAccess =
    TajurbaAdmin_priviledge_data &&
    TajurbaAdmin_priviledge_data.some(
      (ele) => ele.title === "Apply Leave" && ele.is_active === true
    );

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  const navigate = useNavigate();

  const validate = (values) => {
    console.log(values, "value");
    const errors = {};
    if (!values.leave_code) {
      errors.leave_code = "Please select leave code ";
    }
    if (!values.from_date) {
      errors.from_date = "Please enter start date";
    }
    if (!values.to_date) {
      errors.to_date = "Please enter end date";
    }
    if (!values.leave_reason) {
      errors.leave_reason = "Please enter reason for leave.";
    }
    console.log("Errors", errors);
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      leave_code: "",
      from_date: "",
      to_date: "",
      leave_reason: "",
      status: "pending",
    },
    onSubmit: (values, { setSubmitting }) => {
      console.log("ssssssssssssssssssssssssss");
      const errors = validate(values);

      if (Object.keys(errors).length === 0) {
        console.log("hhhhhhhhhhhhhhhhh");
        handleSave();
      } else {
        console.log("Validation errors:", errors);
      }
      setSubmitting(false);
    },
    validate,
  });

  useEffect(() => {
    try {
      API?.CommanApiCall({
        data: {},
        agent: "leave_create_list",
      }).then((response) => {
        console.log(response);
        if (response?.data?.data?.status === 200) {
          setListingData(response.data.data.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      API?.CommanApiCall({
        data: {},
        agent: "leave_application",
        function: "get_leave_application",
      }).then((response) => {
        console.log("leave", response);
        if (response?.data?.data?.status === 200) {
          setLeaveData(response.data.data.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleEdit = (item) => {
    setEditItemId(item._id);
    formik.setValues({
      from_date: item.from_date,
      to_date: item.to_date,
      leave_code: item.leave_code,
      leave_reason: item.leave_reason,
      status: item.status,
    });
  };

  const handleSave = () => {
    setErrorMessage("");
    setLoading(true);
    try {
      API?.CommanApiCall({
        data: {
          user_id: "657170a49741e13095d51ebc",
          from_date: formik.values.from_date,
          to_date: formik.values.to_date,
          leave_code: formik.values.leave_code,
          leave_reason: formik.values.leave_reason,
          status: formik.values.status,
        },
        agent: "leave_application",
        id: editItemId,
      }).then((response) => {
        console.log(response);
        if (response?.data?.data?.status === 200) {
          setLoading(false);
          setEditItemId(null);
          navigate(0);
        } else if (response?.data?.data?.status === 201) {
          setErrorMessage(response?.data?.data?.message);
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  // console.log("listing data", listingData);

  return (
    <>
      <ToastContainer />
      <div className="main-content">
        <div className="page-content">
          <DateAndTimeLayout />
          <div className="row mt-5">
            <div className="col-6">
              <div className="row position-relative mb-3">
                <div>
                  <h3 className="headText mt-2 mb-2 fw-bold">Leave </h3>
                </div>
              </div>
            </div>
            <div className="col-6">
              {CheckAccess ? (
                <div className="saveBtn">
                  <button
                    className="btn profileBtn border-radius-5 text-white border-radius-10 px-4 float-end"
                    onClick={formik.handleSubmit}
                    type="submit"
                    disabled={loading}
                  >
                    {loading && (
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    )}
                    Apply
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          <div className="row" id="createContent">
            <form onSubmit={formik.handleSubmit}>
              <div className="row justify-content-between main-card p-4">
                {errorMessage ? (
                  <span className="text-danger text-end">{errorMessage}</span>
                ) : null}
                <div className="col-xl-6 col-lg-6">
                  <div className="me-xl-5">
                    {/* content title */}
                    <div className="d-flex mb-3">
                      <div className="col-6">
                        <label className="form-label">
                          <span className="mandatory-star me-1">*</span>
                          Leave Code
                        </label>
                        <select
                          className="form-select w-80 border-radius-2"
                          aria-label="Default select example"
                          name="leave_code"
                          disabled={!CheckAccess}
                          onChange={formik.handleChange}
                        >
                          <option selected="" value="">
                            Select
                          </option>
                          {listingData &&
                            listingData?.map((ele, index) => {
                              return (
                                <option
                                  selected=""
                                  value={ele?.leave_code}
                                  key={index}
                                  checked={formik.values.leave_code.includes(
                                    ele
                                  )}
                                  onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    if (isChecked) {
                                      formik.setFieldValue(
                                        "leave_code",
                                        [...formik.values.leave_code, ele],
                                        true
                                      );
                                    } else {
                                      formik.setFieldValue(
                                        "leave_code",
                                        formik.values.leave_code.filter(
                                          (selectedOption) =>
                                            selectedOption !== ele
                                        ),
                                        true
                                      );
                                    }
                                  }}
                                >
                                  {ele?.leave_code}
                                </option>
                              );
                            })}
                        </select>
                      </div>

                      <div className="col-6 mb-3">
                        <label className="form-label">
                          <span className="mandatory-star me-1">*</span>
                          Start Date
                        </label>
                        <input
                          type="date"
                          className="form-control w-80 border-radius-2"
                          name="from_date"
                          disabled={!CheckAccess}
                          onChange={formik.handleChange}
                          value={formik.values.from_date}
                        />
                      </div>

                      <div className="col-6 mb-3">
                        <label className="form-label">
                          <span className="mandatory-star me-1">*</span>
                          End Date
                        </label>
                        <input
                          type="date"
                          className="form-control w-80 border-radius-2"
                          name="to_date"
                          disabled={!CheckAccess}
                          onChange={formik.handleChange}
                          value={formik.values.to_date}
                        />
                      </div>
                      <div className="col-10 mb-3">
                        <label className="form-label">
                          <span className="mandatory-star me-1">*</span>
                          Reason
                        </label>
                        <textarea
                          className="form-control w-80 border-radius-2"
                          name="leave_reason"
                          aria-label="Leave Reason"
                          disabled={!CheckAccess}
                          onChange={formik.handleChange}
                          value={formik.values.leave_reason}
                          rows="3"
                        />
                      </div>

                      {formik.errors.category && formik.touched.category ? (
                        <div className="text-danger">
                          {formik.errors.category}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </form>
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
          >
            <div className="table-responsive">
              <table className="table mb-0 tablesWrap">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th className="">Leave Code</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                    <th>Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
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
                      {leaveData && leaveData?.length ? (
                        leaveData?.map((ele, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}.</td>
                              <td>{ele?.leave_code}</td>
                              <td>
                                {new Date(ele?.from_date).toLocaleString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </td>
                              <td>
                                {new Date(ele?.to_date).toLocaleString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </td>
                              <td>{ele?.status}</td>
                              <td>
                                <Tooltip
                                  title={
                                    ele?.leave_reason?.length > 20
                                      ? ele.leave_reason
                                      : ""
                                  }
                                >
                                  {ele?.leave_reason?.length > 20
                                    ? `${ele.leave_reason.slice(0, 20)}...`
                                    : ele.leave_reason}
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

export default SubscriptionPlans;
