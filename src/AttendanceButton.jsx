import { useEffect, useState } from "react";
import { useAttendance } from "./AttendanceContext";
import API from "./Api/Api";
import { Tooltip } from "antd";
import { message } from 'antd';

const AttendanceButton = () => {
  // const { attendanceStatus, toggleAttendance, userLocation } = useAttendance();
  const { attendanceStatus, toggleAttendance, userLocation, setUserLocation } =
    useAttendance();
  const [isWithinRadius, setIsWithinRadius] = useState(false);

  const adminObject = JSON.parse(localStorage.getItem("TajurbaAdminUser"));
  const userL = JSON.parse(localStorage.getItem("userLocation"));

  // Static office coordinates for testing
  const officeCoordinates = {
    latitude: 18.5824375,
    longitude: 73.7263487,
  };

  // Calculate distance between user and office
  const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {
    const R = 6371000;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      0.5 -
      Math.cos(dLat) / 2 +
      (Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        (1 - Math.cos(dLon))) /
        2;
    return (R * 2 * Math.asin(Math.sqrt(a))) / 1000; // Distance in meters
  };

  useEffect(() => {
    if (userLocation?.latitude && userLocation?.longitude) {
      const distance = getDistanceFromLatLonInMeters(
        userLocation.latitude,
        userLocation.longitude,
        officeCoordinates.latitude,
        officeCoordinates.longitude
      );
      // console.log("Distance from office:", distance);
      setIsWithinRadius(distance <= 10);
    }
  }, [userLocation]);
  // console.log(
  //   "distandce",
  //   getDistanceFromLatLonInMeters(
  //     userLocation.latitude,
  //     userLocation.longitude,
  //     officeCoordinates.latitude,
  //     officeCoordinates.longitude
  //   )
  // );


  const handleAttendance = async () => {
    if (!isWithinRadius) {
      message.error("You are not within the office radius."); // Use message.error for errors
      return;
    }

    const requestData = {
      user_id: adminObject?._id,
      status: attendanceStatus === "logged_in" ? "logged_out" : "logged_in",
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
    };

    try {
      const response = await API.CommanApiCall({
        data: requestData,
        agent: "attendance",
      });

      if (response?.data?.data?.status === 200) {
        toggleAttendance(
          attendanceStatus === "logged_in" ? "logged_out" : "logged_in"
        );
        message.success(response?.data?.data?.message); // Show success message
      } else {
        message.error(response?.data?.data?.message || "Something went wrong."); // Error message
      }
    } catch (error) {
      console.error("Error during API call:", error);
      message.error("An error occurred while updating attendance."); // Show error message on catch
    }
  };


  return (
    <div style={{ paddingRight: "20px" }}>
      <Tooltip
        title={!isWithinRadius ? "You are not within the office radius." : ""}
      >
        <button
          onClick={handleAttendance}
          disabled={!isWithinRadius}
          style={{
            width: "80px",
            height: "25px",
            color: "white",
            backgroundColor: "#62a6dc",
            border: "none",
            borderRadius: "15px",
            fontWeight: "bold",
            cursor: !isWithinRadius ? "not-allowed" : "pointer",
            opacity: !isWithinRadius ? 0.6 : 1,
          }}
        >
          {attendanceStatus === "logged_in" ? "Logout" : "Login"}
        </button>
      </Tooltip>
    </div>
  );
};

export default AttendanceButton;
