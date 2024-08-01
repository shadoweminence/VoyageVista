import React, { useContext,useState, useEffect, useRef } from "react";

import TourpackItem from "./TourpackItem";
import tourpackContext from "../../context/tourpack/tourContext";
import EditPackage from "../Admin/EditPackage";

const Tourpack = () => {
  const context = useContext(tourpackContext);
  const { tourpacks, getTourpacks } = context;
  useEffect(() => {
    getTourpacks();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="container my-3">
        
        <h2 className="text-center">Available Packages</h2>

        {tourpacks.map((tourpack) => {
          return <TourpackItem key={tourpack._id} tourpack={tourpack} />;
        })}
      </div>
    </>
  );
};
const EditPack = () => {
  const context = useContext(tourpackContext);
  const { tourpacks, getTourpacks,editTourpack } = context;
  useEffect(() => {
    getTourpacks();
    // eslint-disable-next-line
  }, []);



  const ref = useRef(null);
  const refClose = useRef(null);
  const [tourpack, setTourpack] = useState({
    id:"",
    etitle: "",
    edescription: "",
    etag: "default",
  });

    const updateTourpack = (currentTourpack) => {
      ref.current.click();
      setTourpack({
        id:currentTourpack._id,
        etitle: currentTourpack.title,
        edescription: currentTourpack.description,
        etag: currentTourpack.tag,
      });
    };

  const handleClick = (e) => {
    e.preventDefault();
    refClose.current.click();
   editTourpack(tourpack.id,tourpack.etitle,tourpack.edescription,tourpack.etag)
      };
  const onChange = (e) => {
    setTourpack({ ...tourpack, [e.target.name]: e.target.value });
  };
  return (
    <>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        {" "}
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {" "}
                Edit Tourpack
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h1>Add a tourpack</h1>
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    {" "}
                    Title{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={onChange}
                    name="etitle"
                    value={tourpack.etitle}
                    id="etitle"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    {" "}
                    Description{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={onChange}
                    name="edescription"
                    value={tourpack.edescription}
                    id="edescription"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    {" "}
                    Tag{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={onChange}
                    value={tourpack.etag}
                    name="etag"
                    id="etag"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                ref={refClose}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                {" "}
                Close
              </button>
              <button onClick={handleClick} type="button" className="btn btn-primary">
                {" "}
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-3">
        <h2>Your Packages</h2>

        {tourpacks.map((tourpack) => {
          return (
            <EditPackage
              key={tourpack._id}
              updateTourpack={updateTourpack}
              tourpack={tourpack}
            />
          );
        })}
      </div>
    </>
  );
};

export { Tourpack, EditPack };
