/* eslint-disable */
import React, { useEffect, useState } from "react";
// import AppLayout from "../../Loyout/App";
import { NavLink, useNavigate } from "react-router-dom";
import DateAndTimeLayout from "../../Common/DateAndTimeLayout";
import IconGallery from "../../../assets/images/IconGallery.svg";
import { useFormik } from "formik";
import API from "../../../Api/Api";
import AdminRoute from "./../../../Route/RouteDetails";
import baseApi from "../../../Api/config";
import { ToastContainer, toast } from "react-toastify";

const CreateNewContentCreation = () => {
  const adminObject = JSON.parse(localStorage.getItem("TajurbaAdminToken"));
  const TajurbaAdmin_priviledge_data = JSON.parse(
    localStorage.getItem("TajurbaAdmin_priviledge_data")
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

  const [CategoryList, setCategoryList] = useState();
  const [errorMessage, SetErrorMessage] = useState("");
  const [uploadedFile, setUploadedFile] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validate = (values) => {
    console.log(values, "value");
    const errors = {};
    if (!values.category) {
      errors.category = "Please select category";
    }
    if (!values.name) {
      errors.name = "Please enter category title";
    } else if (values.name.trim() === "") {
      errors.name = "Title cannot be blank";
    }
    if (!values.description) {
      errors.description = "Please enter description";
    } else if (values.description.trim() === "") {
      errors.description = "Description cannot be blank";
    }
    if (!values.author_name) {
      errors.author_name = "Please select author name";
    } else if (values.author_name.trim() === "") {
      errors.author_name = "author name cannot be blank";
    }
    if (!values.course_level) {
      errors.course_level = "Please select category course level";
    }

    if (!values.type) {
      errors.type = "Please enter type";
    }
    if (values.type === "Paid") {
      if (!values.amount) {
        errors.amount = "Please enter amount";
      }
    }

    if (!values.uploadedFile) {
      errors.uploadedFile = "Please upload Image";
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
      category: "",
      name: "",
      author_name: "",
      description: "",
      course_level: "",
      type: "",
      amount: "",
      Community: "",
      uploadedFile: "",
      detail_desciption: "",
      discount_amount: "",
      discount_tenure: "",
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
          course: {
            category_id: formik.values.category,
            course_title: formik.values.name,
            author_name: formik.values.author_name,
            description: formik.values.description,
            cover_img: formik.values.uploadedFile,
            course_type: formik.values.type,
            amount: formik.values.type === "Paid" ? formik.values.amount : null,
            discount_amount:
              formik.values.type === "Paid"
                ? formik.values.discount_amount
                : null,
            discount_tenure:
              formik.values.type === "Paid"
                ? formik.values.discount_tenure
                : null,
            course_level: formik.values.course_level,
            status: 0,
          },
        },
        agent: "course",
      }).then((response) => {
        console.log(response?.data?.data);
        if (response?.data?.data?.status === 200) {
          setLoading(false);
          navigate(
            `../${AdminRoute?.ContentCreation?.CreateContent.replace(
              "/:id",
              ""
            )}/${response?.data?.data?.data?.courseedition_id}`
          );
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

  // Category List API
  useEffect(() => {
    try {
      API?.CommanApiCall({
        data: {
          category: [],
        },
        agent: "categories",
      }).then((response) => {
        //   console.log(response.data?.data);
        // if (response?.data?.data?.status === 200) {
        setCategoryList(response.data?.data);

        // }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

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
          formik.setFieldValue("uploadedFile", result?.data?.data?.Location);
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
          <div className="row">
            <div className="col-6">
              <div className="row position-relative mb-3">
                <div>
                  <h3 className="headText mt-2 mb-2 fw-bold">Create New</h3>
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
                    Start
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
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="form-label">
                          <span className="mandatory-star me-1">*</span>
                          Category
                        </label>
                        <select
                          className="form-select w-50 border-radius-2"
                          aria-label="Default select example"
                          name="category"
                          disabled={!CheckAccess}
                          onChange={formik.handleChange}
                        >
                          <option selected="" value="">
                            Select
                          </option>
                          {CategoryList &&
                            CategoryList?.map((ele, index) => {
                              return (
                                <option
                                  selected=""
                                  value={ele?.category_id}
                                  key={index}
                                  checked={formik.values.category.includes(ele)}
                                  onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    if (isChecked) {
                                      formik.setFieldValue(
                                        "category",
                                        [...formik.values.category, item],
                                        true
                                      );
                                    } else {
                                      formik.setFieldValue(
                                        "category",
                                        formik.values.category.filter(
                                          (selectedOption) =>
                                            selectedOption !== item
                                        ),
                                        true
                                      );
                                    }
                                  }}
                                >
                                  {ele?.category_name}
                                </option>
                              );
                            })}
                          {/* <option selected="">Select</option>
                          <option value="Marketing">Marketing</option> */}
                        </select>
                      </div>
                      {formik.errors.category && formik.touched.category ? (
                        <div className="text-danger">
                          {formik.errors.category}
                        </div>
                      ) : null}
                    </div>
                    <div className="row mb-3">
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
                    </div>

                    {/* author name */}
                    <div className="row mb-3">
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
                    </div>

                    {/* contengt decription */}
                    <div className="row mb-3">
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
                    </div>
                    <div className="row mb-3">
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
                    </div>
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="form-label">
                          <span className="mandatory-star me-1">*</span>Select
                          the type of account
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
                              Free
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
                              {/* in days */}
                            </label>
                          </div>
                        </div>
                        <div className="row mb-3" id="rupees">
                          <div className="col-6">
                            {/* <label className="form-label">Mention the discounted amount</label> */}
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
                    ) : null}
                  </div>
                </div>

                <div className="col-xl-6 col-lg-6">
                  <div className="me-xl-5">
                    <label className="form-label">
                      <span className="mandatory-star me-1">*</span>Course Cover
                      Image{" "}
                      <span className="mandatory-star me-1">
                        (Upload only jpg, jpeg ,png)
                      </span>
                    </label>

                    <div className="col-12 float-start mb-4 position-relative">
                      <p
                        class="addUserPic p-0 w-70 mt-1 mb-1 d-flex justify-content-center align-items-center"
                        style={{ height: "215px" }}
                      >
                        <div className="d-flex align-items-center justify-content-center">
                          <span class="text-center">
                            {/* <img src={IconGallery} className="mb-2" /> */}
                            {formik.values.uploadedFile ? (
                              <img
                                // crossOrigin="Anonymous"
                                disabled={!CheckAccess}
                                src={formik.values.uploadedFile}
                                alt=""
                                className="w-100"
                                id="profile-picture-custome"
                              />
                            ) : (
                              <>
                                <img
                                  src={IconGallery}
                                  alt=""
                                  className="mb-2"
                                />
                                <br />
                                <NavLink className="textBlue font-size-12 ">
                                  Upload Image
                                </NavLink>
                              </>
                            )}
                            <br />
                            {/* <a>Upload Image/Video</a> */}
                          </span>
                        </div>

                        <input
                          type="file"
                          class="custom-file-input"
                          id="customFile"
                          name="uploadedFile"
                          //  multiple=""
                          //  accept="image/*"
                          disabled={!CheckAccess}
                          accept="image/jpeg, image/png"
                          onChange={(e) => {
                            UploadFile(e);
                          }}
                        />
                        <label
                          class="custom-file-label mb-0"
                          htmlForfor="customFile"
                        ></label>
                      </p>

                      {formik.errors.uploadedFile &&
                      formik.touched.uploadedFile ? (
                        <div className="text-danger">
                          {formik.errors.uploadedFile}
                        </div>
                      ) : null}
                    </div>
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="form-label">
                          <span className="mandatory-star me-1">*</span>
                          Community Name
                        </label>
                        <input
                          type="text"
                          disabled
                          className="form-control"
                          placeholder="Enter Community Name"
                          value={formik.values.name}
                        />
                      </div>
                      {formik.errors.Community && formik.touched.Community ? (
                        <div className="text-danger">
                          {formik.errors.Community}
                        </div>
                      ) : null}
                    </div>

                    {/* contengt decription */}
                    <div className="row mb-3">
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
                          rows="4"
                          disabled
                          // id="Title"
                          // name="detail_desciption"
                          value={formik.values.description}

                          // onChange={formik.handleChange}
                          // onChange={forfa fa-solid fa-pen textBlackmik.handleChange}
                        />
                      </div>
                      {formik.errors.detail_desciption &&
                      formik.touched.detail_desciption ? (
                        <div className="text-danger">
                          {formik.errors.detail_desciption}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* </AppLayout> */}
    </>
  );
};

export default CreateNewContentCreation;
