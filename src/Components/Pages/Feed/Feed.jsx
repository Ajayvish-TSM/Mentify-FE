
import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import DateAndTimeLayout from "../../Common/DateAndTimeLayout";
import IconGallery from "../../../assets/images/IconGallery.svg";
import { useFormik } from "formik";
import API from "../../../Api/Api";
import { ToastContainer, toast } from "react-toastify";
import FilterSearch from "../../Common/FilterSearch";
import { EditFilled } from "@ant-design/icons";
import { Tooltip } from "antd";
import Pagination from "../../Common/Pagination";

const Feed = () => {
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
        ele.title === "Holiday" &&
        ele.is_active === true &&
        ele?.submenu &&
        ele?.submenu.some(
          (sub) => sub.title === "Create Holiday" && sub.is_active === true
        )
    );

  // Functionality for Filter and search
  // const FilterOptions = [
  //   // { label: "All", value: "all" },
  //   { label: "Title", value: "course_title" },
  //   { label: "Author", value: "author_name" },
  //   { label: "Course Type", value: "course_type" },
  //   { label: "Date", value: "createdAt" },
  // ];

  const [errorMessage, SetErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalPagess, setTotalPage] = useState();
  const [totalItems, setTotalItems] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [goToPage, setGoToPage] = useState(1);
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const validate = (values) => {
    console.log(values, "value");
    const errors = {};
    if (!values.holiday_name) {
      errors.holiday_name = "Please type name of holiday.";
    }
    if (!values.holiday_date) {
      errors.holiday_date = "Please enter date of holiday.";
    }
    if (!values.is_compulsory) {
      errors.is_compulsory = "Please choose type of holiday.";
    }
    console.log("Erroes", errors);
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      holiday_name: "",
      holiday_date: "",
      is_compulsory: false,
      // createdAt: "",
    },
    onSubmit: (values, { setSubmitting }) => {
      const errors = validate(values);

      if (Object.keys(errors).length === 0) {
        handleSave();
      } else {
        console.log("Validation errors:", errors);
      }

      setSubmitting(false);
    },
    validate,
  });

  const GetHolidayList = () => {
    try {
      API?.CommanApiCall({
        data: { page_no: currentPage, limit: itemsPerPage },
        agent: "holiday_create",
        function: "get_holiday_list",
      }).then((response) => {
        console.log(response);
        if (response?.data?.data?.status === 200) {
          setListingData(response.data.data.data);
          setTotalPage(response?.data?.data?.total_pages);
          setTotalItems(response?.data?.data?.total_records);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetHolidayList();
  }, [currentPage, itemsPerPage]);
  const handleSave = () => {
    SetErrorMessage("");
    setLoading(true);

    const apiData = {
      holiday_name: formik.values.holiday_name,
      holiday_date: formik.values.holiday_date,
      is_compulsory: formik.values.is_compulsory,
    };

    const agentType = "holiday_create";
    const functionType = isEditMode ? "update_holiday_list" : null;

    // Conditionally add ID for edit functionality
    if (isEditMode && selectedItem) {
      apiData["holiday_id"] = selectedItem._id;
    }

    try {
      API?.CommanApiCall({
        data: apiData,
        agent: agentType,
        function: functionType,
      }).then((response) => {
        console.log(response);
        if (response?.data?.data?.status === 200) {
          setLoading(false);
          setIsEditMode(false);
          setSelectedItem(null);
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

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsEditMode(true);
    formik.setValues({
      holiday_name: item.holiday_name,
      holiday_date: new Date(item.holiday_date).toISOString().split("T")[0],
      is_compulsory: item.is_compulsory,
    });
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
          <div className="row">
            <div className="col-6">
              <div className="row position-relative mb-3">
                <div>
                  <h3 className="headText mt-2 mb-2 fw-bold">
                    Holiday Details
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div className="row" id="createContent">
            <form onSubmit={formik.handleSubmit}>
              <div
                className="row justify-content-between main-card p-4"
                style={{ marginLeft: "2px" }}
              >
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
                          Holiday Name
                        </label>
                        <input
                          type="text"
                          className="form-control w-80 border-radius-2"
                          aria-label="Leave Code"
                          name="holiday_name"
                          disabled={!CheckAccess}
                          onChange={(e) => {
                            formik.setFieldValue(
                              "holiday_name",
                              e.target.value
                            );
                          }}
                          value={formik.values.holiday_name}
                        />
                      </div>

                      <div className="col-8">
                        <label className="form-label">
                          <span className="mandatory-star me-1">*</span>
                          Holiday Date
                        </label>
                        <input
                          type="date" // Changed from "text" to "date"
                          className="form-control w-80 border-radius-2"
                          name="holiday_date"
                          aria-label="Holiday Date input"
                          disabled={!CheckAccess}
                          onChange={formik.handleChange}
                          value={formik.values.holiday_date}
                          style={{cursor: "pointer"}}
                        />
                      </div>

                      <div className="col-8">
                        <label className="form-label">
                        <span className="mandatory-star me-1">*</span>
                          Holiday Type
                        </label>
                        <div>
                          <label className="me-3">
                            <input
                              type="radio"
                              name="holiday_type"
                              value="mandatory"
                              checked={formik.values.is_compulsory === "true"}
                              onChange={() =>
                                formik.setFieldValue("is_compulsory", "true")
                              }
                              disabled={!CheckAccess}
                              style={{cursor: "pointer"}}
                            />
                            <span className="ms-1">Mandatory</span>
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="holiday_type"
                              value="optional"
                              checked={formik.values.is_compulsory === "false"}
                              onChange={() =>
                                formik.setFieldValue("is_compulsory", "false")
                              }
                              disabled={!CheckAccess}
                              style={{cursor: "pointer"}}
                            />
                            <span className="ms-1 mb-5">Optional</span>
                          </label>
                        </div>
                      </div>

                      {formik.errors.category && formik.touched.category ? (
                        <div className="text-danger">
                          {formik.errors.category}
                        </div>
                      ) : null}
                      <div>
                        {CheckAccess ? (
                          <div
                            className="saveBtn"
                            style={{ marginTop: "30px" }}
                          >
                            <button
                              className="btn profileBtn text-white px-4 float-end"
                              onClick={formik.handleSubmit}
                              type="submit"
                              style={{
                                display: "flex",
                                backgroundColor: "#62a6dc",
                                borderRadius: "20px",
                              }}
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
                    <th style={{ fontWeight: "700" }}>S.No.</th>
                    <th style={{ fontWeight: "700" }}>Holiday Name</th>
                    <th style={{ fontWeight: "700" }}>Holiday Type</th>
                    <th style={{ fontWeight: "700" }}>Holiday Date</th>
                    <th style={{ fontWeight: "700" }}>Created On</th>
                    <th style={{ fontWeight: "700" }}>Action</th>
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
                              <td>{ele?.holiday_name}</td>
                              <td>
                                {ele?.is_compulsory ? "Mandatory" : "Optional"}
                              </td>
                              <td>
                                {new Date(ele?.holiday_date).toLocaleString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </td>
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
          <Pagination
            totalPagess={totalPagess}
            setTotalPage={setTotalPage}
            totalItems={totalItems}
            setTotalItems={setTotalItems}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
        </div>
      </div>
      {/* </AppLayout> */}
    </>
  );
};

export default Feed;
