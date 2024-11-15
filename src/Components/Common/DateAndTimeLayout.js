import moment from "moment";
import React, { useEffect, useState } from "react";
import AttendanceButton from "../../AttendanceButton";
import API from "../../Api/Api";

export default function DateAndTimeLayout() {
  const [loginTime, setLoginTime] = useState(null);
  const [logoutTime, setLogoutTime] = useState(null);
  const [hoursWorked, setHoursWorked] = useState(null);
  const [loadingData, setLoadingData] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());
  const [listingData, setListingData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchAttendanceDetails = async () => {
      setLoadingData(true);
      try {
        const response = await API?.CommanApiCall({
          data: {
            /* Add any necessary data for your API call here */
          },
          agent: "attendance",
          function: "get_attendance_list_id",
        });
        console.log("listing date", response);

        if (response?.data?.data?.status === 200) {
          const attendanceData = response.data.data.data;
          setListingData(attendanceData);

          // Calculate total hours worked
          let totalMinutesWorked = 0;
          attendanceData.forEach((record) => {
            if (record.login_time && record.logout_time) {
              const login = moment(record.login_time);
              const logout = moment(record.logout_time);
              totalMinutesWorked += logout.diff(login, "minutes");
            }
          });

          // Convert total minutes to hours and minutes without decimals
          const hours = Math.floor(totalMinutesWorked / 60);
          const minutes = totalMinutesWorked % 60;
          setHoursWorked(`${hours}h ${minutes}m`);

          // Set the last login and logout times
          const lastLoginRecord = attendanceData.find(
            (record) => record.status === "logged_in"
          );
          const lastLogoutRecord = attendanceData.find(
            (record) => record.status === "logged_out"
          );
          setLoginTime(lastLoginRecord?.login_time);
          setLogoutTime(lastLogoutRecord?.logout_time);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchAttendanceDetails();
  }, []);

  return (
    <div className="row">
      <div className="col-12" style={{ height: "110px" }}>
        <div className="page-title-box d-flex align-items-center justify-content-end">
          <AttendanceButton />
          <h4 className="page-title mb-0 font-size-18 fw-normal text-end text-black">
            <span className="fw-normal d-flex align-items-center">
              {/* Always display Loggedin and Loggedout times, with fallback "--:--" if data is unavailable */}
              <span>Loggedin: {loginTime ? moment(loginTime).format("h:mm A") : "--:--"}</span>
              <span className="mx-2">|</span>
              <span>Loggedout: {logoutTime ? moment(logoutTime).format("h:mm A") : "--:--"}</span>
              <span className="mx-2">|</span>

              {/* Display total hours worked if calculated */}
              {hoursWorked && <span>Hours Worked: {hoursWorked}</span>}
            </span>
          </h4>
        </div>
      </div>
    </div>

  );
}
