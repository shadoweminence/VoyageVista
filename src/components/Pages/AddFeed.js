import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import AuthContext from "../../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ImageGallery from "../Layouts/ImageGallery";

export default function AddFeed() {
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

  // Image Upload Logic
  const [name, setName] = useState("");
  const [images, setImages] = useState([]);

  const handleImageChange = (event) => {
    setImages(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/images",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data.message);
      // Optionally, you can fetch images again after uploading
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to upload images.");
    }
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Add Feed - Voyage Vista</title>
      </Helmet>

      {/* Render the Image Upload Form */}
      <div>
        <h2>Upload Images</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            required
          />
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            accept="image/*"
            required
          />
          <button type="submit">Upload</button>
        </form>
      </div>
      <br />
      {/* Render the Image Gallery */}
      <ImageGallery />
    </div>
  );
}
