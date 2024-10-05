import React, { useEffect, useState } from "react";
import axios from "axios";

const ImageGallery = () => {
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/images");
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
      <h2>Image Gallery</h2>
      <div className="image-gallery">
        {images.map((image) => (
          <div key={image._id} className="image-item">
            <h4>{image.name}</h4>
            {image.images.map((img, index) => (
              <img
                key={index}
                src={`data:${img.contentType};base64,${img.data}`}
                alt={`Image ${index + 1}`}
                style={{ maxWidth: "200px", margin: "10px" }} // Adjust styles as needed
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
