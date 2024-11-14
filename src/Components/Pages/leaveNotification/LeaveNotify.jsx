/* eslint-disable */
import React, { useEffect, useState } from "react";
// import AppLayout from "../../../Loyout/App";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import DateAndTimeLayout from "../../Common/DateAndTimeLayout";
import API from "../../../Api/Api";
import Pagination from "../../Common/Pagination";
import FilterSearch from "../../Common/FilterSearch";
import moment from "moment";
import AdminRoute from "../../../Route/RouteDetails";
import TooltipCustom from "../../Common/TooltipCustom";
import AttendanceButton from "../../../AttendanceButton";

const LeaveNotify = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [leaveData, setLeaveData] = useState([]);
  const [currentTab, setCurrentTab] = useState(
    state?.myTeam_previousTab ? state?.myTeam_previousTab : "All"
  );

  const TajurbaAdmin_priviledge_data = JSON.parse(
    localStorage.getItem("TajurbaAdmin_priviledge_data")
  );
  const [EmployeeList, setEmployeeList] = useState([]);

  const [listingData, setListingData] = useState([]);

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
    { label: "Status", value: "is_active" },
    { label: "Role", value: "role" },
  ];

  const [filterselect, setFilterSelect] = useState("all");
  const [search, setSearch] = useState("");
  function calculateLeaveDays(from_date, to_date) {
    const startDate = new Date(from_date);
    const endDate = new Date(to_date);
    const timeDifference = endDate - startDate;
    return Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) || 0;
  }
  const admin_id = JSON.parse(localStorage.getItem("TajurbaAdminUser"));
  const MyTeamTabList = (flagForList) => {
    try {
      var payload = {
        agent: "admin_user_list",
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
        console.log(
          "Response from My Team listing api ",
          response?.data?.data?.data
        );
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
    try {
      API?.CommanApiCall({
        data: {},
        agent: "leave_application",
        function: "get_leave_application",
      }).then((response) => {
        console.log("leave", response);
        if (response?.data?.data?.status === 200) {
          const updatedData = response.data.data.data.map((ele) => ({
            ...ele,
            leaveDays: calculateLeaveDays(ele.from_date, ele.to_date),
          }));

          setLeaveData(updatedData);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    const fetchEmployeeList = async () => {
      try {
        const response = await API.CommanApiCall({
          data: {},
          agent: "admin_user_list",
          page_no: 1,
          limit: 100,
          filter: {},
        });
        if (response?.status === 200) {
          setEmployeeList(response.data.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmployeeList();
  }, []);
  const handleApprove = (leaveId) => {
    console.log("Approved leave ID:", leaveId);
    // Add logic to update leave status to "Approved"
  };

  const handleReject = (leaveId) => {
    console.log("Rejected leave ID:", leaveId);
    // Add logic to update leave status to "Rejected"
  };

  useEffect(() => {
    MyTeamTabList(currentTab);
  }, [currentTab, currentPage, itemsPerPage, filterselect, search]);

  const filteredData = leaveData.filter((leave) => {
    const employee = EmployeeList.find(
      (emp) => emp._id == leave.user_id && emp.reporting_to == admin_id._id
    );
    console.log(employee, "employee");
    return employee;
  });
  console.log("eplist", EmployeeList);
  return (
    <>
      {/* <AppLayout> */}
      <div className="main-content">
        <div className="page-content">
          {/* start page title */}
          <DateAndTimeLayout />

          {/* end page title */}
          <div className="row">
            <div className="col-12">
              <div className="row position-relative">
                <div>
                  <h3 className="headText mt-2 mb-2 fw-bold">My Team</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="tableCard">
                <div className="">
                  <div className="tab-content text-muted mt-3">
                    <div className="row mb-4" id="consumers">
                      <div className="col-xl-5 mb-4 mb-xl-0">
                        <ul
                          className="nav nav-tabs nav-tabs-custom mt-5 mt-xl-0"
                          role="tablist"
                        >
                          <li
                            className="nav-item"
                            onClick={() => {
                              setCurrentTab("pending");
                              navigate({
                                state: {},
                              });
                            }}
                          >
                            <a
                              className={
                                currentTab === "All"
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
                              setCurrentTab("approved");
                              navigate({
                                state: {},
                              });
                            }}
                          >
                            <a
                              className={
                                currentTab === "Active"
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              data-bs-toggle="tab"
                              href="#Re-Sent"
                              role="tab"
                            >
                              <span>Approved</span>
                            </a>
                          </li>
                          <li
                            className="nav-item"
                            onClick={() => {
                              setCurrentTab("rejected");
                              navigate({
                                state: {},
                              });
                            }}
                          >
                            <a
                              className={
                                currentTab === "Inactive"
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              data-bs-toggle="tab"
                              href="#Ongoing"
                              role="tab"
                            >
                              <span>Rejected</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div
                      className={
                        currentTab === "All"
                          ? "tab-pane main-card p-3 mb-0 box-shadow-bottom-none active"
                          : "tab-pane main-card p-3 mb-0 box-shadow-bottom-none"
                      }
                      id="to-Be-Reviewed"
                      role="tabpanel"
                    >
                      <div className="table-responsive">
                        <table className="table mb-0 tablesWrap">
                          <thead>
                            <tr>
                              <th style={{fontWeight: "600"}}>Name</th>
                              <th style={{fontWeight: "600"}}>Leave Code</th>
                              <th className="w-20" style={{fontWeight: "600"}}>Leave Reason</th>
                              <th style={{fontWeight: "600"}}>Start Date</th>
                              <th style={{fontWeight: "600"}}>End Date</th>

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
                                {filteredData && filteredData?.length ? (
                                  filteredData?.map((ele, index) => {
                                    return (
                                      <tr key={index}>
                                        <td className="fw-bold">
                                          {/* {TooltipCustom(ele?.first_name)} */}{" "}
                                          {ele?.user_id}
                                        </td>
                                        <td>{ele?.leave_code}</td>
                                        <td>
                                          {TooltipCustom(ele?.leave_reason)}
                                        </td>
                                        {/* <td>{ele?.roles[0]?.name}</td> */}
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

                                        <td>
                                          <button
                                            // to={`../${AdminRoute?.UserManagement?.MyTeam?.UserProfile}`}
                                            className="btn waves-effect waves-light btnViewOrange text-white"
                                            style={{
                                              display: "flex",
                                              backgroundColor: "#62a6dc",
                                              borderRadius: "20px",
                                            }}
                                            onClick={() => {
                                              handleApprove(ele?._id);
                                            }}
                                          >
                                            Approved
                                          </button>
                                        </td>
                                        <td>
                                          <button
                                            // to={`../${AdminRoute?.UserManagement?.MyTeam?.UserProfile}`}
                                            className="btn waves-effect waves-light btnViewOrange text-white"
                                            style={{
                                              display: "flex",
                                              backgroundColor: "#62a6dc",
                                              borderRadius: "20px",
                                            }}
                                            onClick={() => {
                                              handleReject(ele?._id);
                                            }}
                                          >
                                            Rejected
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

                    <div
                      className={
                        currentTab === "Active"
                          ? "tab-pane main-card p-3 mb-0 box-shadow-bottom-none active"
                          : "tab-pane main-card p-3 mb-0 box-shadow-bottom-none"
                      }
                      id="Re-Sent"
                      role="tabpanel"
                    >
                      <div className="table-responsive">
                        <table className="table mb-0 tablesWrap">
                          <thead>
                            <tr>
                              <th style={{fontWeight: "600"}}>Name</th>
                              <th style={{fontWeight: "600"}}>Leave Code</th>
                              <th className="w-20" style={{fontWeight: "600"}}>Leave Reason</th>
                              <th style={{fontWeight: "600"}}>Start Date</th>
                              <th style={{fontWeight: "600"}}>End Date</th>

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
                                        <td className="fw-bold">
                                          {TooltipCustom(ele?.first_name)}
                                        </td>
                                        <td>{ele?.leave_code}</td>
                                        <td style={{ wordBreak: "break-all" }}>
                                          {ele?.leave_reason}
                                        </td>
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
                                        <td>
                                          <button
                                            // to={`../${AdminRoute?.UserManagement?.MyTeam?.UserProfile}`}
                                            className="btn waves-effect waves-light text-white"
                                            style={{
                                              display: "flex",
                                              backgroundColor: "#62a6dc",
                                              borderRadius: "20px",
                                            }}
                                            to={`../${AdminRoute?.UserManagement?.MyTeam?.UserProfile?.replace(
                                              ":status",
                                              currentTab
                                            ).replace(":id", ele?.user_id)}`}
                                          >
                                            View More
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

                    <div
                      className={
                        currentTab === "Inactive"
                          ? "tab-pane main-card p-3 mb-0 box-shadow-bottom-none active"
                          : "tab-pane main-card p-3 mb-0 box-shadow-bottom-none"
                      }
                      id="Ongoing"
                      role="tabpanel"
                    >
                      <div className="table-responsive">
                        <table className="table mb-0 tablesWrap">
                          <thead>
                            <tr>
                              <th style={{fontWeight: "600"}}>Name</th>
                              <th style={{fontWeight: "600"}}>Leave Code</th>
                              <th className="w-20" style={{fontWeight: "600"}}>Leave Reason</th>
                              <th style={{fontWeight: "600"}}>Start Date</th>
                              <th style={{fontWeight: "600"}}>End Date</th>

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
                                        <td className="fw-bold">
                                          {TooltipCustom(ele?.first_name)}
                                        </td>
                                        <td>{ele?.leave_code}</td>
                                        <td style={{ wordBreak: "break-all" }}>
                                          {ele?.leave_reason}
                                        </td>
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
                                        <td>
                                          <button
                                            // to={`../${AdminRoute?.UserManagement?.MyTeam?.UserProfile}`}
                                            className="btn waves-effect waves-light text-white"
                                            style={{
                                              display: "flex",
                                              backgroundColor: "#62a6dc",
                                              borderRadius: "20px",
                                            }}
                                            to={`../${AdminRoute?.UserManagement?.MyTeam?.UserProfile?.replace(
                                              ":status",
                                              currentTab
                                            ).replace(":id", ele?.user_id)}`}
                                          >
                                            View More
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
              </div>
            </div>
          </div>
          {/* <Pagination
            totalPagess={totalPagess}
            setTotalPage={setTotalPage}
            totalItems={totalItems}
            setTotalItems={setTotalItems}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          /> */}
        </div>
      </div>
      {/* </AppLayout> */}
    </>
  );
};

export default LeaveNotify;
