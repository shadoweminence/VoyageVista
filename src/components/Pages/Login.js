import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import AlertContext from "../../context/Alert/alertContext";
import AuthContext from "../../context/Auth/AuthContext";

export default function Login(props) {
  const { showAlert } = useContext(AlertContext);
  const { login } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        //save the authtoken and redirect
        localStorage.setItem("token", json.authtoken);
        login(json.authtoken);
        showAlert("Logged In", "success");
        navigate("/");
      } else {
        showAlert("Invalid Credentials", "danger");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      showAlert(
        "Login failed: " + (error.response?.data?.error || error.message),
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
          <title>Login- Voyage Vista</title>
        </Helmet>

        <h1>Login Form</h1>
        <div className="container my-3">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                value={credentials.email}
                onChange={onChange}
                name="email"
                id="exampleInputEmail1"
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
                value={credentials.password}
                onChange={onChange}
                name="password"
                id="exampleInputPassword1"
              />
            </div>
            <div className="mb-3 form-check">
              <Link to="/Pages/forgotPass">Forgot Password</Link>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
        <Link to="/Pages/Register">Create a new account</Link>
      </div>
    </>
  );
}
