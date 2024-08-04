import React, { useState, useContext } from "react";
import { Helmet } from "react-helmet";

import tourpackContext from "../../context/tourpack/tourContext";
import { EditPack } from "../Layouts/Tourpack";

const AdminPackage = (props) => {
  const context = useContext(tourpackContext);
  const { addTourpack } = context;

  const [tourpack, setTourpack] = useState({
    title: "",
    description: "",
    tag: "default",
  });
  const handleClick = (e) => {
    e.preventDefault();
    addTourpack(tourpack.title, tourpack.description, tourpack.tag);
    setTourpack({ title: "", description: "", tag: "default" });
  };
  const onChange = (e) => {
    setTourpack({ ...tourpack, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>AddPackage- Voyage Vista</title>
      </Helmet>

      <div className="container my-3">
        <h1>Add a tourpack</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              onChange={onChange}
              name="title"
              id="title"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              onChange={onChange}
              name="description"
              id="description"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              onChange={onChange}
              name="tag"
              id="tag"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Add
          </button>
        </form>
      </div>
      <EditPack />
    </div>
  );
};

export default AdminPackage;
