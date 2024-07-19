// import axios and other necessary imports
import axios from "axios";
import { createContext, useEffect, useState } from "react";

// Create context for authentication
export const authContext = createContext();

// Authentication context provider component
export function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);

  // Function to reset user password
  function resetPassword(email, newPassword, resetCode) {
    return new Promise((resolve, reject) => {
      if (!email || !newPassword || !resetCode) {
        reject(new Error("Email, new password, and reset code are required."));
        return;
      }

      console.log("Resetting password for:", email);
      axios
        .put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, {
          email: email,
          newPassword: newPassword,
          resetCode: resetCode,
        })
        .then((response) => {
          console.log("Password reset response:", response.data);
          const newToken = response.data.token;
          if (newToken) {
            localStorage.setItem("token", newToken);
            setToken(newToken);
            resolve();
          } else {
            reject(new Error("No token returned from password reset."));
          }
        })
        .catch((error) => {
          console.error(
            "Password reset failed:",
            error.response ? error.response.data : error.message
          );
          reject(error);
        });
    });
  }

  // Function to update user data
  function updateUserData(userData) {
    if (!userData) {
      console.error("User data is required to update.");
      return;
    }

    const currentToken = localStorage.getItem("token");
    if (!currentToken) {
      console.error("No token found. Please log in again.");
      return;
    }

    console.log("Updating user data:", userData);
    axios
      .put(`https://ecommerce.routemisr.com/api/v1/users/updateMe/`, userData, {
        headers: {
          token: currentToken,
        },
      })
      .then((response) => {
        console.log("User data updated successfully:", response.data);
      })
      .catch((error) => {
        console.error(
          "Failed to update user data:",
          error.response ? error.response.data : error.message
        );
      });
  }

  // Effect to set initial token from local storage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      console.log("Token found in local storage:", storedToken);
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
