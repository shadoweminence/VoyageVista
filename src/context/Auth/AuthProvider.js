import React, { useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode"; // Correct import
import AuthContext from "./AuthContext";
import AlertContext from "../../context/Alert/alertContext";

const AuthProvider = ({ children }) => {
  const { showAlert } = useContext(AlertContext);
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    role: null, // Store only role here
  });

  const [User, setUser] = useState(null);

  const host = "http://localhost:5001/api/auth";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setAuth({
          isAuthenticated: true,
          role: decodedToken.user.role, // Extract and store role from user object
        });
      } catch (error) {
        console.error("Error decoding token on initial load:", error);
      }
    }
  }, []);

  // Fetch user details
  const getUserDetails = async () => {
    const response = await fetch(`${host}/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setUser(json);
  };

  const login = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      localStorage.setItem("token", token); // Store token

      setAuth({
        isAuthenticated: true,
        role: decodedToken.user.role, // Extract and store role from user object
      });
    } catch (error) {
      console.error("Error decoding token on login:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token"); // Remove token on logout
    setAuth({
      isAuthenticated: false,
      role: null, // Clear role on logout
    });
    setUser(null); // Clear user details
  };

  const editUserDetails = async (id, name, email, oldPassword, newPassword) => {
    try {
      const response = await fetch(`${host}/updateuserdetails/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ name, email, oldPassword, newPassword }),
      });
      const json = await response.json();
      console.log(json);

      if (json.success) {
        setUser(json.userDetails);
        showAlert(`Changes saved successfully`, "info");
      } else {
        showAlert("wrong old password", "danger");
        window.location.reload();
      }
    } catch (error) {
      console.error("Fetch error:", error);
      showAlert(
        "Update failed: " + (error.response?.data?.error || error.message),
        "danger"
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{ auth, User, getUserDetails, editUserDetails, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
