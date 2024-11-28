import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/Auth/AuthContext";
import AlertContext from "../../context/Alert/alertContext";

const TourpackItem = (props) => {
  const { tourpack } = props;
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { showAlert } = useContext(AlertContext);

  // Split the description text into paragraphs based on line breaks
  const paragraphs = tourpack.description.split(/\r?\n/);

  const startChatWithAdmin = () => {
    navigate("/Pages/chat", { state: { contactAdmin: true } });
  };
  const LoginRedirect = () => {
    navigate("/Pages/Login");
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
            {auth.isAuthenticated ? (
              <>
                {" "}
                <button onClick={startChatWithAdmin}>Contact Us</button>
              </>
            ) : (
              <>
                <button onClick={LoginRedirect}>Contact Us</button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TourpackItem;
