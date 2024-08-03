import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Correct import based on latest version
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    role: null, // Store only role here
  });

  useEffect(() => {
    // Check if token exists in localStorage on initial load
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setAuth({
          isAuthenticated: true,
          role: decodedToken.role, // Extract and store role
        });
      } catch (error) {
        console.error("Error decoding token on initial load:", error);
      }
    }
  }, []);

  const login = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      localStorage.setItem("token", token); // Store token
      setAuth({
        isAuthenticated: true,
        role: decodedToken.role, // Extract and store role
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
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
