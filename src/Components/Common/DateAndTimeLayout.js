import moment from "moment";
import React, { useEffect, useState } from "react";
import AttendanceButton from "../../AttendanceButton";
import API from "../../Api/Api";

export default function DateAndTimeLayout() {
  const [loginTime, setLoginTime] = useState(null);
  const [logoutTime, setLogoutTime] = useState(null);
  const [hoursWorked, setHoursWorked] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [listingData, setListingData] = useState([]);

  useEffect(() => {
    const fetchAttendanceDetails = async () => {
      try {
        const response = await API?.CommanApiCall({
          data: {
            /* Add any necessary data for your API call here */
          },
          agent: "attendance",
          function: "get_attendance_list_id",
        });
        console.log("listing data", response);

        if (response?.data?.data?.status === 200) {
          const attendanceData = response.data.data.data;
          setListingData(attendanceData);

          // Extract and set login and logout times
          const firstLogin = attendanceData?.firstLogin?.createdAt;
          const lastLogout = attendanceData?.lastLogout?.createdAt;

          setLoginTime(firstLogin || null);
          setLogoutTime(lastLogout || null);

          // Calculate total hours worked if both login and logout are available
          if (firstLogin && lastLogout) {
            const loginMoment = moment(firstLogin);
            const logoutMoment = moment(lastLogout);
            const duration = moment.duration(logoutMoment.diff(loginMoment));
            const totalHours = duration.hours() + duration.minutes() / 60;
            setHoursWorked(totalHours.toFixed(2));
          } else {
            setHoursWorked(null);
          }
        }
      } catch (error) {
        console.error("Error fetching attendance details:", error);
      } finally {
        setLoadingData(false); // Stop loading when the fetch is done
      }
    };

    fetchAttendanceDetails();
  }, []);

  return (
    <div className="row">
      <div className="col-12" style={{ height: "110px" }}>
        <div className="page-title-box d-flex align-items-center justify-content-end">
          <AttendanceButton />

          {!loadingData ? (
            <h4 className="page-title mb-0 font-size-18 fw-normal text-end text-black">
              <span className="fw-normal d-flex align-items-center">
                <span>
                  Login:{" "}
                  {loginTime ? moment(loginTime).format("h:mm A") : "--:--"}
                </span>
                <span className="mx-2">|</span>
                <span>
                  Logout:{" "}
                  {logoutTime ? moment(logoutTime).format("h:mm A") : "--:--"}
                </span>
              </span>
            </h4>
          ) : (
            <h4 className="page-title mb-0 font-size-18 fw-normal text-end text-black">
              <span>Loading Attendance Data...</span>
            </h4>
          )}
        </div>

        {/* Optionally display total hours worked */}
        {/* {!loadingData && hoursWorked !== null && (
          <div className="text-end text-black">
            <span>Total Hours Worked: {hoursWorked} hrs</span>
          </div>
        )} */}
      </div>
    </div>
  );
}
