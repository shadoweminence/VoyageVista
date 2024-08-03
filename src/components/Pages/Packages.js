import React, { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Tourpack } from "../Layouts/Tourpack";
import AuthContext from "../../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Packages() {
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
        <title>Packages- Voyage Vista</title>
      </Helmet>

      <Tourpack />
    </div>
  );
}
