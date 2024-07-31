import React from 'react'

const StatusItem = (props) => {
   const {status} = props;
  return (
    <div className='col-md-10'>
   
      <div class="card mx-3" >
  
  <div class="card-body">
    <h5 class="card-title">{status.title}</h5>
    <p class="card-text">{status.description} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste amet saepe nam delectus asperiores, reiciendis, nemo maiores labore inventore tempore quasi, natus ut nisi libero atque sit! Quam doloribus neque, eius officiis tenetur enim totam doloremque odio blanditiis alias?    </p>
    <p class="card-text">{status.pic}</p>
  
  </div>
</div>
    </div>
  )
}

export default StatusItem
