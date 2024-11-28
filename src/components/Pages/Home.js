import React from "react";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home- Voyage Vista</title>
      </Helmet>
      <div className="bg-image d-flex flex-column justify-content-center align-items-center text-white">
        <h1 className="d-flex justify-content-center align-items-center my-4 display-1">
          Voyage Vista.{" "}
        </h1>
        <h2 className="d-flex justify-content-center align-items-center my-4">
          Discover your next adventure
        </h2>
        <h4 className="flex justify-content-center my-4">
          We deal with packages for many places. Our specialized team will bring
          new packages to you every day and our wxperienced guide will be
          guiding you to the destination. Feel free to book with us for a
          delightful tour of various places that you should not miss.{" "}
        </h4>
        <br />

        <h5>
          Comment a place you want to visit and our team will bring you a
          package.
        </h5>
      </div>
    </div>
  );
}
