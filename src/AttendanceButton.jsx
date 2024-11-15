import { useEffect, useState } from "react";
import { useAttendance } from "./AttendanceContext";
import API from "./Api/Api";
import { Tooltip } from "antd";
import { message } from "antd";

const AttendanceButton = () => {
  const { attendanceStatus, toggleAttendance, userLocation, setUserLocation } =
    useAttendance();

  const adminObject = JSON.parse(localStorage.getItem("TajurbaAdminUser"));

  // Check if the attendance status is persisted in localStorage
  const [status, setStatus] = useState(() => {
    const storedStatus = localStorage.getItem("attendanceStatus");
    return storedStatus ? storedStatus : "logged_out"; // Default to "logged_out" if no value is found
  });

  useEffect(() => {
    // Save the attendance status to localStorage when it changes
    localStorage.setItem("attendanceStatus", status);
  }, [status]);

  const handleAttendance = async () => {
    const requestData = {
      user_id: adminObject?._id,
      status: status === "logged_in" ? "logged_out" : "logged_in",
    };

    try {
      const response = await API.CommanApiCall({
        data: requestData,
        agent: "attendance",
      });

      if (response?.data?.data?.status === 200) {
        const newStatus = status === "logged_in" ? "logged_out" : "logged_in";
        setStatus(newStatus); // Update the status in both state and localStorage
        message.success(response?.data?.data?.message);
      } else {
        message.error(response?.data?.data?.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error during API call:", error);
      message.error("An error occurred while updating attendance.");
    }
  };

  return (
    <div style={{ paddingRight: "20px" }}>
      <Tooltip>
        <button
          onClick={handleAttendance}
          style={{
            width: "80px",
            height: "25px",
            color: "white",
            backgroundColor: "#62a6dc",
            border: "none",
            borderRadius: "15px",
            fontWeight: "bold",
          }}
        >
          {status === "logged_in" ? "Logout" : "Login"}
        </button>
      </Tooltip>
    </div>
  );
};

export default AttendanceButton;
