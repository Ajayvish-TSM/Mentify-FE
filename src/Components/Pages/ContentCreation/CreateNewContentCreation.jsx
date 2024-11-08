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

const CreateNewContentCreation = () => {
  const adminObject = JSON.parse(localStorage.getItem("TajurbaAdminToken"));
  const { state } = useLocation();
  const [listingData, setListingData] = useState([]);
  const TajurbaAdmin_priviledge_data = JSON.parse(
    localStorage.getItem("TajurbaAdmin_priviledge_data")
  );

  const [currentTab, setCurrentTab] = useState(
    state?.moderator_previousTab
      ? state?.moderator_previousTab
      : "Moderator_pending"
  );

  const CheckAccess =
    TajurbaAdmin_priviledge_data &&
    TajurbaAdmin_priviledge_data.some(
      (ele) =>
        ele.title === "Content Creation" &&
        ele.is_active === true &&
        ele?.submenu &&
        ele?.submenu.some(
          (sub) =>
            sub.title === "Creator" &&
            sub.is_active === true &&
            sub?.submenuChild.some(
              (subMenuChild) =>
                subMenuChild.title === "Create new" &&
                subMenuChild.is_active === true &&
                subMenuChild.is_edit === true
            )
        )
    );

  const [errorMessage, SetErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  const navigate = useNavigate();

  const validate = (values) => {
    console.log(values, "value");
    const errors = {};
    if (!values.leave_code) {
      errors.leave_code = "Please type leave code ";
    }
    if (!values.leave_name) {
      errors.leave_name = "Please type leave name ";
    }
    // if (!values.leaves) {
    //   errors.leave = "Please type numbers of leave to be provide.";
    // }
    console.log("Erroes", errors);
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      leave_name: "",
      leave_code: "",
      leaves: "",
      createdAt: "",
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

  const handleEdit = (item) => {
    setEditItemId(item._id);
    formik.setValues({
      leave_code: item.leave_code,
      leave_name: item.leave_name,
      leaves: item.leaves,
    });
  };

  const handleSave = () => {
    SetErrorMessage("");
    setLoading(true);
    try {
      API?.CommanApiCall({
        data: {
          leave_code: formik.values.leave_code,
          leave_name: formik.values.leave_name,
          leaves: formik.values.leaves,
        },
        agent: editItemId ? "leave_management_update" : "leave_management",
        id: editItemId,
      }).then((response) => {
        console.log(response);
        if (response?.data?.data?.status === 200) {
          setLoading(false);
          setEditItemId(null);
          navigate(0);
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
  };
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
                    Submit
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
                      <div className="col-8">
                        <label className="form-label">
                          <span className="mandatory-star me-1">*</span>
                          Leave Code
                        </label>
                        <input
                          type="text"
                          className="form-control w-80 border-radius-2"
                          aria-label="Leave Code"
                          name="leave_code"
                          disabled={!CheckAccess}
                          onChange={(e) => {
                            formik.setFieldValue("leave_code", e.target.value);
                          }}
                          value={formik.values.leave_code}
                        />
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
                          onChange={formik.handleChange}
                          value={formik.values.leave_name}
                        />
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

                      {formik.errors.category && formik.touched.category ? (
                        <div className="text-danger">
                          {formik.errors.category}
                        </div>
                      ) : null}
                    </div>
                    {/* <div className="row mb-3">
                      <div className="col-12">
                        <label className="form-label">
                          <span className="mandatory-star me-1">*</span>Course
                          Title
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Title"
                          id="Title"
                          name="name"
                          disabled={!CheckAccess}
                          onChange={formik.handleChange}
                        />
                      </div>
                      {formik.errors.name && formik.touched.name ? (
                        <div className="text-danger">{formik.errors.name}</div>
                      ) : null}
                    </div> */}

                    {/* author name */}
                    {/* <div className="row mb-3">
                      <div className="col-12">
                        <label className="form-label">
                          <span className="mandatory-star me-1">*</span>Author
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter author name"
                          name="author_name"
                          disabled={!CheckAccess}
                          onChange={formik.handleChange}
                        />
                      </div>
                      {formik.errors.author_name &&
                      formik.touched.author_name ? (
                        <div className="text-danger">
                          {formik.errors.author_name}
                        </div>
                      ) : null}
                    </div> */}

                    {/* contengt decription */}
                    {/* <div className="row mb-3">
                      <div className="col-12">
                        <label className="form-label">
                          {" "}
                          <span className="mandatory-star me-1">*</span>Give
                          description
                        </label>
                        <textarea
                          type="text"
                          className="form-control"
                          placeholder="Describe the topic in detail"
                          id="Title"
                          name="description"
                          disabled={!CheckAccess}
                          onChange={formik.handleChange}
                          rows={4}
                          // onChange={forfa fa-solid fa-pen textBlackmik.handleChange}
                        />
                      </div>
                      {formik.errors.description &&
                      formik.touched.description ? (
                        <div className="text-danger">
                          {formik.errors.description}
                        </div>
                      ) : null}
                    </div> */}
                    {/* <div className="row mb-3">
                      <div className="col-12">
                        <label className="form-label">
                          <span className="mandatory-star me-1">*</span>Select
                          the course level
                        </label>
                        <select
                          className="form-select border-radius-2"
                          aria-label="Default select example"
                          name="course_level"
                          disabled={!CheckAccess}
                          onChange={formik.handleChange}
                        >
                          <option selected="" value="">
                            Select the course level
                          </option>
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                      </div>
                      {formik.errors.course_level &&
                      formik.touched.course_level ? (
                        <div className="text-danger">
                          {formik.errors.course_level}
                        </div>
                      ) : null}
                    </div> */}
                    {/* <div className="row mb-3">
                      <div className="col-12">
                        <label className="form-label">
                          <span className="mandatory-star me-1">*</span>Select
                          the type of Leave
                        </label>
                        <div className="ms-2">
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="type"
                              id="inlineRadio1"
                              disabled={!CheckAccess}
                              defaultValue="Free"
                              onChange={formik.handleChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="inlineRadio1"
                            >
                              Unpaid
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="type"
                              id="inlineRadio2"
                              disabled={!CheckAccess}
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
                        </div>
                      </div>
                      {formik.errors.type && formik.touched.type ? (
                        <div className="text-danger">{formik.errors.type}</div>
                      ) : null}
                    </div>
                    {formik.values.type === "Paid" ? (
                      <div className="row mb-3" id="rupees">
                        <div className="col-12">
                          <label className="form-label">
                            <span className="mandatory-star me-1">*</span>
                            Mention amount of your course along with one year
                            tenure for community
                          </label>
                          <input
                            type="number"
                            className="form-control w-70"
                            placeholder="₹ 3500"
                            disabled={!CheckAccess}
                            name="amount"
                            value={formik.values.amount}
                            onChange={formik.handleChange}
                          />
                        </div>
                        {formik.errors.amount && formik.touched.amount ? (
                          <div className="text-danger">
                            {formik.errors.amount}
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                    {formik.values.type === "Paid" ? (
                      <>
                        <div className="row" id="rupees">
                          <div className="col-6">
                            <label className="form-label">
                              Mention the discounted amount
                            </label>
                          </div>
                          <div className="col-6">
                            <label className="form-label">
                              Mention the tenure for discounted amount
                            </label>
                          </div>
                        </div>
                        <div className="row mb-3" id="rupees">
                          <div className="col-6">
                            {/* <label className="form-label">Mention the discounted amount</label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="₹ 3500"
                              name="discount_amount"
                              disabled={!CheckAccess}
                              value={formik.values.discount_amount}
                              onChange={formik.handleChange}
                            />
                          </div>
                          <div className="col-6">
                            <input
                              type="number"
                              className="form-control"
                              placeholder="5 days"
                              name="discount_tenure"
                              disabled={!CheckAccess}
                              value={formik.values.discount_tenure}
                              onChange={formik.handleChange}
                            />
                          </div>
                        </div>
                      </>
                    ) : null} */}
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
                    <th>Leave Name</th>

                    <th>Created On</th>
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
                      {listingData && listingData?.length ? (
                        listingData?.map((ele, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}.</td>
                              <td>{ele?.leave_code}</td>
                              <td>{ele?.leave_name}</td>
                              <td>
                                {new Date(ele?.createdAt).toLocaleString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true
                                })}
                              </td>
                              <td>
                                <button
                                  className="btn btn-sm btn-primary"
                                  onClick={() => handleEdit(ele)}
                                >
                                  Edit
                                </button>
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
