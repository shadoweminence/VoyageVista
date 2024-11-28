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

  const isAdmin = auth.role === "admin"; // Adjust based on your AuthContext setup

  return (
    <div
      className={`sidebar bg-${props.mode} col-12`}
      style={{
        width: "auto", // Make the width auto to adjust to content
        maxWidth: "100%", // Prevent the container from exceeding 100% width
        padding: "5px",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "fixed",
        overflowX: "hidden",
        justifyContent: "space-between", // Ensure content is spaced appropriately
      }}
    >
      <nav
        className={`navbar navbar-${
          props.mode === "dark" ? "dark" : "light"
        } bg-${props.mode}`}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center", // Center the items horizontally
        }}
      >
        {auth.isAuthenticated ? (
          <>
            <ul className="nav flex-column">
              <li className="nav-item mb-3">
                <Link
                  className={`nav-link ${isActive("/") ? "active" : ""}`}
                  to="/"
                >
                  <i className="fa-solid fa-house mx-3"></i>
                  <span className="d-none d-lg-inline">Home</span>
                </Link>
              </li>

              <li className="nav-item mb-3">
                <Link
                  className={`nav-link ${
                    isActive("/Pages/Settings") ? "active" : ""
                  }`}
                  to="/Pages/Settings"
                >
                  <i className="fa-solid fa-gear mx-3"></i>
                  <span className="d-none d-lg-inline">Settings</span>
                </Link>
              </li>

              <li className="nav-item mb-3">
                <Link
                  className={`nav-link ${
                    isActive("/Pages/Packages") ? "active" : ""
                  }`}
                  to="/Pages/Packages"
                >
                  <i className="fa-solid fa-box-open mx-3"></i>
                  <span className="d-none d-lg-inline">Packages</span>
                </Link>
              </li>

              <li className="nav-item mb-3">
                <Link
                  className={`nav-link ${
                    isActive("/Pages/search") ? "active" : ""
                  }`}
                  to="/Pages/search"
                >
                  <i className="fa-solid fa-magnifying-glass mx-3"></i>
                  <span className="d-none d-lg-inline">Search</span>
                </Link>
              </li>

              <li className="nav-item mb-3">
                <Link
                  className={`nav-link ${
                    isActive("/Pages/addFeed") ? "active" : ""
                  }`}
                  to="/Pages/addFeed"
                >
                  <i className="fa-solid fa-plus mx-3"></i>
                  <span className="d-none d-lg-inline">AddFeed</span>
                </Link>
              </li>

              <li className="nav-item mb-3">
                <Link
                  className={`nav-link ${
                    isActive("/Pages/Chat") ? "active" : ""
                  }`}
                  to="/Pages/Chat"
                >
                  <i className="fa-brands fa-rocketchat mx-3"></i>
                  <span className="d-none d-lg-inline">Chat</span>
                </Link>
              </li>

              <li className="nav-item mb-3">
                <Link
                  className={`nav-link ${
                    isActive("/Pages/Profile") ? "active" : ""
                  }`}
                  to="/Pages/Profile"
                >
                  <i className="fa-solid fa-user mx-3"></i>
                  <span className="d-none d-lg-inline">Profile</span>
                </Link>
              </li>

              {isAdmin && (
                <li className="nav-item mb-3">
                  <Link
                    className={`nav-link ${
                      isActive("/Admin/AddPackage") ? "active" : ""
                    }`}
                    to="/Admin/AddPackage"
                  >
                    <i className="fa-solid fa-edit mx-3"></i>
                    <span className="d-none d-lg-inline">Edit Packages</span>
                  </Link>
                </li>
              )}
            </ul>
          </>
        ) : (
          <>
            <ul className="nav flex-column">
              <li className="nav-item mb-3">
                <Link
                  className={`nav-link ${isActive("/") ? "active" : ""}`}
                  to="/"
                >
                  <i className="fa-solid fa-house mx-3"></i>
                  <span className="d-none d-lg-inline">Home</span>
                </Link>
              </li>
              <li className="nav-item mb-3">
                <Link
                  className={`nav-link ${
                    isActive("/Pages/Packages") ? "active" : ""
                  }`}
                  to="/Pages/Packages"
                >
                  <i className="fa-solid fa-box-open mx-3"></i>
                  <span className="d-none d-lg-inline">Packages</span>
                </Link>
              </li>
              <li className="nav-item mb-3">
                <Link
                  className={`nav-link ${
                    isActive("/Pages/Search") ? "active" : ""
                  }`}
                  to="/Pages/Search"
                >
                  <i className="fa-solid fa-magnifying-glass mx-3"></i>
                  <span className="d-none d-lg-inline">Search</span>
                </Link>
              </li>
              <li className="nav-item mb-3">
                <Link
                  className={`nav-link ${
                    isActive("/Pages/Login") ? "active" : ""
                  }`}
                  to="/Pages/Login"
                >
                  <i class="fa-solid fa-right-to-bracket mx-3"></i>
                  <span className="d-none d-lg-inline">Login</span>
                </Link>
              </li>
            </ul>
          </>
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
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            <i className="fa-solid fa-moon mx-3"></i>
            <span className="d-none d-lg-inline">Dark Mode</span>
          </label>
        </div>
      </nav>

      {auth.isAuthenticated ? (
        <>
          <div className="mt-auto">
            <button
              className={`btn btn-${props.mode === "dark" ? "dark" : "light"}`}
              onClick={handleLogout}
            >
              <i className="fa-solid fa-right-from-bracket mx-3"></i>

              <span className="d-none d-lg-inline">Logout</span>
            </button>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
