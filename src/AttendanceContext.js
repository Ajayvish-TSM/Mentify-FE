import { createContext, useState, useContext, useEffect } from "react";

// Create a context
const AttendanceContext = createContext();

// Provider component
export const AttendanceProvider = ({ children }) => {
  // const [attendanceStatus, setAttendanceStatus] = useState(null); // logged_in or logged_out
  // const [userLocation, setUserLocation] = useState({
  //   latitude: null,
  //   longitude: null,
  // });
  const [attendanceStatus, setAttendanceStatus] = useState(() => {
    const savedStatus = localStorage.getItem("attendanceStatus");
    return savedStatus ? savedStatus : "logged_out";
  });

  const [userLocation, setUserLocation] = useState(() => {
    const savedLocation = localStorage.getItem("userLocation");
    return savedLocation
      ? JSON.parse(savedLocation)
      : { latitude: null, longitude: null };
  });
  useEffect(() => {
    localStorage.setItem("attendanceStatus", attendanceStatus);
  }, [attendanceStatus]);
  useEffect(() => {
    if (userLocation.latitude && userLocation.longitude) {
      localStorage.setItem("userLocation", JSON.stringify(userLocation));
    }
  }, [userLocation]);
  useEffect(() => {
    // Fetch the current location of the user
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const myLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        localStorage.setItem("userLocation", JSON.stringify(myLocation));
      },
      (error) => {
        console.error("Error getting user location: ", error);
      }
    );
  }, []);

  // Function to update attendance status
  const toggleAttendance = (status) => {
    setAttendanceStatus(status);
  };

  return (
    <AttendanceContext.Provider
      value={{
        attendanceStatus,
        toggleAttendance,
        userLocation,
        setUserLocation,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

// Custom hook to use attendance context
export const useAttendance = () => {
  return useContext(AttendanceContext);
};
