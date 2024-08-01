import React, { useContext}  from 'react'
import tourpackContext from '../../context/tourpack/tourContext';

const EditPackage = (props) => {
  const context = useContext(tourpackContext);
  const { deleteTourpack } = context;

  const { tourpack, updateTourpack } = props;

  // Split the description text into paragraphs based on line breaks
  const paragraphs = tourpack.description.split(/\r?\n/);
  return (
    <div className="col-md-10">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center ">
            <h5 className="card-title">{tourpack.title}</h5>
            <i
              className="fa-solid fa-trash mx-3"
              onClick={() => {
                deleteTourpack(tourpack._id);
              }}
            ></i>
            <i
              className="fa-solid fa-pen-to-square mx-3"
              onClick={() => {
                updateTourpack(tourpack);
              }}
            ></i>
          </div>
          {/* Map over the paragraphs array and create a <p> element for each */}
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="card-text text-wrap">
              {paragraph}
            </p>
          ))}
          
          <button>Contact Us</button>
        </div>
      </div>
    </div>
  );
}

export default EditPackage

//this page is same as TourpackItem and this just shows the packages