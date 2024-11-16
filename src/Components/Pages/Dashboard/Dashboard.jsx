/* eslint-disable */
import React, { useEffect, useState, useRef, useCallback } from "react";
// import { Outlet } from "react-router-dom";
// import AppLayout from "../../Loyout/App";
import { NavLink, useParams } from "react-router-dom";
import downloadIcon from "../../../assets/images/CA/Svg/g2165.svg";
import teamImg from "../../../assets/images/team.png";
import contentConsumtionImg from "../../../assets/images/Group 23504.svg";
import DateAndTimeLayout from "../../Common/DateAndTimeLayout";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { ToastContainer, toast } from "react-toastify";
import API from "../../../Api/Api";
import { saveAs } from "file-saver";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import moment from "moment";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { LinkedinFilled } from "@ant-design/icons";
import dummy from "../../../assets/images/dummy-profile.jpg";

const Dashboard = () => {
  const [duration, setDuration] = useState("monthly");
  const [dashboardDetails, setDashboardDetails] = useState("");
  console.log("start", dashboardDetails);

  const calendarRef = useRef(null);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [events, setEvents] = useState([]);
  const [CosumptionDetails, setConsumptionDetails] = useState([]);

  const [loading, setLoading] = useState(true);
  const [userProfileDetails, setUserProfileDetails] = useState("");
  const [edit, setEdit] = useState(false);
  const adminObject = JSON.parse(localStorage.getItem("TajurbaAdminUser"));
  console.log("admin",adminObject);
  const [EmployeeList, setEmployeeList] = useState([]);


  const GetDetails = () => {
    try {
      API?.CommanApiCall({
        agent: "createAdminUser",
        function: "getUserDetails",
        data: {
          _id: adminObject._id,
        },
      }).then((response) => {
        if (response?.data?.data?.status === 200) {
          setUserProfileDetails(response?.data?.data?.data[0]);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

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
        console.log("employee", response)
        if (response?.status === 200) {
          setEmployeeList(response.data.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployeeList();
  }, []);

  useEffect(() => {
    GetDetails();
  }, []);


  function renderEventContent(eventInfo) {
    //console.log("eventInfo", eventInfo);

    const showEventDataObject = {
      Title: eventInfo.event.title,
      StartDate: moment(eventInfo.event.start).format("DD MMMM YYYY"),
      EndDate: moment(eventInfo.event.end).format("DD MMMM YYYY"),
      StartTime: eventInfo.timeText,
      EndTime: moment(eventInfo?.event?.end)?.format("h:mm:a"),
      Description: eventInfo?.event?.extendedProps?.description,
    };

    const tooltipContent = Object.entries(showEventDataObject)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

    return (
      <>
        <span
          style={{
            backgroundColor: "lightblue",
            color: "black",
            padding: "2px",
            borderRadius: "0px",
            zIndex: 1, // Ensure it is above other elements
            position: "relative", // Ensure it is above other elements
          }}
          data-toggle="tooltip"
          title={tooltipContent}
        >
          <b>
            {eventInfo.timeText}
          </b>{" "}
        </span>
      </>
    );
  }

  function generateTooltipContent(events) {
    return events
      .map((event, index) => {
        return `<div>
                  <strong>${index + 1}. ${event.title}</strong><br/>
                  ${event.start ? moment(event.start).format("h:mm a") : ""} - 
                  ${event.end ? moment(event.end).format("h:mm a") : ""}
                </div>`;
      })
      .join("");
  }

  const handleDayCellDidMount = (info) => {
    const eventsForDay = events.filter((event) =>
      moment(event.start).isSame(info.date, "day")
    );

    if (eventsForDay.length > 0) {
      tippy(info.el, {
        content: generateTooltipContent(eventsForDay),
        allowHTML: true,
      });
    }
  };

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.on("datesSet", (info) => {
        setCurrentMonth(info.view.currentStart.getMonth() + 1);
        setCurrentYear(info.view.currentStart.getFullYear());
      });
    }
  }, [currentMonth]);

  const handleDateNav = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().updateSize();
    }
  };

  // click for export data in csv

  const getEvents = async () => {
    try {
      await API?.CommanApiCall({
        data: {
          month: currentMonth,
          year: currentYear,
          timeframe: "halfYearly",
        },
        agent: "dashboard",
      }).then(async (response) => {
        console.log("Dashboard Details ", response?.data?.data?.data);
        setDashboardDetails(response?.data?.data?.data);
        await setEvents(response?.data?.data?.data?.eventCount);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getEVventsCb = useCallback(getEvents, [events.length]);
  useEffect(() => {
    getEVventsCb();
  }, [getEVventsCb]);

  const count0 = dashboardDetails?.communityCount?.[0]?.count || 0;
  const count1 = dashboardDetails?.communityCount?.[1]?.count || 0;
  const totalCommunitiesCount = count0 + count1;

  const user1 =
    dashboardDetails && dashboardDetails?.userCount.length
      ? dashboardDetails?.userCount[0]?.count
      : 0;
  const user2 =
    dashboardDetails && dashboardDetails?.userCount.length > 1
      ? dashboardDetails?.userCount[1]?.count
      : 0;

  const totalUser = user1 + user2;

  const handleClickCSV = () => {
    if (duration) {
      try {
        API?.CommanApiCall({
          agent: "dashboard",
          function: "exportToCsv",
          data: {
            timeframe: duration,
          },
        })
          .then((response) => {
            if (response?.data?.data?.status === 200) {
              let csvContent = response.data.data.data;
              console.log("CSV Content:", csvContent);

              // Ensure CSV content is formatted correctly
              csvContent = fixCsvFormatting(csvContent);

              if (csvContent) {
                const blob = new Blob([csvContent], { type: "text/csv" });
                saveAs(blob, "exported_data.csv");
              } else {
                console.error("Invalid CSV content:", csvContent);
              }
            } else {
              console.error(
                "API returned status:",
                response?.data?.data?.status
              );
            }
          })
          .catch((error) => {
            console.error("API call failed:", error);
          });
      } catch (error) {
        console.error("Error during API call:", error);
      }
    } else {
      toast.warning("Please select duration");
    }
  };

  // Function to fix CSV formatting
  const fixCsvFormatting = (csvContent) => {
    // Add necessary headers if missing
    const headers = "header1,header2,header3,..."; // replace with actual headers
    if (!csvContent.startsWith(headers)) {
      csvContent = `${headers}\n${csvContent}`;
    }

    // Ensure each row is properly terminated
    csvContent = csvContent
      .split("\n")
      .map((line) => line.trim())
      .join("\n");

    return csvContent;
  };

  const formatRevenue = (revenue) => {
    if (revenue >= 1000) {
      // If revenue is greater than or equal to 1000, convert it to k format
      return (revenue / 1000)?.toFixed(0) + "k";
    } else {
      // Otherwise, just return the revenue as is
      return revenue?.toString();
    }
  };

  useEffect(() => {
    GetConsumerConseptionDetails();
  }, []);

  // Api for get consumer consumption details
  const GetConsumerConseptionDetails = () => {
    try {
      API?.CommanApiCall({
        agent: "holiday_create",
        function: "get_holiday_list",
        // data: {
        //   user_id: parseInt(id),
        // },
      }).then((response) => {
        if (response?.data?.data?.status === 200) {
          setLoading(false);
          setConsumptionDetails(response?.data?.data?.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(dashboardDetails);

  return (
    <>
      {/* <AppLayout> */}
      <ToastContainer />
      <div className="main-content" id="dashboard">
        <div className="page-content h-100 ">
          {/* start page title */}
          <DateAndTimeLayout />
          {/* end page title */}
          <div className="row">
            <div className="col-xl-6">
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "7px",
                  height: "240px",
                  padding: "15px",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <img
                  // crossOrigin="Anonymous"
                  src={adminObject && adminObject?.image}
                  alt="Profile"
                  className="profile"
                  id="profile-picture-custome"
                  style={{
                    width: "160px",  // Decrease the width of the image
                    height: "160px", // Adjust height to maintain aspect ratio if needed
                    borderRadius: "50%", // Optional: To make the image circular
                  }}
                />
                <div
                  className="consumerProfileText ms-3"
                  style={{
                    flex: 1, // This will make the text container take up the remaining space
                  }}
                >
                  <h3 className="fw-bold letter-spacing-6" style={{ marginBottom: "20px" }}>
                    {adminObject && adminObject?.first_name}{" "}
                    {adminObject && adminObject?.last_name}
                  </h3>
                  <div style={{ display: "flex", gap: "2rem" }}>
                    {/* <div>
                      <p style={{ color: "#A9A9A9" }}>
                        Role:{" "}
                        <span
                          style={{
                            color: "black",
                            fontWeight: "normal",
                            fontSize: "13px",
                            paddingLeft: "4px",
                          }}
                        >
                          {adminObject.role_details.name}
                        </span>
                      </p>
                    </div> */}
                    <div>
                      <p style={{ color: "#A9A9A9" }}>
                        Position:{" "}
                        <span
                          style={{
                            color: "black",
                            fontWeight: "normal",
                            fontSize: "13px",
                            paddingLeft: "4px",
                          }}
                        >
                          {adminObject.employee_type || "Management"}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <p style={{ color: "#A9A9A9" }}>
                      Email:{" "}
                      <span
                        style={{
                          color: "black",
                          fontWeight: "normal",
                          fontSize: "13px",
                          paddingLeft: "4px",
                        }}
                      >
                        {adminObject.email}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p style={{ color: "#A9A9A9" }}>
                      Phone:{" "}
                      <span
                        style={{
                          color: "black",
                          fontWeight: "normal",
                          fontSize: "13px",
                          paddingLeft: "4px",
                        }}
                      >
                        +(91) {adminObject.mobile_no}
                      </span>
                    </p>
                  </div>
                  {/* <LinkedinFilled style={{ fontSize: "1.5rem", color: "#1877F2" }} /> */}
                </div>
              </div>

              <div
                className="main-card bg-white p-4"
                style={{ borderRadius: "7px" }}
              >
                <h3 className="fw-bold">Holiday Schedule</h3>

                {/* <img src={contentConsumtionImg} className="img-fluid w-70" /> */}
                <div className="row mt-3">
                  <div className="col-12">
                    <table
                      className="table tablesWrap scrollTable scroll__y"
                      style={{ minHeight: "30px", maxHeight: "30px" }}
                    >
                      <thead>
                        <tr>
                          <th scope="col" className="lightGrey" style={{fontWeight: "600"}}>
                            Holiday Name
                          </th>
                          <th scope="col" className="lightGrey" style={{fontWeight: "600"}}>
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="">
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
                            {CosumptionDetails && CosumptionDetails?.length ? (
                              CosumptionDetails?.map((ele, index) => {
                                return (
                                  <tr key={index}>
                                    <td
                                      scope="row"
                                      className="darkGrey fw-bold"
                                    >
                                      {ele?.holiday_name}
                                    </td>
                                    <td className="darkGrey">
                                      {new Date(
                                        ele?.holiday_date
                                      ).toLocaleString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                      })}{" "}
                                      {ele?.paid_amount}
                                    </td>
                                  </tr>
                                );
                              })
                            ) : (
                              <>
                                <tr>
                                  <td colSpan={2} className="text-center">
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
             
              <div className="main-card bg-white p-4" style={{
                borderRadius: "7px",
                width: "100%",
              }}>
                <h3 className="fw-bold">My Team</h3>

                {/* Map through the employees list */}
                <div className="row mt-3" style={{
                  height: "355px", // Fixed height for the card
                  margin: "0 auto", // Center the card horizontally
                  overflowY: "auto", 
                  padding: "5px",
                }}>
                  <div className="col-12">
                    {loading ? (
                      <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        {EmployeeList && EmployeeList.length ? (
                          EmployeeList.map((employee, index) => (
                            <div
                              key={index}
                              className="team-card d-flex align-items-center mb-3"
                              style={{
                                backgroundColor: "white",
                                borderRadius: "15px",
                                padding: "5px",
                                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                                height: "75px",
                              }}
                            >
                              <img
                                //src={employee.profilePicture}
                                src={dummy}
                                alt={`${employee.first_name}`}
                                style={{
                                  width: "60px",
                                  height: "60px",
                                  borderRadius: "50%",
                                  marginRight: "20px",
                                }}
                              />
                              <div style={{marginTop: "18px"}}>
                                <h5 className="fw-bold" style={{ marginBottom: "5px" }}>
                                  {employee.first_name}
                                </h5>
                                <p style={{ marginBottom: "5px", color: "#A9A9A9" }}>
                                  Email:{" "}
                                  <span style={{ color: "black", fontWeight: "normal" }}>
                                    {employee.email}
                                  </span>
                                </p>
                                <p style={{ color: "#A9A9A9" }}>
                                  Role:{" "}
                                  <span style={{ color: "black", fontWeight: "normal" }}>
                                    {employee.employeeType}
                                  </span>
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-center">No employees found</p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              {/* <div className="main-card p-0">
                <div className="px-4">
                  <div className="pofileInfo">
                    <div className="row d-flex align-items-center">
                      <div className="">
                        <div className="d-flex align-items-center">
                          <img
                            // crossOrigin="Anonymous"
                            src={adminObject && adminObject?.image}
                            alt="Profile"
                            className="  profile "
                            id="profile-picture-custome"
                          />
                          <div className="consumerProfileText ms-3">
                            <h2 className="fw-bold letter-spacing-6">
                              {adminObject && adminObject?.first_name}{" "}
                              {adminObject && adminObject?.last_name}
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p>Personal Details</p>
                    <hr className="borderHr mb-4" />
                    <div className="row pb-5">
                      <div className="col-6">
                        {" "}
                        <div className="">
                          <p>Email</p>
                          <h5 className="fw-bold">
                            {" "}
                            {adminObject && adminObject?.email}
                          </h5>
                        </div>
                        <div className="mt-5">
                          <p>Employee Type</p>
                          <h5 className="fw-bold">
                            {adminObject && adminObject?.result?.name}
                          </h5>
                        </div>
                        <div className="mt-5">
                          <p>Registration Date</p>
                          <h5 className="fw-bold">
                            {moment(
                              adminObject && adminObject?.createdAt
                            ).format("DD-MM-YYYY")}
                          </h5>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="border-left-grey h-100">
                          <div className="ps-4">
                            {" "}
                            <div className="">
                              <p>Contact</p>
                              <h5 className="fw-bold">
                                {" "}
                                {adminObject && adminObject?.mobile_no}
                              </h5>
                            </div>
                           
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="col-xl-6">
              <div
                className="main-card bg-white p-4"
                style={{ borderRadius: "7px" }}
              >
                <h3 className="fw-bold">Attendance</h3>
                <div>
                  {/* <OwlCarousel
                    className="owl-theme"
                    loop
                    margin={10}
                    nav
                    items={1}
                    dots={false}
                    // onTranslated={handleDateNav}
                  > */}
                  <div>
                    <div>
                      <div>
                        <div>
                          {events && events?.length > 0 ? (
                            <FullCalendar
                              plugins={[
                                dayGridPlugin,
                                timeGridPlugin,
                                interactionPlugin,
                              ]}
                              // headerToolbar={{
                              //   start:
                              //     "dayGridMonth,timeGridWeek,timeGridDay",
                              //   center: "title",
                              //   end: "prevYear,prev,today,next,nextYear",
                              // }}
                              // buttonText={{
                              //   // Custom button text
                              //   today: "Today",
                              //   prevYear: "Previous Year",
                              //   nextYear: "Next Year",
                              // }}
                              initialView="dayGridMonth"
                              eventTimeFormat={{
                                hour: "numeric",
                                minute: "2-digit",
                                meridiem: "short",
                              }}
                              weekends={true}
                              ref={calendarRef}
                              events={events}
                              eventContent={renderEventContent}
                              datesSet={handleDateNav}
                              progressiveEventRendering={true}
                              dayCellDidMount={handleDayCellDidMount}
                              eventDisplay="list-item"
                            />
                          ) : (
                            <div class="d-flex justify-content-center">
                              <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* </OwlCarousel> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </AppLayout> */}
    </>
  );
};

export default Dashboard;
