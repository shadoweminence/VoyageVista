import React, { useContext}  from 'react'
import statusContext from '../../context/status/statusContext';
import StatusItem from './StatusItem';

const Status = () => {
    const context = useContext(statusContext);

  const {status,setStatus} = context
  return (
    <div className='container my-3'>
      <h2>Your Status</h2>
  
     
      {status.map((status)=>{
        return <StatusItem status={status}/>
      })}
    </div>
  )
}

export default Status
