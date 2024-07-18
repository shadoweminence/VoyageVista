import React from 'react'
import { Link } from 'react-router-dom'

export default function Login(props) {
    

  

    const Logged=()=>{
        props.showAlert("Logged In","success");
    }


  return (
    <>
    <div className='container'>
    <h1>Login</h1>

        <div classNameName="mb-3 my-5 mx-10 row">
    <label for="staticEmail" classNameName="col-sm-2 col-form-label">Email</label>
    <div classNameName="col-sm-10">
      <input type="text"  classNameName="form-control-plaintext" id="staticEmail" placeholder="email@example.com"/>
    </div>
  </div>
  <div classNameName="mb-3 my-5 mx-10 row">
    <label for="inputPassword" classNameName="col-sm-2 col-form-label">Password</label>
    <div classNameName="col-sm-10">
      <input type="password" classNameName="form-control" id="inputPassword"/>
    </div>
  </div>
  <div classNameName="container"> <button classNameNameName="btn btn-primary" onClick={Logged}>Login</button><br />
     <Link classNameNameName="abc" to="/Register">Create a new account</Link>  </div>
  


    </div>
    </>
  )
}
