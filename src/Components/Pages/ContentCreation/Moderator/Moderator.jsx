// /* eslint-disable */
// import React, { useEffect, useState } from "react";
// // import AppLayout from "../../../Loyout/App";
// import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import DateAndTimeLayout from "../../../Common/DateAndTimeLayout";
// import AdminRoute from "../../../../Route/RouteDetails";
// import Dropdown from "react-bootstrap/Dropdown";
// import API from "../../../../Api/Api";
// import moment from "moment";
// import Pagination from "../../../Common/Pagination";
// import FilterSearch from "../../../Common/FilterSearch";
// import TooltipCustom from "../../../Common/TooltipCustom";
// import { ToastContainer, toast } from "react-toastify";
// import { useFormik } from "formik";

// const Moderator = () => {
//   const [show, setShow] = useState(false);

//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [errorMessage, SetErrorMessage] = useState("");
//   const [CategoryList, setCategoryList] = useState();

//   const [currentTab, setCurrentTab] = useState(
//     state?.moderator_previousTab
//       ? state?.moderator_previousTab
//       : "Moderator_pending"
//   );

//   const [listingData, setListingData] = useState([]);

//   const TajurbaAdmin_priviledge_data = JSON.parse(
//     localStorage.getItem("TajurbaAdmin_priviledge_data")
//   );

//   // For Pagination
//   const [totalPagess, setTotalPage] = useState();
//   const [totalItems, setTotalItems] = useState();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [goToPage, setGoToPage] = useState(1);

//   // Functionality for Filter and search
//   const FilterOptions = [
//     // { label: "All", value: "all" },
//     { label: "Title", value: "course_title" },
//     { label: "Author", value: "author_name" },
//     { label: "Course Type", value: "course_type" },
//     { label: "Date", value: "createdAt" },
//   ];

//   const [filterselect, setFilterSelect] = useState("");
//   const [search, setSearch] = useState("");

//   // useEffect(() => {
//   //   console.log("filterselect", filterselect);
//   //   console.log("search", search);
//   // }, [filterselect, search]);

//   const SubmittedTabList = (flagForList) => {
//     try {
//       var payload = {
//         agent: "course",
//         function: "getCourseList",
//         flag: flagForList,
//         page_no: currentPage,
//         limit: itemsPerPage,
//         //filter: {},
//         // createdAt: -1,
//       };
//       if (filterselect === "" || search === "") {
//         payload.filter = {};
//       } else {
//         payload.filter = {
//           [filterselect]: search,
//         };
//       }
//       API?.CommanApiCall(payload).then((response) => {
//         //console.log(`${flagForList} list`, response?.data?.data?.data);
//         if (response?.data?.data?.status === 200) {
//           setListingData(response?.data?.data?.data);
//           setTotalPage(response?.data?.data?.total_pages);
//           setTotalItems(response?.data?.data?.total_data);
//           setLoading(false);
//         }
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     SubmittedTabList(currentTab);
//   }, [currentTab, currentPage, itemsPerPage, filterselect, search]);

//   const CheckAccess =
//     TajurbaAdmin_priviledge_data &&
//     TajurbaAdmin_priviledge_data.some(
//       (ele) =>
//         ele.title === "Content Creation" &&
//         ele.is_active === true &&
//         ele?.submenu &&
//         ele?.submenu.some(
//           (sub) =>
//             sub.title === "Creator" &&
//             sub.is_active === true &&
//             sub?.submenuChild.some(
//               (subMenuChild) =>
//                 subMenuChild.title === "Create new" &&
//                 subMenuChild.is_active === true &&
//                 subMenuChild.is_edit === true
//             )
//         )
//     );

//   const validate = (values) => {
//     console.log(values, "value");
//     const errors = {};
//     if (!values.category) {
//       errors.category = "Please select category";
//     }
//     if (!values.name) {
//       errors.name = "Please enter category title";
//     } else if (values.name.trim() === "") {
//       errors.name = "Title cannot be blank";
//     }
//     if (!values.description) {
//       errors.description = "Please enter description";
//     } else if (values.description.trim() === "") {
//       errors.description = "Description cannot be blank";
//     }
//     if (!values.author_name) {
//       errors.author_name = "Please select author name";
//     } else if (values.author_name.trim() === "") {
//       errors.author_name = "author name cannot be blank";
//     }
//     if (!values.course_level) {
//       errors.course_level = "Please select category course level";
//     }

//     if (!values.type) {
//       errors.type = "Please enter type";
//     }
//     if (values.type === "Paid") {
//       if (!values.amount) {
//         errors.amount = "Please enter amount";
//       }
//     }

//     if (!values.uploadedFile) {
//       errors.uploadedFile = "Please upload Image";
//     }
//     console.log("Erroes", errors);
//     return errors;
//   };

//   const formik = useFormik({
//     initialValues: {
//       category: "",
//       name: "",
//       author_name: "",
//       description: "",
//       course_level: "",
//       type: "",
//       amount: "",
//       Community: "",
//       uploadedFile: "",
//       detail_desciption: "",
//       discount_amount: "",
//       discount_tenure: "",
//     },
//     onSubmit: (values, { setSubmitting }) => {
//       const errors = validate(values);

//       if (Object.keys(errors).length === 0) {
//         // console.log("Run vaidation function no errors");
//         handleSave();
//       } else {
//         // console.log("Run vaidation function if errors is present ");

//         console.log("Validation errors:", errors);
//       }

//       setSubmitting(false);
//     },
//     validate,
//   });


//   return (
//     <>
//       {/* <AppLayout> */}
//       <div className="main-content">
//         <div className="page-content">
//           <DateAndTimeLayout />

//           <div className="row">
//             <div className="col-12">
//               <div className="row position-relative mb-3">
//                 <div>
//                   <h3 className="headText mt-2 mb-2 fw-bold">Leave Credits</h3>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="row">
//             <div className="col-12">
//               <div className="tableCard">
//                 <div className="">
//                   <div className="tab-content text-muted">
//                     {/* <div className="row mb-2" id="consumers">
//                        <div className="col-xl-6 mb-4">
//                         <ul
//                           className="nav nav-tabs nav-tabs-custom mt-5 mt-xl-0"
//                           role="tablist"
//                         >
//                           <li
//                             className="nav-item"
//                             onClick={() => {
//                               setCurrentTab("Moderator_pending");
//                               navigate({
//                                 state: {},
//                               });
//                             }}
//                           >
//                             <a
//                               className={
//                                 currentTab === "Moderator_pending"
//                                   ? "nav-link active"
//                                   : "nav-link"
//                               }
//                               data-bs-toggle="tab"
//                               href="#to-Be-Reviewed"
//                               role="tab"
//                             >
//                               <span>Pending</span>
//                             </a>
//                           </li>
//                           <li
//                             className="nav-item"
//                             onClick={() => {
//                               setCurrentTab("Rejected");
//                               navigate({
//                                 state: {},
//                               });
//                             }}
//                           >
//                             <a
//                               className={
//                                 currentTab === "Rejected"
//                                   ? "nav-link active"
//                                   : "nav-link"
//                               }
//                               data-bs-toggle="tab"
//                               href="#Re-Sent"
//                               role="tab"
//                             >
//                               <span>Rejected</span>
//                             </a>
//                           </li>
//                           <li
//                             className="nav-item"
//                             onClick={() => {
//                               setCurrentTab("Approved");
//                               navigate({
//                                 state: {},
//                               });
//                             }}
//                           >
//                             <a
//                               className={
//                                 currentTab === "Approved"
//                                   ? "nav-link active"
//                                   : "nav-link"
//                               }
//                               data-bs-toggle="tab"
//                               href="#Ongoing"
//                               role="tab"
//                             >
//                               <span>Approved</span>
//                             </a>
//                           </li>
//                           {/* <li className="nav-item">
//                               <a
//                                 className="nav-link "
//                                 data-bs-toggle="tab"
//                                 href="#ReSubmitted"
//                                 role="tab"
//                               >
//                                 <span>Rejected by Publisher</span>
//                               </a>
//                             </li> 
//                         </ul>
//                       </div> 
//                       <FilterSearch
//                         FilterOptions={FilterOptions}
//                         search={search}
//                         setSearch={setSearch}
//                         filterselect={filterselect}
//                         setFilterSelect={setFilterSelect}
//                       />
//                     </div>*/}

//                     <div>
//                       <ToastContainer />
//                       <div className="">
//                         <div className="page-content">
//                           <div className="row mb-2">
//                             <div className="col-6"></div>
//                             <div className="col-6">
//                               {CheckAccess ? (
//                                 <div className="saveBtn">
//                                   <button
//                                     className="btn profileBtn border-radius-5 text-white border-radius-10 px-4 float-end"
//                                     onClick={formik.handleSubmit}
//                                     type="submit"
//                                     disabled={loading}
//                                   >
//                                     {loading && (
//                                       <span
//                                         className="spinner-border spinner-border-sm me-2"
//                                         role="status"
//                                         aria-hidden="true"
//                                       ></span>
//                                     )}
//                                     Submit
//                                   </button>
//                                 </div>
//                               ) : null}
//                             </div>
//                           </div>

//                           <div className="row" id="createContent">
//                             <form onSubmit={formik.handleSubmit}>
//                               <div className="row justify-content-between main-card p-4">
//                                 {errorMessage ? (
//                                   <span className="text-danger text-end">{errorMessage}</span>
//                                 ) : null}
//                                 <div className="col-xl-6 col-lg-6">
//                                   <div className="me-xl-5">
//                                     {/* content title */}
//                                     <div className="d-flex mb-3">
//                                       <div className="col-8">
//                                         <label className="form-label">
//                                           <span className="mandatory-star me-1">*</span>
//                                           Leave Code
//                                         </label>
//                                         <select
//                                           className="form-select w-80 border-radius-2"
//                                           aria-label="Default select example"
//                                           name="category"
//                                           disabled={!CheckAccess}
//                                           onChange={formik.handleChange}
//                                         >
//                                           <option selected="" value="">
//                                             Select
//                                           </option>
//                                           {CategoryList &&
//                                             CategoryList?.map((ele, index) => {
//                                               return (
//                                                 <option
//                                                   selected=""
//                                                   value={ele?.category_id}
//                                                   key={index}
//                                                   checked={formik.values.category.includes(ele)}
//                                                   onChange={(e) => {
//                                                     const isChecked = e.target.checked;
//                                                     if (isChecked) {
//                                                       formik.setFieldValue(
//                                                         "category",
//                                                         [...formik.values.category, item],
//                                                         true
//                                                       );
//                                                     } else {
//                                                       formik.setFieldValue(
//                                                         "category",
//                                                         formik.values.category.filter(
//                                                           (selectedOption) =>
//                                                             selectedOption !== item
//                                                         ),
//                                                         true
//                                                       );
//                                                     }
//                                                   }}
//                                                 >
//                                                   {ele?.category_name}
//                                                 </option>
//                                               );
//                                             })}
//                                         </select>
//                                       </div>
//                                       <div className="col-8">
//                                         <label className="form-label">
//                                           <span className="mandatory-star me-1">*</span>
//                                           Employee Name
//                                         </label>
//                                         <select
//                                           className="form-select w-80 border-radius-2"
//                                           aria-label="Default select example"
//                                           name="category"
//                                           disabled={!CheckAccess}
//                                           onChange={formik.handleChange}
//                                         >
//                                           <option selected="" value="">
//                                             Select
//                                           </option>
//                                           {CategoryList &&
//                                             CategoryList?.map((ele, index) => {
//                                               return (
//                                                 <option
//                                                   selected=""
//                                                   value={ele?.category_id}
//                                                   key={index}
//                                                   checked={formik.values.category.includes(ele)}
//                                                   onChange={(e) => {
//                                                     const isChecked = e.target.checked;
//                                                     if (isChecked) {
//                                                       formik.setFieldValue(
//                                                         "category",
//                                                         [...formik.values.category, item],
//                                                         true
//                                                       );
//                                                     } else {
//                                                       formik.setFieldValue(
//                                                         "category",
//                                                         formik.values.category.filter(
//                                                           (selectedOption) =>
//                                                             selectedOption !== item
//                                                         ),
//                                                         true
//                                                       );
//                                                     }
//                                                   }}
//                                                 >
//                                                   {ele?.category_name}
//                                                 </option>
//                                               );
//                                             })}
//                                         </select>
//                                       </div>
//                                       <div className="col-8">
//                                         <label className="form-label">
//                                           <span className="mandatory-star me-1">*</span>
//                                           Leave Balance
//                                         </label>
//                                         <select
//                                           className="form-select w-80 border-radius-2"
//                                           aria-label="Default select example"
//                                           name="category"
//                                           disabled={!CheckAccess}
//                                           onChange={formik.handleChange}
//                                         >
//                                           <option selected="" value="">
//                                             Select
//                                           </option>
//                                           {CategoryList &&
//                                             CategoryList?.map((ele, index) => {
//                                               return (
//                                                 <option
//                                                   selected=""
//                                                   value={ele?.category_id}
//                                                   key={index}
//                                                   checked={formik.values.category.includes(ele)}
//                                                   onChange={(e) => {
//                                                     const isChecked = e.target.checked;
//                                                     if (isChecked) {
//                                                       formik.setFieldValue(
//                                                         "category",
//                                                         [...formik.values.category, item],
//                                                         true
//                                                       );
//                                                     } else {
//                                                       formik.setFieldValue(
//                                                         "category",
//                                                         formik.values.category.filter(
//                                                           (selectedOption) =>
//                                                             selectedOption !== item
//                                                         ),
//                                                         true
//                                                       );
//                                                     }
//                                                   }}
//                                                 >
//                                                   {ele?.category_name}
//                                                 </option>
//                                               );
//                                             })}
//                                         </select>
//                                       </div>
//                                       {formik.errors.category && formik.touched.category ? (
//                                         <div className="text-danger">
//                                           {formik.errors.category}
//                                         </div>
//                                       ) : null}
//                                     </div>
//                                     {/* <div className="row mb-3">
//                                       <div className="col-12">
//                                         <label className="form-label">
//                                           <span className="mandatory-star me-1">*</span>Select
//                                           the type of Leave
//                                         </label>
//                                         <div className="ms-2">
//                                           <div className="form-check form-check-inline">
//                                             <input
//                                               className="form-check-input"
//                                               type="radio"
//                                               name="type"
//                                               id="inlineRadio1"
//                                               disabled={!CheckAccess}
//                                               defaultValue="Free"
//                                               onChange={formik.handleChange}
//                                             />
//                                             <label
//                                               className="form-check-label"
//                                               htmlFor="inlineRadio1"
//                                             >
//                                               Unpaid
//                                             </label>
//                                           </div>
//                                           <div className="form-check form-check-inline">
//                                             <input
//                                               className="form-check-input"
//                                               type="radio"
//                                               name="type"
//                                               id="inlineRadio2"
//                                               disabled={!CheckAccess}
//                                               defaultValue="Paid"
//                                               onChange={formik.handleChange}
//                                             />
//                                             <label
//                                               className="form-check-label"
//                                               htmlFor="inlineRadio2"
//                                             >
//                                               Paid
//                                             </label>
//                                           </div>
//                                         </div>
//                                       </div>
//                                       {formik.errors.type && formik.touched.type ? (
//                                         <div className="text-danger">{formik.errors.type}</div>
//                                       ) : null}
//                                     </div>
//                                     {formik.values.type === "Paid" ? (
//                                       <div className="row mb-3" id="rupees">
//                                         <div className="col-12">
//                                           <label className="form-label">
//                                             <span className="mandatory-star me-1">*</span>
//                                             Mention amount of your course along with one year
//                                             tenure for community
//                                           </label>
//                                           <input
//                                             type="number"
//                                             className="form-control w-70"
//                                             placeholder="₹ 3500"
//                                             disabled={!CheckAccess}
//                                             name="amount"
//                                             value={formik.values.amount}
//                                             onChange={formik.handleChange}
//                                           />
//                                         </div>
//                                         {formik.errors.amount && formik.touched.amount ? (
//                                           <div className="text-danger">
//                                             {formik.errors.amount}
//                                           </div>
//                                         ) : null}
//                                       </div>
//                                     ) : null}
//                                     {formik.values.type === "Paid" ? (
//                                       <>
//                                         <div className="row" id="rupees">
//                                           <div className="col-6">
//                                             <label className="form-label">
//                                               Mention the discounted amount
//                                             </label>
//                                           </div>
//                                           <div className="col-6">
//                                             <label className="form-label">
//                                               Mention the tenure for discounted amount
//                                             </label>
//                                           </div>
//                                         </div>
//                                         <div className="row mb-3" id="rupees">
//                                           <div className="col-6">
//                                             {/* <label className="form-label">Mention the discounted amount</label> 
//                                             <input
//                                               type="number"
//                                               className="form-control"
//                                               placeholder="₹ 3500"
//                                               name="discount_amount"
//                                               disabled={!CheckAccess}
//                                               value={formik.values.discount_amount}
//                                               onChange={formik.handleChange}
//                                             />
//                                           </div>
//                                           <div className="col-6">
//                                             <input
//                                               type="number"
//                                               className="form-control"
//                                               placeholder="5 days"
//                                               name="discount_tenure"
//                                               disabled={!CheckAccess}
//                                               value={formik.values.discount_tenure}
//                                               onChange={formik.handleChange}
//                                             />
//                                           </div>
//                                         </div>
//                                       </>
//                                     ) : null} */}
//                                   </div>
//                                 </div>
//                               </div>
//                             </form>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* <div className="row mb-2" id="">
//                       <div className="col-6"></div>
//                       <FilterSearch
//                         FilterOptions={FilterOptions}
//                         search={search}
//                         setSearch={setSearch}
//                         filterselect={filterselect}
//                         setFilterSelect={setFilterSelect}
//                       />
//                     </div>
//                     <div
//                       className={
//                         currentTab === "Moderator_pending"
//                           ? "tab-pane main-card active p-3 mb-0 box-shadow-bottom-none"
//                           : "tab-pane main-card p-3 mb-0 box-shadow-bottom-none"
//                       }
//                       id="to-Be-Reviewed"
//                       role="tabpanel"
//                     >
//                       <div className="table-responsive">
//                         <table className="table mb-0 tablesWrap">
//                           <thead>
//                             <tr>
//                               <th className="">Leave Code</th>
//                               <th>Employee Name</th>
//                               <th>Leave Type</th>

//                               <th>Leave Balance</th>
//                               <th></th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {loading ? (
//                               <tr>
//                                 <td colSpan={6}>
//                                   <div className="d-flex justify-content-center">
//                                     <div
//                                       className="spinner-border"
//                                       role="status"
//                                     >
//                                       <span className="visually-hidden">
//                                         Loading...
//                                       </span>
//                                     </div>
//                                   </div>
//                                 </td>
//                               </tr>
//                             ) : (
//                               <>
//                                 {listingData && listingData?.length ? (
//                                   listingData?.map((ele, index) => {
//                                     return (
//                                       <tr key={index}>
//                                         <td>
//                                           {TooltipCustom(ele?.course_title)}
//                                         </td>
//                                         <td>{ele?.categoryName}</td>
//                                         <td>{ele?.author_name}</td>
//                                         <td>
//                                           {moment(ele?.createdAt).format(
//                                             "DD-MM-YYYY"
//                                           )}
//                                         </td>
//                                         <td>
//                                           <NavLink
//                                             to={`../${AdminRoute?.ContentCreation?.Moderator?.ModeratorPending?.replace(
//                                               "/:id",
//                                               ""
//                                             )}/${ele?.courseedition_id}`}
//                                             className="btn btn-sm waves-effect waves-light btnViewOrange"
//                                           >
//                                             View More
//                                           </NavLink>
//                                         </td>
//                                       </tr>
//                                     );
//                                   })
//                                 ) : (
//                                   <>
//                                     <tr>
//                                       <td colSpan={6} className="text-center">
//                                         No data Found
//                                       </td>
//                                     </tr>
//                                   </>
//                                 )}{" "}
//                               </>
//                             )}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div> */}

//                     {/* <div
//                       className={
//                         currentTab === "Rejected"
//                           ? "tab-pane main-card active p-3 mb-0 box-shadow-bottom-none"
//                           : "tab-pane main-card p-3 mb-0 box-shadow-bottom-none"
//                       }
//                       id="Re-Sent"
//                       role="tabpanel"
//                     >
//                       <div className="table-responsive">
//                         <table className="table mb-0 tablesWrap">
//                           <thead>
//                             <tr>
//                               <th className="w-30">Content Title</th>
//                               <th>Category</th>
//                               <th>Author</th>
//                               <th>Moderator</th>
//                               <th>Rejected Date</th>
//                               <th></th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {loading ? (
//                               <tr>
//                                 <td colSpan={6}>
//                                   <div className="d-flex justify-content-center">
//                                     <div
//                                       className="spinner-border"
//                                       role="status"
//                                     >
//                                       <span className="visually-hidden">
//                                         Loading...
//                                       </span>
//                                     </div>
//                                   </div>
//                                 </td>
//                               </tr>
//                             ) : (
//                               <>
//                                 {listingData && listingData?.length ? (
//                                   listingData?.map((ele, index) => {
//                                     return (
//                                       <tr key={index}>
//                                         <td>
//                                           {TooltipCustom(ele?.course_title)}
//                                         </td>
//                                         <td>{ele?.categoryName}</td>
//                                         <td>{ele?.author_name}</td>
//                                         <td>{ele?.createdByName || "--"}</td>
//                                         <td>
//                                           {moment(ele?.createdAt).format(
//                                             "DD-MM-YYYY"
//                                           )}
//                                         </td>
//                                         <td>
//                                           <NavLink
//                                             to={`../${AdminRoute?.ContentCreation?.Moderator?.ModeratorRejected?.replace(
//                                               "/:id",
//                                               ""
//                                             )}/${ele?.courseedition_id}`}
//                                             className="btn btn-sm waves-effect waves-light btnViewOrange"
//                                           >
//                                             View More
//                                           </NavLink>
//                                         </td>
//                                       </tr>
//                                     );
//                                   })
//                                 ) : (
//                                   <>
//                                     <tr>
//                                       <td colSpan={6} className="text-center">
//                                         No data Found
//                                       </td>
//                                     </tr>
//                                   </>
//                                 )}{" "}
//                               </>
//                             )}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>

//                     <div
//                       className={
//                         currentTab === "Approved"
//                           ? "tab-pane main-card active p-3 mb-0 box-shadow-bottom-none"
//                           : "tab-pane main-card p-3 mb-0 box-shadow-bottom-none"
//                       }
//                       id="Ongoing"
//                       role="tabpanel"
//                     >
//                       <div className="table-responsive">
//                         <table className="table mb-0 tablesWrap">
//                           <thead>
//                             <tr>
//                               <th className="w-30">Content Title</th>
//                               <th>Category</th>
//                               <th>Author</th>
//                               <th>Moderator</th>
//                               <th>Approved Date</th>
//                               <th>Status</th>
//                               <th></th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {loading ? (
//                               <tr>
//                                 <td colSpan={6}>
//                                   <div className="d-flex justify-content-center">
//                                     <div
//                                       className="spinner-border"
//                                       role="status"
//                                     >
//                                       <span className="visually-hidden">
//                                         Loading...
//                                       </span>
//                                     </div>
//                                   </div>
//                                 </td>
//                               </tr>
//                             ) : (
//                               <>
//                                 {listingData && listingData?.length ? (
//                                   listingData?.map((ele, index) => {
//                                     return (
//                                       <tr key={index}>
//                                         <td>
//                                           {TooltipCustom(ele?.course_title)}
//                                         </td>
//                                         <td>{ele?.categoryName}</td>

//                                         <td>{ele?.author_name}</td>
//                                         <td>{ele?.createdByName || "--"}</td>
//                                         <td>
//                                           {moment(ele?.createdAt).format(
//                                             "DD-MM-YYYY"
//                                           )}
//                                         </td>
//                                         <td>
//                                           <span
//                                             className={
//                                               ele?.is_active
//                                                 ? "activelabel"
//                                                 : "inactivelabel"
//                                             }
//                                           >
//                                             {ele?.is_active
//                                               ? "Active"
//                                               : "Inactive"}
//                                           </span>
//                                         </td>
//                                         <td>
//                                           <NavLink
//                                             to={`../${AdminRoute?.ContentCreation?.Moderator?.ModeratorApproved?.replace(
//                                               "/:id",
//                                               ""
//                                             )}/${ele?.course_id}`}
//                                             className="btn btn-sm waves-effect waves-light btnViewOrange"
//                                           >
//                                             View More
//                                           </NavLink>
//                                         </td>
//                                       </tr>
//                                     );
//                                   })
//                                 ) : (
//                                   <>
//                                     <tr>
//                                       <td colSpan={6} className="text-center">
//                                         No data Found
//                                       </td>
//                                     </tr>
//                                   </>
//                                 )}{" "}
//                               </>
//                             )}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div> */}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* <Pagination
//             totalPagess={totalPagess}
//             setTotalPage={setTotalPage}
//             totalItems={totalItems}
//             setTotalItems={setTotalItems}
//             currentPage={currentPage}
//             setCurrentPage={setCurrentPage}
//             itemsPerPage={itemsPerPage}
//             setItemsPerPage={setItemsPerPage}
//           />
//            <div className="main-card p-3 ">
//               <div className="row card-footer">
//                 <div className="col-6 card-footer-left">
//                   <span className="text-muted">
//                     <span className="pagination__desc d-flex align-items-center">
//                       Items Per Page
//                       <select
//                         className="form-select form-select-sm w-auto mx-2"
//                         aria-label="Per"
//                       >
//                         <option value={3} aria-labelledby={3}>
//                           3
//                         </option>
//                         <option value={5} aria-labelledby={5}>
//                           5
//                         </option>
//                         <option value={10} aria-labelledby={10}>
//                           10
//                         </option>
//                       </select>
//                       1-9 Of 80 Items
//                     </span>
//                   </span>
//                 </div>
//                 <div className="col-6 card-footer-right">
//                   <nav aria-label="payments">
//                     <ul className="pagination m-0">
//                       <li className="page-item disabled">
//                         <span
//                           role="button"
//                           className="page-link"
//                           tabIndex={-1}
//                           aria-disabled="true"
//                           aria-label="null page"
//                         >
//                           <svg
//                             width="15.398"
//                             height="17.4"
//                             viewBox="0 0 15.398 17.4"
//                           >
//                             <g
//                               id="Icon_feather-skip-back"
//                               data-name="Icon feather-skip-back"
//                               transform="translate(-6.801 -5.3)"
//                             >
//                               <path
//                                 id="Path_12430"
//                                 data-name="Path 12430"
//                                 d="M23.5,22l-10-8,10-8Z"
//                                 transform="translate(-2)"
//                               />
//                               <path
//                                 id="Path_12431"
//                                 data-name="Path 12431"
//                                 d="M7.5,21.5V7.5"
//                                 transform="translate(0 -0.5)"
//                               />
//                             </g>
//                           </svg>
//                         </span>
//                       </li>
//                       <li className="page-item disabled">
//                         <span
//                           role="button"
//                           className="page-link"
//                           tabIndex={-1}
//                           aria-disabled="true"
//                           aria-label="First Page"
//                         >
//                           <svg
//                             width="11.4"
//                             height="17.4"
//                             viewBox="0 0 11.4 17.4"
//                           >
//                             <g
//                               id="Icon_feather-skip-back"
//                               data-name="Icon feather-skip-back"
//                               transform="translate(-10.8 -5.3)"
//                             >
//                               <path
//                                 id="Path_12430"
//                                 data-name="Path 12430"
//                                 d="M23.5,22l-10-8,10-8Z"
//                                 transform="translate(-2)"
//                               />
//                             </g>
//                           </svg>
//                         </span>
//                       </li>
//                       <li className="page-item disabled">
//                         <span
//                           role="button"
//                           className="page-link"
//                           aria-label="1 page"
//                         >
//                           Previous
//                         </span>
//                       </li>
//                       <li className="page-item">
//                         <span
//                           role="button"
//                           className="page-link"
//                           aria-label="2 page"
//                         >
//                           <span className="border-radius-5 p-1 px-2 border">
//                             1{" "}
//                           </span>{" "}
//                           &nbsp;Of 20
//                         </span>
//                       </li>
//                       <li className="page-item active">
//                         <span
//                           role="button"
//                           className="page-link"
//                           aria-label="... page"
//                         >
//                           Next
//                         </span>
//                       </li>
//                       <li className="page-item">
//                         <span
//                           role="button"
//                           className="page-link"
//                           aria-label="Last Page"
//                         >
//                           <svg
//                             width="11.4"
//                             height="17.4"
//                             viewBox="0 0 11.4 17.4"
//                           >
//                             <path
//                               id="Path_12430"
//                               data-name="Path 12430"
//                               d="M13.5,22l10-8-10-8Z"
//                               transform="translate(-12.8 -5.3)"
//                             />
//                           </svg>
//                         </span>
//                       </li>
//                       <li className="page-item">
//                         <span
//                           role="button"
//                           className="page-link"
//                           aria-label="null page"
//                         >
//                           <svg
//                             width="15.4"
//                             height="17.4"
//                             viewBox="0 0 15.4 17.4"
//                           >
//                             <g
//                               id="Icon_feather-skip-back"
//                               data-name="Icon feather-skip-back"
//                               transform="translate(0.7 0.7)"
//                             >
//                               <path
//                                 id="Path_12430"
//                                 data-name="Path 12430"
//                                 d="M13.5,22l10-8-10-8Z"
//                                 transform="translate(-13.5 -6)"
//                               />
//                               <path
//                                 id="Path_12431"
//                                 data-name="Path 12431"
//                                 d="M7.5,21.5V7.5"
//                                 transform="translate(6.5 -6.5)"
//                               />
//                             </g>
//                           </svg>
//                         </span>
//                       </li>
//                     </ul>
//                   </nav>
//                 </div>
//               </div>
//             </div>*/}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Moderator;



/* eslint-disable */
import React, { useEffect, useState } from "react";
// import AppLayout from "../../Loyout/App";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import DateAndTimeLayout from "../../../Common/DateAndTimeLayout";
//import IconGallery from "../../../../assets/images/IconGallery.svg";
import { useFormik } from "formik";
import API from "../../../../Api/Api";
//import AdminRoute from "./../../../Route/RouteDetails";
//import baseApi from "../../../Api/config";
import { ToastContainer, toast } from "react-toastify";
import FilterSearch from "../../../Common/FilterSearch";

const Moderator = () => {
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

  // Functionality for Filter and search
  // const FilterOptions = [
  //   // { label: "All", value: "all" },
  //   { label: "Title", value: "course_title" },
  //   { label: "Author", value: "author_name" },
  //   { label: "Course Type", value: "course_type" },
  //   { label: "Date", value: "createdAt" },
  // ];

  const [filterselect, setFilterSelect] = useState("");
  const [search, setSearch] = useState("");

  const [LeaveCodeList, setLeaveCodeList] = useState([]);
  const [EmployeeList, setEmployeeList] = useState([]);
  const [errorMessage, SetErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validate = (values) => {
    console.log(values, "value");
    const errors = {};
    if (!values.leave_code) {
      errors.leave_code = "Please select leave code ";
    }
    if (!values.user_id) {
      errors.user_id = "Please select Employee name ";
    }
    if (!values.assigned_leaves) {
      errors.assigned_leaves = "Please type numbers of leave to be provide.";
    }
    console.log("Errors", errors);
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      user_id: "",
      leave_code: "",
      assigned_leaves: "",
      assigned_date: "",
      //assigned_by: "",
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
    const fetchLeaveCodeList = async () => {
      try {
        const response = await API.CommanApiCall({
          data: {},
          agent: "leave_create_list",
        });
        // console.log("leave code",response.data.data.data)
        if (response?.status === 200) {
          setLeaveCodeList(response.data.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchEmployeeList = async () => {
      try {
        const response = await API.CommanApiCall({
          data: {},
          agent: "admin_user_list",
        });
        console.log("employee",response)
        if (response?.data?.status === 200) {
          setEmployeeList(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchLeaveCodeList();
    fetchEmployeeList();
  }, []);

  useEffect(() => {
    try {
      API?.CommanApiCall({
        data: {},
        agent: "leave_credit",
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
  const handleSave = () => {
    SetErrorMessage("");
    setLoading(true);
    try {
      API?.CommanApiCall({
        data: {
          leave_code: formik.values.leave_code,
          user_id: formik.values.user_id,
          assigned_leaves: formik.values.assigned_leaves,
        },
        agent: "leave_credit",
      }).then((response) => {
        console.log(response);
        if (response?.data?.data?.status === 200) {
          setLoading(false);
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
                  <h3 className="headText mt-2 mb-2 fw-bold">Leave Credit</h3>
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
                          {LeaveCodeList &&
                            LeaveCodeList?.map((ele, index) => {
                              return (
                                <option
                                  selected=""
                                  value={ele?.leave_code}
                                  key={index}
                                  checked={formik.values.leave_code.includes(ele)}
                                  onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    if (isChecked) {
                                      formik.setFieldValue(
                                        "leave_code",
                                        [...formik.values.leave_code, item],
                                        true
                                      );
                                    } else {
                                      formik.setFieldValue(
                                        "leave_code",
                                        formik.values.leave_code.filter(
                                          (selectedOption) =>
                                            selectedOption !== item
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
                      <div className="col-8">
                        <label className="form-label">
                          <span className="mandatory-star me-1">*</span>
                          Employee Name
                        </label>
                        <select
                          className="form-select w-80 border-radius-2"
                          aria-label="Default select example"
                          name="user_id"
                          disabled={!CheckAccess}
                          onChange={formik.handleChange}
                        >
                          <option selected="" value="">
                            Select
                          </option>
                          {EmployeeList &&
                            EmployeeList?.map((ele, index) => {
                              return (
                                <option
                                  selected=""
                                  value={ele?.user_id}
                                  key={index}
                                  checked={formik.values.category.includes(ele)}
                                  onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    if (isChecked) {
                                      formik.setFieldValue(
                                        "user_id",
                                        [...formik.values.user_id, item],
                                        true
                                      );
                                    } else {
                                      formik.setFieldValue(
                                        "user_id",
                                        formik.values.category.filter(
                                          (selectedOption) =>
                                            selectedOption !== item
                                        ),
                                        true
                                      );
                                    }
                                  }}
                                >
                                  {ele?.user_id}
                                </option>
                              );
                            })}
                        </select>
                      </div>

                       <div className="col-8">
                        <label className="form-label">
                          <span className="mandatory-star me-1">*</span>
                          Leave Balance
                        </label>

                        <input
                          type="number"
                          className="form-control w-80 border-radius-2"
                          aria-label="Leave balance input"
                          name="assigned_leaves"
                          onChange={formik.handleChange}
                          value={formik.values.assigned_leaves} // Ensure 'leaveBalance' is defined in Formik initial values
                        />
                        {/* <datalist id="categoryOptions">
                          {CategoryList &&
                            CategoryList.map((ele, index) => (
                              <option key={index} value={ele?.category_name}>
                                {ele?.category_name}
                              </option>
                            ))}
                        </datalist>*/}
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
            {/* <FilterSearch
              FilterOptions={FilterOptions}
              search={search}
              setSearch={setSearch}
              filterselect={filterselect}
              setFilterSelect={setFilterSelect}
            /> */}
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
                    <th>S.NO.</th>
                    <th className="">Leave Code</th>
                    <th>Employee Name</th>
                    <th>No. of Leaves</th>
                    <th>Credited On</th>
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
                              <td>{ele?.user_id}</td>
                              <td>{ele?.assigned_leaves}</td>
                              <td>
                                {new Date(ele?.assigned_date).toLocaleString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true
                                })}
                              </td>
                              {/* <td>
                                <NavLink
                                  to={`../${AdminRoute?.ContentCreation?.Moderator?.ModeratorPending?.replace(
                                    "/:id",
                                    ""
                                  )}/${ele?.courseedition_id}`}
                                  className="btn btn-sm waves-effect waves-light btnViewOrange"
                                >
                                  View More
                                </NavLink>
                              </td> */}
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
      {/* </AppLayout> */}
    </>
  );
};

export default Moderator;

