import React, { useContext}  from 'react'


import TourpackItem from './TourpackItem';
import tourpackContext from '../../context/tourpack/tourContext';
import EditPackage from '../Admin/EditPackage';

const Tourpack = () => {
    const context = useContext(tourpackContext);
  const {tourpacks,addTourpacks} = context
  return (
    <>
 
    <div className='container my-3'>
      <h2>Your Status</h2>
  
     
      {tourpacks.map((tourpack)=>{
        return <TourpackItem key = {tourpack._id} tourpack={tourpack}/>
      })}
    </div>
    </>
  )
}
const EditPack =() => {
  const context = useContext(tourpackContext);
const {tourpacks,addTourpacks} = context
return (
  <>

  <div className='container my-3'>
    <h2>Your Status</h2>

   
    {tourpacks.map((tourpack)=>{
      return <EditPackage key = {tourpack._id} tourpack={tourpack}/>
    })}
  </div>
  </>
)
}

export  {Tourpack, EditPack}
