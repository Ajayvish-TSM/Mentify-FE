import { createContext, useState, useContext, useEffect } from "react";

// Create a context
const AttendanceContext = createContext();

// Provider component
export const AttendanceProvider = ({ children }) => {
  const [attendanceStatus, setAttendanceStatus] = useState("logged_out");

  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    localStorage.setItem("attendanceStatus", attendanceStatus);
  }, [attendanceStatus]);

  useEffect(() => {
    if (userLocation.latitude && userLocation.longitude) {
      localStorage.setItem("userLocation", JSON.stringify(userLocation));
    } else {
      localStorage.removeItem("userLocation");
    }
  }, [userLocation]);

  useEffect(() => {
    const locationWatcher = navigator.geolocation.watchPosition(
      (position) => {
        const myLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setUserLocation(myLocation);
        localStorage.setItem("userLocation", JSON.stringify(myLocation));
      },
      (error) => {
        console.error("Error getting user location: ", error);
        setUserLocation({ latitude: null, longitude: null });
        localStorage.removeItem("userLocation");
      },
      { enableHighAccuracy: true }
    );

    return () => {
      navigator.geolocation.clearWatch(locationWatcher);
    };
  }, []);

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
