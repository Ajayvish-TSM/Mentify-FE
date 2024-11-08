import { useEffect, useState } from "react";
import { useAttendance } from "./AttendanceContext";
import API from "./Api/Api";

const AttendanceButton = () => {
  const { attendanceStatus, toggleAttendance } = useAttendance();
  const [isWithinRadius, setIsWithinRadius] = useState(false);
  const adminObject = JSON.parse(localStorage.getItem("TajurbaAdminUser"));

  // Static office coordinates, also used as user location for testing
  const officeCoordinates = {
    latitude: 18.58265580355502,
    longitude: 73.72666081349308,
  };

  // Set user location to office coordinates for testing
  const userLocation = officeCoordinates;

  // Calculate distance between user and office (now static and always 0)
  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      0.5 -
      Math.cos(dLat) / 2 +
      (Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        (1 - Math.cos(dLon))) /
        2;
    return R * 2 * Math.asin(Math.sqrt(a)) * 1000; // Distance in meters
  };

  useEffect(() => {
    //console.log("Using static location:", userLocation);

    // Calculate distance from static user location to office
    const distance = getDistanceFromLatLonInKm(
      userLocation.latitude,
      userLocation.longitude,
      officeCoordinates.latitude,
      officeCoordinates.longitude
    );

    //console.log("Distance from office (should be 0):", distance);
    setIsWithinRadius(distance <= 10);
  }, [userLocation]);

  const handleAttendance = async () => {
    if (!isWithinRadius) {
      alert("You are not within the office radius.");
      return;
    }

    const requestData = {
      user_id: adminObject?._id,
      status: attendanceStatus === "logged_in" ? "logged_out" : "logged_in",
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
    };

    console.log("Request Data:", requestData);

    try {
      const response = await API.CommanApiCall({
        data: requestData,
        agent: "attendance",
      });
      console.log("API Response:", response);

      if (response?.data?.data?.status === 200) {
        toggleAttendance(
          attendanceStatus === "logged_in" ? "logged_out" : "logged_in"
        );
        alert(response?.data?.data?.message);
      } else {
        alert(response?.data?.data?.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error during API call:", error);
      alert("An error occurred while updating attendance.");
    }
  };

  return (
    <div>
      {isWithinRadius ? (
        <button onClick={handleAttendance}>
          {attendanceStatus === "logged_in" ? "Logout" : "Login"}
        </button>
      ) : (
        <p>You are not within the office radius.</p>
      )}
    </div>
  );
};

export default AttendanceButton;
