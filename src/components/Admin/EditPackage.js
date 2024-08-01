import React, { useContext}  from 'react'
import tourpackContext from '../../context/tourpack/tourContext';

const EditPackage = (props) => {
    const context = useContext(tourpackContext);
    const {deleteTourpack} = context;

   const {tourpack} = props;
  return (
    <div className='col-md-10'>
   
      <div class="card my-3" >
  
  <div class="card-body">
    <div className='d-flex align-items-center '>
    <h5 class="card-title">{tourpack.title}</h5>
    <i class="fa-solid fa-trash mx-3" onClick={()=>{deleteTourpack(tourpack._id)}}></i>
    <i class="fa-solid fa-pen-to-square mx-3"></i>
    </div>
    <p class="card-text">{tourpack.description}  </p>
    <p class="card-text">{tourpack.pic}</p>
    <button>Contact Us</button>
  
  </div>
</div>
    </div>
  )
}

export default EditPackage

//this page is same as TourpackItem and this just shows the packages