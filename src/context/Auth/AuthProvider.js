import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Correct import
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    role: null, // Store only role here
  });

  const [User, setUser] = useState(null);

  const host = "http://localhost:5000/api/auth";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded token on initial load:", decodedToken); // Debug statement
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
      console.log("Decoded token on login:", decodedToken); // Debug statement
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

    if (json.userDetails) {
      setUser(json.userDetails);
    } else {
      console.error("Error updating user details:", json.msg);
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
