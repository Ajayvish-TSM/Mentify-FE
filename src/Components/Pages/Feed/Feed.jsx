/* eslint-disable */
import React, { useEffect, useState } from "react";
// import AppLayout from "../../Loyout/App";
// import { NavLink } from "react-router-dom";
import DateAndTimeLayout from "../../Common/DateAndTimeLayout";
// import API from "../../../Api/Api";
// import moment from "moment";
import AdminRoute from "../../../Route/RouteDetails";
import Dropdown from "react-bootstrap/Dropdown";
import API from "../../../Api/Api";
import moment from "moment";
import Pagination from "../../Common/Pagination";
import FilterSearch from "../../Common/FilterSearch";
import { NavLink } from "react-router-dom";
import TooltipCustom from "../../Common/TooltipCustom";

const Feed = () => {
  const [feedDetails, setFeedDetails] = useState([]);

  const [loading, setLoading] = useState(true);

  // For Pagination
  const [totalPagess, setTotalPage] = useState();
  const [totalItems, setTotalItems] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [goToPage, setGoToPage] = useState(1);

  // Functionality for Filter and search
  const FilterOptions = [
    { label: "All", value: "all" },
    { label: "Name", value: "first_name" },
    { label: "Email", value: "email" },
    { label: "Subscription", value: "subcription" },
    { label: "City", value: "city" },
  ];

  const [filterselect, setFilterSelect] = useState("all");
  const [search, setSearch] = useState("");

  // Api call for Draft Listing
  useEffect(() => {
    try {
      var payload = {
        agent: "feed",
        function: "user_list_for_admin",
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
        console.log("Feed Api Details", response?.data?.data?.data);
        if (response?.data?.data?.status === 200) {
          setFeedDetails(response?.data?.data?.data);
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
              <h3 className="headText mt-2 mb-2 fw-bold">Holiday Details</h3>
            </div>
            <div className="col-6 d-flex align-items-center justify-content-end">
              <FilterSearch
                FilterOptions={FilterOptions}
                search={search}
                setSearch={setSearch}
                filterselect={filterselect}
                setFilterSelect={setFilterSelect}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="main-card p-3 mb-0 box-shadow-bottom-none">
                <div className="table-responsive">
                  <table className="table mb-0 tablesWrap text-center">
                    <thead>
                      <tr>
                        <th className="text-start">Sr. No.</th>
                        <th className="text-start">Name</th>
                        <th className="text-start">Email</th>
                        <th>Subscription</th>
                        <th>Registration Date</th>
                        <th>City</th>
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
                          {feedDetails && feedDetails?.length ? (
                            feedDetails?.map((ele, index) => {
                              return (
                                <tr key={index}>
                                  <td className="text-start">{index + 1}.</td>
                                  <td className="fw-bold text-start">
                                    {TooltipCustom(ele?.first_name)}
                                  </td>
                                  <td className="text-start">
                                    {TooltipCustom(ele?.email)}
                                  </td>
                                  <td className="fw-bold">
                                    {ele?.subcription}
                                  </td>
                                  <td>
                                    {moment(ele?.createdAt).format(
                                      "DD/MM/YYYY"
                                    )}
                                  </td>
                                  <td>{ele?.city}</td>
                                  <td>
                                    <NavLink
                                      to={`../${AdminRoute?.Feed?.ConsumerActivityProfile?.replace(
                                        ":id",
                                        ele?.user_id
                                      )}`}
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
        </div>
      </div>
      {/* </AppLayout> */}
    </>
  );
};

export default Feed;
