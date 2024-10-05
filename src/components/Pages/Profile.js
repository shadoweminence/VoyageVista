import React, { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import AuthContext from "../../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import ImageGallery from "../Layouts/ImageGallery";

export default function Profile() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      const timer = setTimeout(() => {
        navigate("/Pages/Login", { replace: true });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [auth.isAuthenticated, navigate]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Profile - Voyage Vista</title>
      </Helmet>
      <div>
        <h1>User Profile</h1>
        {/* Render the ImageGallery component */}
        <ImageGallery />
      </div>
    </>
  );
}
