import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import AlertContext from "../../context/Alert/alertContext";
import AuthContext from "../../context/Auth/AuthContext";

export default function Register(props) {
  const { showAlert } = useContext(AlertContext);
  const { login } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credentials;

    // Check if passwords match
    if (password !== cpassword) {
      showAlert("Passwords do not match", "warning");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            confirmPassword: cpassword,
          }),
        }
      );

      const json = await response.json();
      console.log(json);

      if (json.success) {
        //save the authtoken and redirect
        login(json.authtoken);
        showAlert("Registered Successfully", "success");
        navigate("/");
      } else {
        showAlert("Invalid credentials");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      showAlert(
        "Registration  failed: " +
          (error.response?.data?.error || error.message),
        "danger"
      );
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  return (
    <>
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Register- Voyage Vista</title>
        </Helmet>

        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Username
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              onChange={onChange}
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              minLength={5}
              id="password"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              name="cpassword"
              className="form-control"
              id="cpassword"
              minLength={5}
              onChange={onChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>

        <p>
          Already Have a account?
          <Link className="abc" to="/Pages/Login">
            Log In
          </Link>{" "}
        </p>
      </div>
    </>
  );
}
