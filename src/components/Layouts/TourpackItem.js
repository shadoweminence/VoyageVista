import React from 'react'



const TourpackItem = (props) => {
  const { tourpack } = props;
  // Split the description text into paragraphs based on line breaks
  const paragraphs = tourpack.description.split(/\r?\n/);
  return (
    <>
       
    <div className="container col-md-5">
   
      <div className="card my-3">
        <div className="card-body" >
          <h5 className="card-title">{tourpack.title}</h5>

          {/* Map over the paragraphs array and create a <p> element for each */}
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="card-text text-wrap">
              {paragraph}
            </p>
          ))}
          <p className="card-text">{tourpack.pic}</p>
          <button>Contact Us</button>
        </div>
      </div>
    </div>
    </>
  );
}

export default TourpackItem
