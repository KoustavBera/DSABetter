import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AuthDataContext = createContext();
const AuthContext = ({ children }) => {
  let [userData, setUserData] = useState(null);
  const serverUrl = "http://localhost:8000";

  const getUserData = async () => {
    try {
      const response = await axios.get(serverUrl + "/api/auth/getuser", {
        withCredentials: true,
      });

      setUserData(response.data);
    } catch (error) {
      if (error.response?.status === 400) {
        // User is not authenticated, this is expected
        setUserData(null);
      } else {
        console.log("Error fetching user data:", error.message);
        setUserData(null);
      }
    }
  };
  const value = {
    serverUrl,
    userData,
    setUserData,
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <AuthDataContext.Provider value={value}>
      {children}
    </AuthDataContext.Provider>
  );
};

export default AuthContext;
