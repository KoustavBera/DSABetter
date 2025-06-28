import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AuthDataContext = createContext();
const AuthContext = ({ children }) => {
  let [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const serverUrl = "https://dsabetter-backend.onrender.com";

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
    } finally {
      setLoading(false);
    }
  };
  const value = {
    serverUrl,
    userData,
    setUserData,
    getUserData,
    loading,
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
