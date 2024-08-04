import React, { useContext, useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import AuthContext from "../../context/Auth/AuthContext";
import AlertContext from "../../context/Alert/alertContext";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();
  const { showAlert } = useContext(AlertContext);
  const { auth, User, getUserDetails, editUserDetails } =
    useContext(AuthContext);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      const timer = setTimeout(() => {
        navigate("/Pages/Login", { replace: true });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [auth.isAuthenticated, navigate]);

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    fieldToEdit: "", // New state to track which field is being edited
  });

  const handleEditClick = (field) => {
    setUserData((prevData) => ({
      ...prevData,
      id: User._id,
      [field]: User[field] || "",
      fieldToEdit: field, // Set which field to edit
    }));
    ref.current.click();
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    refClose.current.click();
    editUserDetails(
      userData.id,
      userData.name,
      userData.email,
      userData.oldPassword,
      userData.newPassword
    );
    showAlert(`Changes saved successfully`, "info");
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Settings - Voyage Vista</title>
        </Helmet>
        <div className="container col-md-5">
          <div className="card my-3">
            <div className="card-body">
              <div className="d-flex">
                <h5 className="card-title mx-3">User Name:</h5>
                <p className="card-text mx-3">{User?.name}</p>
                <button
                  className="mx-5"
                  onClick={() => handleEditClick("name")}
                >
                  Edit
                </button>
              </div>
              <div className="d-flex">
                <h5 className="card-title mx-3">Email:</h5>
                <p className="card-text mx-5"> {User?.email}</p>
                <button
                  className="mx-3"
                  onClick={() => handleEditClick("email")}
                >
                  Edit
                </button>
              </div>
              <div className="d-flex">
                <h5 className="card-title mx-3">Password:</h5>
                <button
                  className="mx-3"
                  onClick={() => handleEditClick("password")}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for updating */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit User Details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                {userData.fieldToEdit === "name" && (
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      name="name"
                      value={userData.name}
                      id="name"
                    />
                  </div>
                )}
                {userData.fieldToEdit === "email" && (
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      onChange={handleChange}
                      name="email"
                      value={userData.email}
                      id="email"
                    />
                  </div>
                )}
                {userData.fieldToEdit === "password" && (
                  <>
                    <div className="mb-3">
                      <label htmlFor="oldPassword" className="form-label">
                        Old Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        onChange={handleChange}
                        name="oldPassword"
                        value={userData.oldPassword}
                        id="oldPassword"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="newPassword" className="form-label">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        onChange={handleChange}
                        name="newPassword"
                        value={userData.newPassword}
                        id="newPassword"
                      />
                    </div>
                  </>
                )}
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                ref={refClose}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={handleSaveClick}
                type="button"
                className="btn btn-primary"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
