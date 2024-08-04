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
        width: "250px",
        position: "fixed",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <nav
        className={`navbar navbar-expand-lg navbar-${
          props.mode === "dark" ? "dark" : "light"
        } bg-${props.mode}`}
      >
        <ul className="nav flex-column">
          <div className="container-fluid">
            <Link
              className="navbar-brand"
              to="/"
              style={{ marginBottom: "20px" }}
            >
              {props.title}
            </Link>

            <li className={`nav-item mb-3`}>
              <Link
                className={`nav-link ${isActive("/") ? "active" : ""}`}
                aria-current={isActive("/") ? "page" : undefined}
                to="/"
                style={{ padding: "10px 15px" }}
              >
                <i className="fa-solid fa-house mx-3"></i>
                Home
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
                Settings
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
                Packages
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
                AddFeed
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
                Profile
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
                  Edit Packages
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
                Enable Dark Mode
              </label>
            </div>
          </div>
        </ul>
      </nav>

      <div className="mt-auto">
        <button
          className={`btn btn-${
            props.mode === "dark" ? "dark" : "light"
          } w-100`}
          onClick={handleLogout}
          style={{ marginTop: "auto", marginBottom: "20px" }}
        >
          <i className="fa-solid fa-right-from-bracket mx-3"></i>
          Logout
        </button>
      </div>
    </div>
  );
}
