import moment from "moment";
import React, { useEffect, useState } from "react";
import AttendanceButton from "../../AttendanceButton";
import API from "../../Api/Api";

export default function DateAndTimeLayout() {
  const [loginTime, setLoginTime] = useState(null);
  const [logoutTime, setLogoutTime] = useState(null);
  const [hoursWorked, setHoursWorked] = useState(null);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    const fetchAttendanceDetails = async () => {
      setLoadingData(true);
      try {
        const response = await API?.CommanApiCall({
          data: { /* Add any necessary data for your API call here */ },
          agent: "attendance",
          function: "get_attendance_list_id",
        });
        console.log("listing date", response)

        if (response?.data?.data?.status === 200) {
          const attendanceData = response.data.data.data;
          const login = attendanceData?.login_time;
          const logout = attendanceData?.logout_time;

          setLoginTime(login);
          setLogoutTime(logout);

          // Calculate hours worked if both login and logout times are available
          if (login && logout) {
            const duration = moment.duration(moment(logout).diff(moment(login)));
            setHoursWorked(duration.hours() + "h " + duration.minutes() + "m");
          }
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
      <div className="col-12" style={{height: "110px"}}>
        <div className="page-title-box d-flex align-items-center justify-content-end mt-4">
          <AttendanceButton />
          <h4 className="page-title mb-0 font-size-18 fw-normal text-end text-black">
            <span className="fw-normal d-flex align-items-center">
              {/* Display login and logout times if available */}
              {loginTime && (
                <>
                  <span>Login: {moment(loginTime).format("h:mm A")}</span>
                  <span className="mx-2">|</span>
                </>
              )}
              {logoutTime && (
                <>
                  <span>Logout: {moment(logoutTime).format("h:mm A")}</span>
                  <span className="mx-2">|</span>
                </>
              )}

              {/* Display hours worked */}
              {hoursWorked && (
                <span>Hours Worked: {hoursWorked}</span>
              )}
            </span>
          </h4>
        </div>
      </div>
    </div>
  );
}
