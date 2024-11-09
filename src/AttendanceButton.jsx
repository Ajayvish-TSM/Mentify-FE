// import { useEffect, useState } from "react";
// import { useAttendance } from "./AttendanceContext";
// import API from "./Api/Api";

// const AttendanceButton = () => {
//   const { attendanceStatus, toggleAttendance, userLocation } = useAttendance();
//   const [isWithinRadius, setIsWithinRadius] = useState(false);
//   const adminObject = JSON.parse(localStorage.getItem("TajurbaAdminUser"));

//   // Static office coordinates, also used as user location for testing
//   const officeCoordinates = {
//     latitude: 18.5824375,
//     longitude: 73.7263487,
//   };
//   console.log("user loca : ", userLocation);

//   // Set user location to office coordinates for testing
//   // const userLocation = officeCoordinates;

//   // Calculate distance between user and office (now static and always 0)
//   const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
//     const R = 6371; // Radius of the Earth in km
//     const dLat = ((lat2 - lat1) * Math.PI) / 180;
//     const dLon = ((lon2 - lon1) * Math.PI) / 180;
//     const a =
//       0.5 -
//       Math.cos(dLat) / 2 +
//       (Math.cos((lat1 * Math.PI) / 180) *
//         Math.cos((lat2 * Math.PI) / 180) *
//         (1 - Math.cos(dLon))) /
//         2;
//     return R * 2 * Math.asin(Math.sqrt(a)) * 1000; // Distance in meters
//   };

//   useEffect(() => {
//     console.log("Using static location:", userLocation);

//     // Calculate distance from static user location to office
//     const distance = getDistanceFromLatLonInKm(
//       userLocation.latitude,
//       userLocation.longitude,
//       officeCoordinates.latitude,
//       officeCoordinates.longitude
//     );

//     console.log("Distance from office (should be 0):", distance);
//     setIsWithinRadius(distance <= 10);
//   }, []);

//   const handleAttendance = async () => {
//     if (!isWithinRadius) {
//       alert("You are not within the office radius.");
//       return;
//     }

//     const requestData = {
//       user_id: adminObject?._id,
//       status: attendanceStatus === "logged_in" ? "logged_out" : "logged_in",
//       latitude: userLocation.latitude,
//       longitude: userLocation.longitude,
//     };

//     console.log("Request Data:", requestData);

//     try {
//       const response = await API.CommanApiCall({
//         data: requestData,
//         agent: "attendance",
//       });
//       console.log("API Response:", response);

//       if (response?.data?.data?.status === 200) {
//         toggleAttendance(
//           attendanceStatus === "logged_in" ? "logged_out" : "logged_in"
//         );
//         alert(response?.data?.data?.message);
//       } else {
//         alert(response?.data?.data?.message || "Something went wrong.");
//       }
//     } catch (error) {
//       console.error("Error during API call:", error);
//       alert("An error occurred while updating attendance.");
//     }
//   };
//   //   console.log("hfldasjfljdf", attendanceStatus);

//   return (
//     <div>
//       {isWithinRadius ? (
//         <button onClick={handleAttendance}>
//           {attendanceStatus === "logged_in" ? "Logout" : "Login"}
//         </button>
//       ) : (
//         <p>You are not within the office radius.</p>
//       )}
//     </div>
//   );
// };

// export default AttendanceButton;
import { useEffect, useState } from "react";
import { useAttendance } from "./AttendanceContext";
import API from "./Api/Api";
import { Tooltip } from "antd";

const AttendanceButton = () => {
  // const { attendanceStatus, toggleAttendance, userLocation } = useAttendance();
  const { attendanceStatus, toggleAttendance, userLocation, setUserLocation } =
    useAttendance();
  const [isWithinRadius, setIsWithinRadius] = useState(false);

  const adminObject = JSON.parse(localStorage.getItem("TajurbaAdminUser"));
  const userL = JSON.parse(localStorage.getItem("userLocation"));
  // console.log(userL, "jdsfldslfjlsdjflsdjlfjl");

  // Static office coordinates for testing
  const officeCoordinates = {
    latitude: 18.5824375,
    longitude: 73.7263487,
  };

  // Calculate distance between user and office
  const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {
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
    return R * 2 * Math.asin(Math.sqrt(a)); // Distance in meters
  };

  // useEffect(() => {
  //   // Check if userLocation is fully loaded
  //   if (userLocation?.latitude && userLocation?.longitude) {
  //     const distance = getDistanceFromLatLonInMeters(
  //       userL.latitude,
  //       userL.longitude,
  //       officeCoordinates.latitude,
  //       officeCoordinates.longitude
  //     );
  //     console.log("Distance from office:", distance);
  //     setIsWithinRadius(distance <= 10);
  //   }
  // }, []);
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

    try {
      const response = await API.CommanApiCall({
        data: requestData,
        agent: "attendance",
      });

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
    <div style={{ paddingRight: "20px" }}>
    <Tooltip title={!isWithinRadius ? "You are not within the office radius." : ""}>
      <button
        onClick={handleAttendance}
        disabled={!isWithinRadius}
        style={{
          width: "80px",
          color: "#FFFFFF",
          cursor: !isWithinRadius ? "not-allowed" : "pointer",
          opacity: !isWithinRadius ? 0.6 : 1, // Add a dim effect for disabled
        }}
      >
        {attendanceStatus === "logged_in" ? "Logout" : "Login"}
      </button>
    </Tooltip>
  </div>
  );
};

export default AttendanceButton;
