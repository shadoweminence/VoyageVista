import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer container">
      <h4 className="container text-center p-3">ALL RIGHTS RESERVED &copy; Voyage Vista</h4>

      <p className="text-center mt-3">
        <Link to="/Admin/AddPackage">About</Link>|
        <Link to="/policy">Privacy Policy</Link>
        |<Link to="/contact">Contact</Link>
      </p>
    </div>
  );
}