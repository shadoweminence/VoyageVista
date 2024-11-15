import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import AuthContext from "../../context/Auth/AuthContext";

const Profile = () => {
  const { auth, User, getUserDetails } = useContext(AuthContext);
  const { email: profileEmailFromParams } = useParams(); // Get the profile email from the URL
  const [profileEmail, setProfileEmail] = useState(null); // To handle both own and other profiles
  const [isOwner, setIsOwner] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the logged-in user's details if they aren't already loaded
    if (!User) {
      getUserDetails();
    } else {
      // If viewing own profile, set profile email to logged-in user's email
      if (!profileEmailFromParams || profileEmailFromParams === User.email) {
        setProfileEmail(User.email);
        setIsOwner(true); // Viewing own profile
      } else {
        setProfileEmail(profileEmailFromParams); // Viewing another user's profile
        setIsOwner(false);
      }
    }
  }, [User, profileEmailFromParams, getUserDetails]);

  // Function to fetch images by email
  const fetchImages = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/images/user/${email}`
      );

      if (response.status === 200) {
        setImages(response.data); // Store images if found
      } else if (response.status === 404) {
        setError("No images found for this user.");
      }
    } catch (err) {
      console.error("Error fetching images:", err);
      setError("Failed to fetch images.");
    }
  };
  useEffect(() => {
    if (profileEmail) {
      fetchImages(profileEmail); // Fetch images for the given user email
    }
  }, [profileEmail]);

  return (
    <div>
      <h1>{isOwner ? "Your Profile" : `Profile of ${profileEmail}`}</h1>

      <h2>Image Gallery</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="image-gallery">
          {images.map((image) => (
            <div key={image._id} className="image-item">
              <h4>{image.name}</h4>
              {image.images.map((img, index) => (
                <img
                  key={index}
                  src={`data:${img.contentType};base64,${img.data}`}
                  alt={`Image ${index + 1}`}
                  style={{ maxWidth: "200px", margin: "10px" }}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
