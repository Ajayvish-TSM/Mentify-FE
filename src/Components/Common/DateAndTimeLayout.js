import moment from "moment";
import React, { useEffect, useState } from "react";
import AttendanceButton from "../../AttendanceButton";
import API from "../../Api/Api";

export default function DateAndTimeLayout() {
  const [loginTime, setLoginTime] = useState(null);
  const [logoutTime, setLogoutTime] = useState(null);
  const [hoursWorked, setHoursWorked] = useState(null);
  const [loadingData, setLoadingData] = useState(true); // Start loading state as true
  const [dateTime, setDateTime] = useState(new Date());
  const [listingData, setListingData] = useState([]); // Start with an empty array

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
          console.log("flsfjsdlfsdflkdsjflsdjf", response);
          setListingData(attendanceData);

          if (
            attendanceData.firstLogin?.login_time &&
            attendanceData.lastLogout?.login_time
          ) {
            setLoginTime(attendanceData.firstLogin.login_time);
            setLogoutTime(attendanceData.lastLogout.login_time);

            // Calculate total hours worked
            const loginMoment = moment(attendanceData.firstLogin.login_time);
            const logoutMoment = moment(attendanceData.lastLogout.login_time);
            const duration = moment.duration(logoutMoment.diff(loginMoment));

            const totalHours = duration.hours() + duration.minutes() / 60;
            setHoursWorked(totalHours.toFixed(2));
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

          {/* Only display the content after the data has finished loading */}
          {!loadingData ? (
            <h4 className="page-title mb-0 font-size-18 fw-normal text-end text-black">
              <span className="fw-normal d-flex align-items-center">
                {/* Display login time if available and user is logged in */}
                {loginTime && !logoutTime && (
                  <>
                    <span>Login: {moment(loginTime).format("h:mm A")}</span>
                    <span className="mx-2">|</span>
                  </>
                )}

                {/* Display both login and logout times if user has logged out */}
                {loginTime && logoutTime && (
                  <>
                    <span>Loggedin: {moment(loginTime).format("h:mm A")}</span>
                    <span className="mx-2">|</span>
                    <span>
                      Loggedout: {moment(logoutTime).format("h:mm A")}
                    </span>
                    <span className="mx-2">|</span>
                  </>
                )}

                {/* Display total hours worked if calculated */}
                {hoursWorked && <span>Hours Worked: {hoursWorked}</span>}
              </span>
            </h4>
          ) : (
            <h4 className="page-title mb-0 font-size-18 fw-normal text-end text-black">
              <span>Loading Attendance Data...</span>
            </h4>
          )}
        </div>
      </div>
    </div>
  );
}
