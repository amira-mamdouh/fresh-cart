// import axios and other necessary imports
import axios from "axios";
import { createContext, useEffect, useState } from "react";

// Create context for authentication
export const authContext = createContext();

// Authentication context provider component
export function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);

  // Function to reset user password
  function resetPassword(email, newPassword) {
    axios
      .put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, {
        email: email,
        newPassword: newPassword,
      })
      .then((response) => {
        // Update token after password reset
        const newToken = response.data.token;
        localStorage.setItem("token", newToken);
        setToken(newToken);
      })
      .catch((error) => {
        console.error("Password reset failed:", error);
      });
  }

  // Function to update user data
  function updateUserData(userData) {
    axios
      .put(`https://ecommerce.routemisr.com/api/v1/users/updateMe/`, userData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log("User data updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Failed to update user data:", error);
      });
  }

  // Effect to set initial token from local storage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken !== null) {
      setToken(storedToken);
    }
  }, []);

  // Provide token, setToken, resetPassword, and updateUserData to child components
  return (
    <authContext.Provider
      value={{ token, setToken, resetPassword, updateUserData }}
    >
      {children}
    </authContext.Provider>
  );
}
