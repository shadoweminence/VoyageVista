import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import AuthContext from "../../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import ImageGallery from "../Layouts/ImageGallery";
import axios from "axios";

export default function Profile() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      const timer = setTimeout(() => {
        navigate("/Pages/Login", { replace: true });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [auth.isAuthenticated, navigate]);

  const handleProfilePicChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("profilePicture", file); // Use the correct key for your API

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/profile-picture",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // JWT token
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data.message);
      setProfilePicture(response.data.profilePicture); // Update with the profile picture URL
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert("Failed to upload profile picture.");
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Profile - Voyage Vista</title>
      </Helmet>
      <div>
        <h1>User Profile</h1>

        {/* Display username if available, else show nothing */}
        {auth.user && auth.user.username ? (
          <h2>{auth.user.username}</h2>
        ) : (
          <h2></h2> // Empty space instead of "Loading..."
        )}

        {/* Profile Picture Section */}
        <div>
          <label htmlFor="profile-pic" style={{ cursor: "pointer" }}>
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Profile"
                style={{ width: "150px", height: "150px", borderRadius: "50%" }}
              />
            ) : (
              <div
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  backgroundColor: "#ccc",
                }}
              >
                <p style={{ textAlign: "center", lineHeight: "150px" }}>
                  Upload Photo
                </p>
              </div>
            )}
          </label>
          <input
            type="file"
            id="profile-pic"
            accept="image/*"
            style={{ display: "none" }} // Hide the default file input
            onChange={handleProfilePicChange}
          />
        </div>

        {/* Render the ImageGallery component */}
        <ImageGallery />
      </div>
    </>
  );
}
