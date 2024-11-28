import React from "react";
import { Helmet } from "react-helmet";
import { Tourpack } from "../Layouts/Tourpack";

export default function Packages() {
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
