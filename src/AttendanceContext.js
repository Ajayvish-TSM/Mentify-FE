import { createContext, useState, useContext, useEffect } from "react";

// Create a context
const AttendanceContext = createContext();

// Provider component
export const AttendanceProvider = ({ children }) => {
  const [attendanceStatus, setAttendanceStatus] = useState(null); // logged_in or logged_out
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    // Fetch the current location of the user
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
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
