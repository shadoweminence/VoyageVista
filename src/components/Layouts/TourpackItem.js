import React from 'react'

const TourpackItem = (props) => {
   const {tourpack} = props;
  return (
    <div className='col-md-10'>
   
      <div class="card mx-3" >
  
  <div class="card-body">
    <h5 class="card-title">{tourpack.title}</h5>
    
    <p class="card-text">{tourpack.description}  </p>
    <p class="card-text">{tourpack.pic}</p>
    <button>Contact Us</button>
  
  </div>
</div>
    </div>
  )
}

export default TourpackItem
