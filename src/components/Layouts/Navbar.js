import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../context/Auth/AuthContext";

export default function Navbar(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { auth, logout } = useContext(AuthContext);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/Pages/Login");
  };

  if (!auth.isAuthenticated) {
    return null; // Optionally handle unauthenticated users
  }

  const isAdmin = auth.role === "admin"; // Adjust based on your AuthContext setup

  return (
    <div
      className={`sidebar bg-${props.mode}`}
      style={{
        height: "100vh",
        maxWidth: "250px", // Set max width
        position: "fixed",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflowX: "hidden",
        overflowY: "auto", // Allow vertical scrolling if needed
        transition: "max-width 0.3s ease", // Smooth transition for width changes
      }}
    >
      <nav
        className={`navbar navbar-expand-lg navbar-${
          props.mode === "dark" ? "dark" : "light"
        } bg-${props.mode}`}
      >
        <ul className="nav flex-column">
          <div className="container-fluid">
            <li className={`nav-item mb-3`}>
              <Link
                className={`nav-link ${isActive("/") ? "active" : ""}`}
                aria-current={isActive("/") ? "page" : undefined}
                to="/"
                style={{ padding: "10px 15px" }}
              >
                <i className="fa-solid fa-house mx-3"></i>
                <span className="d-none d-lg-inline">Home</span>
              </Link>
            </li>

            <li className={`nav-item mb-3`}>
              <Link
                className={`nav-link ${
                  isActive("/Pages/Settings") ? "active" : ""
                }`}
                to="/Pages/Settings"
                style={{ padding: "10px 15px" }}
              >
                <i className="fa-solid fa-gear mx-3"></i>
                <span className="d-none d-lg-inline">Settings</span>
              </Link>
            </li>

            <li className={`nav-item mb-3`}>
              <Link
                className={`nav-link ${
                  isActive("/Pages/Packages") ? "active" : ""
                }`}
                to="/Pages/Packages"
                style={{ padding: "10px 15px" }}
              >
                <i className="fa-solid fa-box-open mx-3"></i>
                <span className="d-none d-lg-inline">Packages</span>
              </Link>
            </li>

            <li className={`nav-item mb-3`}>
              <Link
                className={`nav-link ${
                  isActive("/Pages/search") ? "active" : ""
                }`}
                to="/Pages/search"
                style={{ padding: "10px 15px" }}
              >
                <i className="fa-solid fa-magnifying-glass mx-3"></i>
                <span className="d-none d-lg-inline">Search</span>
              </Link>
            </li>

            <li className={`nav-item mb-3`}>
              <Link
                className={`nav-link ${
                  isActive("/Pages/addFeed") ? "active" : ""
                }`}
                to="/Pages/addFeed"
                style={{ padding: "10px 15px" }}
              >
                <i className="fa-solid fa-plus mx-3"></i>
                <span className="d-none d-lg-inline">AddFeed</span>
              </Link>
            </li>

            <li className={`nav-item mb-3`}>
              <Link
                className={`nav-link ${
                  isActive("/Pages/Chat") ? "active" : ""
                }`}
                to="/Pages/Chat"
                style={{ padding: "10px 15px" }}
              >
                <i className="fa-brands fa-rocketchat mx-3"></i>
                <span className="d-none d-lg-inline">Chat</span>
              </Link>
            </li>

            <li className={`nav-item mb-3`}>
              <Link
                className={`nav-link ${
                  isActive("/Pages/Profile") ? "active" : ""
                }`}
                to="/Pages/Profile"
                style={{ padding: "10px 15px" }}
              >
                <i className="fa-solid fa-user mx-3"></i>
                <span className="d-none d-lg-inline">Profile</span>
              </Link>
            </li>

            {/* Conditionally render the "Edit" link based on user role */}
            {isAdmin && (
              <li className={`nav-item mb-3`}>
                <Link
                  className={`nav-link ${
                    isActive("/Admin/AddPackage") ? "active" : ""
                  }`}
                  to="/Admin/AddPackage"
                  style={{ padding: "10px 15px" }}
                >
                  <i className="fa-solid fa-edit mx-3"></i>
                  <span className="d-none d-lg-inline">Edit Packages</span>
                </Link>
              </li>
            )}

            <div
              className={`form-check form-switch mt-3 text-${
                props.mode === "light" ? "dark" : "light"
              }`}
            >
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                onClick={props.toggleMode}
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                <i className="fa-solid fa-moon mx-3"></i>
                <span className="d-none d-lg-inline">Dark Mode</span>
              </label>
            </div>

            {/* Collapsible Button */}
            <div className="d-lg-none">
              <button
                className={`btn btn-${
                  props.mode === "dark" ? "dark" : "light"
                } w-100`}
                onClick={handleLogout}
                style={{ marginTop: "20px" }}
              >
                <i className="fa-solid fa-right-from-bracket mx-3"></i>
                Logout
              </button>
            </div>
          </div>
        </ul>
      </nav>

      {/* Desktop Logout Button */}
      <div className="d-none d-lg-block mt-auto">
        <button
          className={`btn btn-${
            props.mode === "dark" ? "dark" : "light"
          } w-100`}
          onClick={handleLogout}
          style={{ marginTop: "auto", marginBottom: "20px" }}
        >
          <i className="fa-solid fa-right-from-bracket mx-3"></i>
          <span className="d-none d-lg-inline">Logout</span>
        </button>
      </div>
    </div>
  );
}
