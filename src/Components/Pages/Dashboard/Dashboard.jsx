/* eslint-disable */
import React, { useEffect, useState, useRef, useCallback } from "react";
// import { Outlet } from "react-router-dom";
// import AppLayout from "../../Loyout/App";
import { NavLink } from "react-router-dom";
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

  // console.log(
  //   "Start date in Event listing",
  //   moment("2024-06-17T13:44:00.000Z").format("h:mm a'")
  // );
  // console.log(
  //   "End date in Event listing",
  //   moment("2024-06-18T09:45:00.000Z").format("h:mm a'")
  // );

  // console.log(
  //   "Start date in Calender Event",
  //   moment("2024-06-17T13:44:00").format("h:mm a'")
  // );
  // console.log(
  //   "End date in Calender Event",
  //   moment("2024-06-18T09:45:00").format("h:mm a'")
  // );

  // const events = [
  //   {
  //     _id: "6661854bc717dde18537d5a6",
  //     event_id: 95,
  //     start: "2024-06-06T18:20:00",
  //     end: "2024-06-14T10:45:00",
  //     title: "Super#11",
  //     description: "Consequat Nihil exp",
  //   },
  //   {
  //     _id: "6661a5a63ef451ee46386387",
  //     event_id: 96,
  //     start: "2024-06-07T10:54:00",
  //     end: "2024-06-11T16:00:00",
  //     title: "Test#1221",
  //     description: "Nisi voluptatum quis",
  //   },
  //   {
  //     _id: "6661b6da3ef451ee463864b0",
  //     event_id: 97,
  //     start: "2024-06-07T18:20:00",
  //     end: "2024-06-15T05:21:00",
  //     title: "Thane Acosta",
  //     description: "Natus exercitationem",
  //   },
  //   {
  //     _id: "66602a5d1ef3c8db7f02cf91",
  //     event_id: 93,
  //     start: "2024-06-21T11:04:00",
  //     end: "2024-06-28T13:04:00",
  //     title: "Saga GAmes ",
  //     description:
  //       "Presenting the game compitition for all the players in pan india. Tournament  entery fees is not applicable if player is not in professional form",
  //   },
  //   {
  //     _id: "6661854bc717dde18537d5a6",
  //     event_id: 95,
  //     start: "2024-06-06T18:20:00",
  //     end: "2024-06-14T10:45:00",
  //     title: "Super#11",
  //     description: "Consequat Nihil exp",
  //   },
  //   {
  //     _id: "6661a5a63ef451ee46386387",
  //     event_id: 96,
  //     start: "2024-06-07T10:54:00",
  //     end: "2024-06-11T16:00:00",
  //     title: "Test#1221",
  //     description: "Nisi voluptatum quis",
  //   },
  //   {
  //     _id: "6661b6da3ef451ee463864b0",
  //     event_id: 97,
  //     start: "2024-06-07T18:20:00",
  //     end: "2024-06-15T05:21:00",
  //     title: "Thane Acosta",
  //     description: "Natus exercitationem",
  //   },
  //   {
  //     _id: "66602a5d1ef3c8db7f02cf91",
  //     event_id: 93,
  //     start: "2024-06-21T11:04:00",
  //     end: "2024-06-28T13:04:00",
  //     title: "Saga GAmes ",
  //     description:
  //       "Presenting the game compitition for all the players in pan india. Tournament  entery fees is not applicable if player is not in professional form",
  //   },
  // ];

  // functionality for Calender
  // const events = [
  //   { title: "Meeting 1", start: new Date() },

  //   {
  //     title: "Meeting in 2024",
  //     start: "2024-05-23T06:19:45",
  //     end: "2024-04-23T06:20:45",
  //     description: "Lecture",
  //   },
  //   {
  //     title: "Meeting in 2024",
  //     start: "2024-05-23T06:19:45",
  //     end: "2024-05-23T06:20:45",
  //     description: "Lecture",
  //   },

  //   {
  //     title: "Meeting in 2025",
  //     start: "2025-05-23T06:19:45",
  //     end: "2025-04-23T06:20:45",
  //     description: "Event in 2025",
  //   },
  //   {
  //     title: "Meeting in 2026",
  //     start: "2026-10-23T06:19:45",
  //     end: "2026-10-23T06:20:45",
  //     description: "Event in 2026",
  //   },
  // ];

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
            {/* to {"  "}
            {eventInfo?.event?.end
              ? moment(eventInfo?.event?.end)?.format("h:mm:a")
              : null} */}
          </b>{" "}
          {/* <i>
            {" "}
            {eventInfo.event.title.length > 10
              ? eventInfo.event.title.substring(0, 10) + "..."
              : eventInfo.event.title}
          </i> */}
          {/* <div>{eventInfo.event.description}</div> */}
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
  // const handleClickCSV = () => {
  //   // console.log("duration", duration);
  //   if (duration) {
  //     try {
  //       API?.CommanApiCall({
  //         agent: "dashboard",
  //         function: "exportToCsv",
  //         data: {
  //           timeframe: duration,
  //         },
  //       })
  //         .then((response) => {
  //           if (response?.data?.data?.status === 200) {
  //             const excelUrl = response.data.data.data;
  //             console.log("Excel URL:", excelUrl);

  //             // Check if URL is valid
  //             if (excelUrl) {
  //               // Use file-saver to initiate download
  //               saveAs(excelUrl, "exported_data.csv"); // Make sure to use .csv extension
  //             } else {
  //               console.error("Invalid Excel URL:", excelUrl);
  //             }
  //           } else {
  //             console.error(
  //               "API returned status:",
  //               response?.data?.data?.status
  //             );
  //           }
  //         })
  //         .catch((error) => {
  //           console.error("API call failed:", error);
  //         });
  //     } catch (error) {
  //       console.error("Error during API call:", error);
  //     }
  //   } else {
  //     toast.warning("Please select duration");
  //   }
  // };

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
        agent: "course",
        function: "content_consumtion",
        // data: {
        //   user_id: parseInt(id),
        // },
      }).then((response) => {
        //   console.log(response?.data?.data);
        if (response?.data?.data?.status === 200) {
          setLoading(false);
          setConsumptionDetails(response?.data?.data?.data);

          // console.log(
          //   "response for Get Consumption details api",
          //   response?.data?.data?.data
          // );
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
          {/* <div className="row h-100">
                     <div className="col-12 main-card mb-5 d-flex align-items-center justify-content-center border-radius-10">
                        <img src={DashboardImg} className="img-fluid" />
                     </div>
                  </div> */}
          <div className="row justify-content-end">
            <div className="col-xl-6 mb-4">
              <div className="d-flex justify-content-xl-end">
                <select
                  className="form-select me-3 w-40 bg-white border-0 greyLight"
                  aria-label="Default select example"
                  value={duration}
                  onChange={(e) => {
                    setDuration(e.target.value);
                  }}
                >
                  <option value="monthly">This Month</option>
                  <option value="quarterly">Quaterly</option>
                  <option value="halfYearly">Half Yearly</option>
                  <option value="yearly">Yearly</option>
                </select>
                <NavLink
                  onClick={() => {
                    handleClickCSV();
                  }}
                  className="btn bgBlack text-white border-radius-2 px-4 float-end"
                  to=""
                >
                  <span>
                    Export Data in .csv{" "}
                    <img src={downloadIcon} className="ms-1" />
                    {/* <i className="fa fa-solid fa-plus ms-1 text-white"></i> */}
                  </span>
                </NavLink>
              </div>
            </div>
          </div>
          {/* end page title */}
          <div className="row">
            <div className="col-xl-6">
              <div className="main-card bg-white p-4 pt-5">
                <div className="d-flex justify-content-between">
                  <h3 className="fw-bold">Total Revenue</h3>
                  <div className="text-end">
                    <h2 className="h2 fw-bold self-font-family">
                      ₹{" "}
                      {formatRevenue(
                        dashboardDetails && dashboardDetails?.total_revenue
                      )}
                    </h2>
                    <span className="defaultGrey ">Till Date</span>
                  </div>
                </div>
                <div class="row dashboard-bg mt-4 mx-1">
                  <div class="col px-0 py-2 text-center">
                    <div className="border-right-lightgrey p-2 h-100 dashboard-col">
                      <p className="darkGrey">Course Content</p>
                      <h4 className="mb-0">
                        {" "}
                        {formatRevenue(
                          dashboardDetails &&
                            dashboardDetails?.total_course_amount
                        )}
                      </h4>
                    </div>
                  </div>
                  <div class="col px-0 py-2 text-center">
                    <div className="border-right-lightgrey p-2 h-100 dashboard-col">
                      <p className="darkGrey">Events</p>
                      <h4 className="mb-0">
                        {" "}
                        {formatRevenue(
                          dashboardDetails &&
                            dashboardDetails?.total_event_amount
                        )}
                      </h4>
                    </div>
                  </div>
                  <div class="col px-0 py-2 text-center">
                    <div className="border-right-lightgrey p-2 h-100 dashboard-col">
                      <p className="darkGrey">Subscription</p>
                      <h4 className="mb-0">
                        {formatRevenue(
                          dashboardDetails &&
                            dashboardDetails?.total_subscription_amount
                        )}
                      </h4>
                    </div>
                  </div>
                  {/* <div class="col px-0 py-2 text-center">
                      <div className="border-right-lightgrey p-2 h-100 dashboard-col">
                        <p className="darkGrey">Community</p>
                        <h4 className="mb-0">2k</h4>
                      </div>
                    </div> */}
                  {/* <div class="col px-0 py-2 text-center">
                      <div className="p-2 dashboard-col h-100">
                        <p className="darkGrey">Session</p>
                        <h4 className="mb-0">46k</h4>
                      </div>
                    </div> */}
                </div>
              </div>
              <div className="main-card bg-white p-4 pt-5">
                <div className="d-flex justify-content-between">
                  <h3 className="fw-bold">Total Communities</h3>
                  <div className="text-end">
                    <h2 className="h2 fw-bold">{totalCommunitiesCount}</h2>
                    <span className="defaultGrey ">Till Date</span>
                  </div>
                </div>
                <div class="row dashboard-bg mt-4 mx-1">
                  <div class="col-6 px-0 py-2 text-center">
                    <div className="border-right-lightgrey p-2 h-100">
                      <p className="darkGrey">Paid Community</p>
                      <h4 className="mb-0">
                        {(dashboardDetails &&
                          dashboardDetails?.communityCount[0] &&
                          dashboardDetails?.communityCount[0]?.count) ||
                          0}
                      </h4>
                    </div>
                  </div>
                  <div class="col-6 px-0 py-2 text-center">
                    <div className="p-2 h-100">
                      <p className="darkGrey">Free Community</p>
                      <h4 className="mb-0">
                        {(dashboardDetails &&
                          dashboardDetails?.communityCount[1] &&
                          dashboardDetails?.communityCount[1]?.count) ||
                          0}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="main-card bg-white px-4 py-5">
                <div className="d-flex justify-content-between">
                  <h3 className="fw-bold">Total Users</h3>
                  <div className="text-end">
                    <h2 className="h2 fw-bold">
                      {/* {(dashboardDetails &&
                        dashboardDetails?.userCount[0]?.count) ||
                        0 + dashboardDetails?.userCount[1]?.count ||
                        0} */}
                      {totalUser}
                    </h2>
                    <span className="defaultGrey ">Till Date</span>
                  </div>
                </div>
                <div class="row dashboard-bg mt-4 mx-1">
                  <div class="col-6 px-0 py-2 text-center">
                    <div className="border-right-lightgrey p-2 h-100">
                      <p className="darkGrey">Free Users</p>
                      <h4 className="mb-0">
                        {/* {(dashboardDetails &&
                          dashboardDetails?.userCount[0] &&
                          dashboardDetails?.userCount[0]?.count) ||
                          0} */}
                        {user1}
                      </h4>
                    </div>
                  </div>

                  <div class="col-6 px-0 py-2 text-center">
                    <div className="p-2 h-100">
                      <p className="darkGrey">Paid Users</p>
                      <h4 className="mb-0">
                        {/* {(dashboardDetails &&
                          dashboardDetails?.userCount[1] &&
                          dashboardDetails?.userCount[1]?.count) ||
                          0} */}
                        {user2}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="height-80"></div>
              </div>
            </div>
            {/* <div className="col-xl-6">
                <div className="main-card bg-white p-3">
                  <h3 className="fw-bold">My To Do</h3>
                  <div>
                    <OwlCarousel
                      className="owl-theme"
                      loop
                      margin={10}
                      nav
                      items={1}
                      dots={false}
                    >
                      <div class="item text-center">
                        <div>
                          <p>January</p>
                          <div>
                            <div
                              className="d-flex justify-content-between nav nav-pills mb-3"
                              id="pills-tab"
                              role="tablist"
                            >
                              <div className="nav-item" role="presentation">
                                <button
                                  className="nav-link active"
                                  id="pills-home-tab"
                                  data-bs-toggle="pill"
                                  data-bs-target="#pills-home"
                                  type="button"
                                  role="tab"
                                  aria-controls="pills-home"
                                  aria-selected="true"
                                >
                                  <span className="fw-bold">18</span>
                                  <div>Sat</div>
                                </button>
                              </div>
                              <div className="nav-item" role="presentation">
                                <button
                                  className="nav-link"
                                  id="pills-profile-tab"
                                  data-bs-toggle="pill"
                                  data-bs-target="#pills-profile"
                                  type="button"
                                  role="tab"
                                  aria-controls="pills-profile"
                                  aria-selected="false"
                                >
                                  <span className="fw-bold">19</span>
                                  <div>Sun</div>
                                </button>
                              </div>
                              <div className="nav-item" role="presentation">
                                <button
                                  className="nav-link"
                                  id="pills-contact-tab"
                                  data-bs-toggle="pill"
                                  data-bs-target="#pills-contact"
                                  type="button"
                                  role="tab"
                                  aria-controls="pills-contact"
                                  aria-selected="false"
                                >
                                  <span className="fw-bold">20</span>
                                  <div>Mon</div>
                                </button>
                              </div>
                              <div className="nav-item" role="presentation">
                                <button
                                  className="nav-link"
                                  id="tue-home-tab"
                                  data-bs-toggle="pill"
                                  data-bs-target="#tue-home"
                                  type="button"
                                  role="tab"
                                  aria-controls="tue-home"
                                  aria-selected="false"
                                >
                                  <span className="fw-bold">20</span>
                                  <div>Tue</div>
                                </button>
                              </div>
                              <div className="nav-item" role="presentation">
                                <button
                                  className="nav-link"
                                  id="wed-home-tab"
                                  data-bs-toggle="pill"
                                  data-bs-target="#wed-home"
                                  type="button"
                                  role="tab"
                                  aria-controls="wed-home"
                                  aria-selected="false"
                                >
                                  <span className="fw-bold">21</span>
                                  <div>Wed</div>
                                </button>
                              </div>
                              <div className="nav-item" role="presentation">
                                <button
                                  className="nav-link"
                                  id="thu-home-tab"
                                  data-bs-toggle="pill"
                                  data-bs-target="#thu-home"
                                  type="button"
                                  role="tab"
                                  aria-controls="thu-home"
                                  aria-selected="false"
                                >
                                  <span className="fw-bold">22</span>
                                  <div>Thu</div>
                                </button>
                              </div>
                              <div className="nav-item" role="presentation">
                                <button
                                  className="nav-link"
                                  id="fri-home-tab"
                                  data-bs-toggle="pill"
                                  data-bs-target="#fri-home"
                                  type="button"
                                  role="tab"
                                  aria-controls="fri-home"
                                  aria-selected="false"
                                >
                                  <span className="fw-bold">23</span>
                                  <div>Fri</div>
                                </button>
                              </div>
                            </div>
                            <div
                              className="tab-content pt-3"
                              id="pills-tabContent"
                            >
                              <div
                                className="tab-pane fade show active"
                                id="pills-home"
                                role="tabpanel"
                                aria-labelledby="pills-home-tab"
                              >
                                sat
                              </div>
                              <div
                                className="tab-pane fade"
                                id="pills-profile"
                                role="tabpanel"
                                aria-labelledby="pills-profile-tab"
                              >
                                sun
                              </div>
                              <div
                                className="tab-pane fade"
                                id="pills-contact"
                                role="tabpanel"
                                aria-labelledby="pills-contact-tab"
                              >
                                Mon
                              </div>
                              <div
                                className="tab-pane fade"
                                id="tue-home"
                                role="tabpanel"
                                aria-labelledby="tue-home-tab"
                              >
                                Tue
                              </div>
                              <div
                                className="tab-pane fade"
                                id="wed-home"
                                role="tabpanel"
                                aria-labelledby="wed-home-tab"
                              >
                                Wed
                              </div>
                              <div
                                className="tab-pane fade"
                                id="thu-home"
                                role="tabpanel"
                                aria-labelledby="thu-home-tab"
                              >
                                Thu
                              </div>
                              <div
                                className="tab-pane fade"
                                id="fri-home"
                                role="tabpanel"
                                aria-labelledby="fri-home-tab"
                              >
                                Fri
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="item  text-center">
                        <p>February</p>
                      </div>
                      <div class="item  text-center">
                        <p>March</p>
                      </div>
                      <div class="item  text-center">
                        <p>April</p>
                      </div>
                      <div class="item  text-center">
                        <p>May</p>
                      </div>
                      <div class="item  text-center">
                        <p>June</p>
                      </div>
                      <div class="item  text-center">
                        <p>July</p>
                      </div>
                      <div class="item  text-center">
                        <p>August</p>
                      </div>
                      <div class="item  text-center">
                        <p>September</p>
                      </div>
                      <div class="item  text-center">
                        <p>October</p>
                      </div>
                      <div class="item  text-center">
                        <p>November</p>
                      </div>
                      <div class="item  text-center">
                        <p>December</p>
                      </div>
                    </OwlCarousel>
                  </div>
                </div>
                <div className="main-card bg-white p-3">
                  <h3 className="fw-bold">Content Consumtion</h3>
                  <div className="p-5">
                    <img src={contentConsumtionImg} className="img-fluid" />
                  </div>
                </div>
              </div> */}
            <div className="col-xl-6">
              <div className="main-card bg-white p-4">
                <h3 className="fw-bold">My To Do </h3>
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
              <div className="main-card bg-white p-4">
                <h3 className="fw-bold">Content Consumtion</h3>

                {/* <img src={contentConsumtionImg} className="img-fluid w-70" /> */}
                <div className="row mt-3">
                  <div className="col-12">
                    <table
                      className="table tablesWrap scrollTable scroll__y"
                      style={{ minHeight: "30px", maxHeight: "30px" }}
                    >
                      <thead>
                        <tr>
                          <th scope="col" className="lightGrey">
                            Content list
                          </th>
                          <th scope="col" className="lightGrey">
                            Price
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
                                      {ele.course_data?.course_title}
                                    </td>
                                    <td className="darkGrey">
                                      {ele?.paid_amount}/-
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
            </div>
          </div>
        </div>
      </div>
      {/* </AppLayout> */}
    </>
  );
};

export default Dashboard;
