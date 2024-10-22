/* eslint-disable */
import React, { useEffect, useState } from "react";
// import AppLayout from "../../../Loyout/App";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import DateAndTimeLayout from "../../../Common/DateAndTimeLayout";
import AdminRoute from "../../../../Route/RouteDetails";
import Dropdown from "react-bootstrap/Dropdown";
import API from "../../../../Api/Api";
import moment from "moment";
import Pagination from "../../../Common/Pagination";
import FilterSearch from "../../../Common/FilterSearch";
import TooltipCustom from "../../../Common/TooltipCustom";

const Moderator = () => {
  const [show, setShow] = useState(false);

  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [currentTab, setCurrentTab] = useState(
    state?.moderator_previousTab
      ? state?.moderator_previousTab
      : "Moderator_pending"
  );

  const [listingData, setListingData] = useState([]);

  // For Pagination
  const [totalPagess, setTotalPage] = useState();
  const [totalItems, setTotalItems] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [goToPage, setGoToPage] = useState(1);

  // Functionality for Filter and search
  const FilterOptions = [
    // { label: "All", value: "all" },
    { label: "Title", value: "course_title" },
    { label: "Author", value: "author_name" },
    { label: "Course Type", value: "course_type" },
    { label: "Date", value: "createdAt" },
  ];

  const [filterselect, setFilterSelect] = useState("");
  const [search, setSearch] = useState("");

  // useEffect(() => {
  //   console.log("filterselect", filterselect);
  //   console.log("search", search);
  // }, [filterselect, search]);

  const SubmittedTabList = (flagForList) => {
    try {
      var payload = {
        agent: "course",
        function: "getCourseList",
        flag: flagForList,
        page_no: currentPage,
        limit: itemsPerPage,
        //filter: {},
        // createdAt: -1,
      };
      if (filterselect === "" || search === "") {
        payload.filter = {};
      } else {
        payload.filter = {
          [filterselect]: search,
        };
      }
      API?.CommanApiCall(payload).then((response) => {
        //console.log(`${flagForList} list`, response?.data?.data?.data);
        if (response?.data?.data?.status === 200) {
          setListingData(response?.data?.data?.data);
          setTotalPage(response?.data?.data?.total_pages);
          setTotalItems(response?.data?.data?.total_data);
          setLoading(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    SubmittedTabList(currentTab);
  }, [currentTab, currentPage, itemsPerPage, filterselect, search]);

  return (
    <>
      {/* <AppLayout> */}
      <div className="main-content">
        <div className="page-content">
          <DateAndTimeLayout />

          <div className="row">
            <div className="col-12">
              <div className="row position-relative mb-3">
                <div>
                  <h3 className="headText mt-2 mb-2 fw-bold">Moderator</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="tableCard">
                <div className="">
                  <div className="tab-content text-muted">
                    <div className="row mb-2" id="consumers">
                      <div className="col-xl-6 mb-4">
                        <ul
                          className="nav nav-tabs nav-tabs-custom mt-5 mt-xl-0"
                          role="tablist"
                        >
                          <li
                            className="nav-item"
                            onClick={() => {
                              setCurrentTab("Moderator_pending");
                              navigate({
                                state: {},
                              });
                            }}
                          >
                            <a
                              className={
                                currentTab === "Moderator_pending"
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              data-bs-toggle="tab"
                              href="#to-Be-Reviewed"
                              role="tab"
                            >
                              <span>Pending</span>
                            </a>
                          </li>
                          <li
                            className="nav-item"
                            onClick={() => {
                              setCurrentTab("Rejected");
                              navigate({
                                state: {},
                              });
                            }}
                          >
                            <a
                              className={
                                currentTab === "Rejected"
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              data-bs-toggle="tab"
                              href="#Re-Sent"
                              role="tab"
                            >
                              <span>Rejected</span>
                            </a>
                          </li>
                          <li
                            className="nav-item"
                            onClick={() => {
                              setCurrentTab("Approved");
                              navigate({
                                state: {},
                              });
                            }}
                          >
                            <a
                              className={
                                currentTab === "Approved"
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              data-bs-toggle="tab"
                              href="#Ongoing"
                              role="tab"
                            >
                              <span>Approved</span>
                            </a>
                          </li>
                          {/* <li className="nav-item">
                              <a
                                className="nav-link "
                                data-bs-toggle="tab"
                                href="#ReSubmitted"
                                role="tab"
                              >
                                <span>Rejected by Publisher</span>
                              </a>
                            </li> */}
                        </ul>
                      </div>
                      <FilterSearch
                        FilterOptions={FilterOptions}
                        search={search}
                        setSearch={setSearch}
                        filterselect={filterselect}
                        setFilterSelect={setFilterSelect}
                      />
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
                              <th className="w-40">Content Title</th>
                              <th>Category</th>
                              <th>Author</th>

                              <th>Submitted Date</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {loading ? (
                              <tr>
                                <td colSpan={6}>
                                  <div className="d-flex justify-content-center">
                                    <div
                                      className="spinner-border"
                                      role="status"
                                    >
                                      <span className="visually-hidden">
                                        Loading...
                                      </span>
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
                                        <td>
                                          {TooltipCustom(ele?.course_title)}
                                        </td>
                                        <td>{ele?.categoryName}</td>
                                        <td>{ele?.author_name}</td>
                                        <td>
                                          {moment(ele?.createdAt).format(
                                            "DD-MM-YYYY"
                                          )}
                                        </td>
                                        <td>
                                          <NavLink
                                            to={`../${AdminRoute?.ContentCreation?.Moderator?.ModeratorPending?.replace(
                                              "/:id",
                                              ""
                                            )}/${ele?.courseedition_id}`}
                                            className="btn btn-sm waves-effect waves-light btnViewOrange"
                                          >
                                            View More
                                          </NavLink>
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

                    <div
                      className={
                        currentTab === "Rejected"
                          ? "tab-pane main-card active p-3 mb-0 box-shadow-bottom-none"
                          : "tab-pane main-card p-3 mb-0 box-shadow-bottom-none"
                      }
                      id="Re-Sent"
                      role="tabpanel"
                    >
                      <div className="table-responsive">
                        <table className="table mb-0 tablesWrap">
                          <thead>
                            <tr>
                              <th className="w-30">Content Title</th>
                              <th>Category</th>
                              <th>Author</th>
                              <th>Moderator</th>
                              <th>Rejected Date</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {loading ? (
                              <tr>
                                <td colSpan={6}>
                                  <div className="d-flex justify-content-center">
                                    <div
                                      className="spinner-border"
                                      role="status"
                                    >
                                      <span className="visually-hidden">
                                        Loading...
                                      </span>
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
                                        <td>
                                          {TooltipCustom(ele?.course_title)}
                                        </td>
                                        <td>{ele?.categoryName}</td>
                                        <td>{ele?.author_name}</td>
                                        <td>{ele?.createdByName || "--"}</td>
                                        <td>
                                          {moment(ele?.createdAt).format(
                                            "DD-MM-YYYY"
                                          )}
                                        </td>
                                        <td>
                                          <NavLink
                                            to={`../${AdminRoute?.ContentCreation?.Moderator?.ModeratorRejected?.replace(
                                              "/:id",
                                              ""
                                            )}/${ele?.courseedition_id}`}
                                            className="btn btn-sm waves-effect waves-light btnViewOrange"
                                          >
                                            View More
                                          </NavLink>
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

                    <div
                      className={
                        currentTab === "Approved"
                          ? "tab-pane main-card active p-3 mb-0 box-shadow-bottom-none"
                          : "tab-pane main-card p-3 mb-0 box-shadow-bottom-none"
                      }
                      id="Ongoing"
                      role="tabpanel"
                    >
                      <div className="table-responsive">
                        <table className="table mb-0 tablesWrap">
                          <thead>
                            <tr>
                              <th className="w-30">Content Title</th>
                              <th>Category</th>
                              <th>Author</th>
                              <th>Moderator</th>
                              <th>Approved Date</th>
                              <th>Status</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {loading ? (
                              <tr>
                                <td colSpan={6}>
                                  <div className="d-flex justify-content-center">
                                    <div
                                      className="spinner-border"
                                      role="status"
                                    >
                                      <span className="visually-hidden">
                                        Loading...
                                      </span>
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
                                        <td>
                                          {TooltipCustom(ele?.course_title)}
                                        </td>
                                        <td>{ele?.categoryName}</td>

                                        <td>{ele?.author_name}</td>
                                        <td>{ele?.createdByName || "--"}</td>
                                        <td>
                                          {moment(ele?.createdAt).format(
                                            "DD-MM-YYYY"
                                          )}
                                        </td>
                                        <td>
                                          <span
                                            className={
                                              ele?.is_active
                                                ? "activelabel"
                                                : "inactivelabel"
                                            }
                                          >
                                            {ele?.is_active
                                              ? "Active"
                                              : "Inactive"}
                                          </span>
                                        </td>
                                        <td>
                                          <NavLink
                                            to={`../${AdminRoute?.ContentCreation?.Moderator?.ModeratorApproved?.replace(
                                              "/:id",
                                              ""
                                            )}/${ele?.course_id}`}
                                            className="btn btn-sm waves-effect waves-light btnViewOrange"
                                          >
                                            View More
                                          </NavLink>
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
              </div>
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
          {/* <div className="main-card p-3 ">
              <div className="row card-footer">
                <div className="col-6 card-footer-left">
                  <span className="text-muted">
                    <span className="pagination__desc d-flex align-items-center">
                      Items Per Page
                      <select
                        className="form-select form-select-sm w-auto mx-2"
                        aria-label="Per"
                      >
                        <option value={3} aria-labelledby={3}>
                          3
                        </option>
                        <option value={5} aria-labelledby={5}>
                          5
                        </option>
                        <option value={10} aria-labelledby={10}>
                          10
                        </option>
                      </select>
                      1-9 Of 80 Items
                    </span>
                  </span>
                </div>
                <div className="col-6 card-footer-right">
                  <nav aria-label="payments">
                    <ul className="pagination m-0">
                      <li className="page-item disabled">
                        <span
                          role="button"
                          className="page-link"
                          tabIndex={-1}
                          aria-disabled="true"
                          aria-label="null page"
                        >
                          <svg
                            width="15.398"
                            height="17.4"
                            viewBox="0 0 15.398 17.4"
                          >
                            <g
                              id="Icon_feather-skip-back"
                              data-name="Icon feather-skip-back"
                              transform="translate(-6.801 -5.3)"
                            >
                              <path
                                id="Path_12430"
                                data-name="Path 12430"
                                d="M23.5,22l-10-8,10-8Z"
                                transform="translate(-2)"
                              />
                              <path
                                id="Path_12431"
                                data-name="Path 12431"
                                d="M7.5,21.5V7.5"
                                transform="translate(0 -0.5)"
                              />
                            </g>
                          </svg>
                        </span>
                      </li>
                      <li className="page-item disabled">
                        <span
                          role="button"
                          className="page-link"
                          tabIndex={-1}
                          aria-disabled="true"
                          aria-label="First Page"
                        >
                          <svg
                            width="11.4"
                            height="17.4"
                            viewBox="0 0 11.4 17.4"
                          >
                            <g
                              id="Icon_feather-skip-back"
                              data-name="Icon feather-skip-back"
                              transform="translate(-10.8 -5.3)"
                            >
                              <path
                                id="Path_12430"
                                data-name="Path 12430"
                                d="M23.5,22l-10-8,10-8Z"
                                transform="translate(-2)"
                              />
                            </g>
                          </svg>
                        </span>
                      </li>
                      <li className="page-item disabled">
                        <span
                          role="button"
                          className="page-link"
                          aria-label="1 page"
                        >
                          Previous
                        </span>
                      </li>
                      <li className="page-item">
                        <span
                          role="button"
                          className="page-link"
                          aria-label="2 page"
                        >
                          <span className="border-radius-5 p-1 px-2 border">
                            1{" "}
                          </span>{" "}
                          &nbsp;Of 20
                        </span>
                      </li>
                      <li className="page-item active">
                        <span
                          role="button"
                          className="page-link"
                          aria-label="... page"
                        >
                          Next
                        </span>
                      </li>
                      <li className="page-item">
                        <span
                          role="button"
                          className="page-link"
                          aria-label="Last Page"
                        >
                          <svg
                            width="11.4"
                            height="17.4"
                            viewBox="0 0 11.4 17.4"
                          >
                            <path
                              id="Path_12430"
                              data-name="Path 12430"
                              d="M13.5,22l10-8-10-8Z"
                              transform="translate(-12.8 -5.3)"
                            />
                          </svg>
                        </span>
                      </li>
                      <li className="page-item">
                        <span
                          role="button"
                          className="page-link"
                          aria-label="null page"
                        >
                          <svg
                            width="15.4"
                            height="17.4"
                            viewBox="0 0 15.4 17.4"
                          >
                            <g
                              id="Icon_feather-skip-back"
                              data-name="Icon feather-skip-back"
                              transform="translate(0.7 0.7)"
                            >
                              <path
                                id="Path_12430"
                                data-name="Path 12430"
                                d="M13.5,22l10-8-10-8Z"
                                transform="translate(-13.5 -6)"
                              />
                              <path
                                id="Path_12431"
                                data-name="Path 12431"
                                d="M7.5,21.5V7.5"
                                transform="translate(6.5 -6.5)"
                              />
                            </g>
                          </svg>
                        </span>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div> */}
        </div>
      </div>
      {/* </AppLayout> */}
    </>
  );
};

export default Moderator;
