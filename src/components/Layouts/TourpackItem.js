import React from "react";
import { useNavigate } from "react-router-dom";

const TourpackItem = (props) => {
  const { tourpack } = props;
  const navigate = useNavigate();

  // Split the description text into paragraphs based on line breaks
  const paragraphs = tourpack.description.split(/\r?\n/);

  const startChatWithAdmin = () => {
    navigate("/Pages/chat", { state: { contactAdmin: true } });
  };
  return (
    <>
      <div className="container col-md-5">
        <div className="card my-3">
          <div className="card-body">
            <h5 className="card-title">{tourpack.title}</h5>

            {/* Map over the paragraphs array and create a <p> element for each */}
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="card-text text-wrap">
                {paragraph}
              </p>
            ))}
            <p className="card-text">{tourpack.pic}</p>
            <button onClick={startChatWithAdmin}>Contact Us</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TourpackItem;
