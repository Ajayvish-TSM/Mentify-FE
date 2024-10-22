/* eslint-disable */
import React, { useEffect, useState } from "react";
// import AppLayout from "../../Loyout/App";
import { NavLink } from "react-router-dom";
import DateAndTimeLayout from "../../Common/DateAndTimeLayout";
import Dropdown from "react-bootstrap/Dropdown";
import API from "../../../Api/Api";
import moment from "moment";
import AdminRoute from "../../../Route/RouteDetails";
import Pagination from "../../Common/Pagination";
import FilterSearch from "../../Common/FilterSearch";
import TooltipCustom from "../../Common/TooltipCustom";

// import AdminRoute from '../../../Route/RouteDetails';

const Draft = () => {
  const [draftList, setDraftList] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // Api call for Draft Listing
  // useEffect(() => {
  //   try {
  //     API?.CommanApiCall({
  //       agent: "course",
  //       function: "getCourseList",
  //       flag: "Draft",
  //       page_no: currentPage,
  //       limit: itemsPerPage,
  //       filter: {
  //         [filterselect]: search,
  //       },
  //       createdAt: -1,
  //     }).then((response) => {
  //       console.log("Draft list", response?.data?.data);
  //       if (response?.data?.data?.status === 200) {
  //         setDraftList(response?.data?.data?.data);
  //         setTotalPage(response?.data?.data?.total_pages);
  //         setTotalItems(response?.data?.data?.total_data);
  //         setLoading(false);
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   // }, [currentPage, itemsPerPage]);
  // }, [currentPage, itemsPerPage, filterselect, search]);

  useEffect(() => {
    try {
      var payload = {
        agent: "course",
        function: "getCourseList",
        flag: "Draft",
        page_no: currentPage,
        limit: itemsPerPage,
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
        console.log("Draft list", response?.data?.data);
        if (response?.data?.data?.status === 200) {
          setDraftList(response?.data?.data?.data);
          setTotalPage(response?.data?.data?.total_pages);
          setTotalItems(response?.data?.data?.total_data);
          setLoading(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [currentPage, itemsPerPage, filterselect, search]);

  return (
    <>
      {/* <AppLayout> */}
      <div className="main-content">
        <div className="page-content">
          <DateAndTimeLayout />
          <div className="row mb-4" id="consumers">
            <div className="col-6">
              <h3 className="headText mt-2 mb-2 fw-bold">Draft</h3>
            </div>
            {/* <div className="col-6 d-flex align-items-center justify-content-end">
                <div className="me-3" id="filterBtn">
                  <Dropdown>
                    <Dropdown.Toggle
                      variant=""
                      id="dropdown-basic"
                      className="dropdown-toggle p-0 dayFilter mb-3"
                    >
                      <svg
                        width="18.47"
                        height="16.623"
                        viewBox="0 0 18.47 16.623"
                      >
                        <path
                          id="Icon_feather-filter"
                          data-name="Icon feather-filter"
                          d="M21.47,4.5H3l7.388,8.736v6.04l3.694,1.847V13.236Z"
                          transform="translate(-3 -4.5)"
                          fill="#252525"
                        />
                      </svg>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <ul className="px-2 border-0">
                        <li className="listdropdown">
                          <span style={{ cursor: "pointer" }}>All</span>
                        </li>

                        <li className="listdropdown">
                          <span className="" style={{ cursor: "pointer" }}>
                            Category
                          </span>
                        </li>
                        <li className="listdropdown">
                          <span className="" style={{ cursor: "pointer" }}>
                            Sub Category
                          </span>
                        </li>
                        <li className="listdropdown">
                          <span className="" style={{ cursor: "pointer" }}>
                            Author
                          </span>
                        </li>
                        <li className="listdropdown border-0">
                          <span className="" style={{ cursor: "pointer" }}>
                            Format
                          </span>
                        </li>
                      </ul>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="d-flex align-items-center main-card p-0 bg-white">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <button
                        id="button-addon2"
                        type="submit"
                        className="btn btn-link text-secondary p-1 ms-1"
                      >
                        <i className="fa fa-search"></i>
                      </button>
                    </div>
                    <input
                      type="search"
                      // placeholder={`Search ${selectedHeader}`}
                      aria-describedby="button-addon2"
                      className="form-control border-0 p-1 bg-transparent"
                      // value={filter}
                      // onChange={handleFilterChange}
                    />
                  </div>
                </div>
              </div> */}
            <FilterSearch
              FilterOptions={FilterOptions}
              search={search}
              setSearch={setSearch}
              filterselect={filterselect}
              setFilterSelect={setFilterSelect}
            />
          </div>

          <div className="row">
            <div className="col-12">
              <div className="main-card p-3 mb-0 box-shadow-bottom-none">
                <div className="table-responsive">
                  <table className="table mb-0 tablesWrap">
                    <thead>
                      <tr>
                        <th className="w-30">Content Title</th>
                        <th>Category</th>
                        <th>Author</th>
                        <th>Content Type</th>
                        <th>Created Date</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan={6}>
                            <div className="d-flex justify-content-center">
                              <div className="spinner-border" role="status">
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        <>
                          {draftList && draftList?.length ? (
                            draftList &&
                            draftList?.map((ele, index) => {
                              return (
                                <tr key={index}>
                                  <td>{TooltipCustom(ele?.course_title)}</td>
                                  <td>{ele?.categoryName}</td>
                                  <td>{ele?.author_name}</td>
                                  <td>{ele?.course_type}</td>
                                  <td>
                                    {moment(ele?.createdAt).format(
                                      "DD-MM-YYYY"
                                    )}
                                  </td>
                                  <td>
                                    <NavLink
                                      to={`../${AdminRoute?.ContentCreation?.CreateContent.replace(
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
                          )}
                        </>
                      )}
                    </tbody>
                  </table>
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
                                fill="none"
                                stroke="#b7b7b7"
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

export default Draft;
