import React, { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import AuthContext from "../../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AddFeed() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      const timer = setTimeout(() => {
        navigate("/Pages/Login", { replace: true });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [auth.isAuthenticated, navigate]);
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Add Feed - Voyage Vista</title>
      </Helmet>

      <h1>here you can add feed</h1>
    </div>
  );
}
