import React from 'react'
import { Link } from 'react-router-dom';

export default function Register(props) {
    const Register=()=>{
        props.showAlert("Registered","success");
    }

  return (
    <>
    <div  >
    <h1>Register</h1>

    <div className="container my-3">
    <div className="mb-3 row">
    <label for="Na,e" className="col-sm-2 col-form-label">UserName</label>
    <div className="col-sm-10">
    <input type="email" class="form-control" id="name" />
    </div>
    </div>

        <div className="mb-3 row">
    <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
    <div className="col-sm-10">
      <input type="text"  className="form-control-plaintext" id="staticEmail" placeholder="email@example.com"/>
    </div>
  </div>
  <div className="mb-3 row">
    <label for="inputPassword" className="col-sm-2 col-form-label">Password</label>
    <div className="col-sm-10">
      <input type="password" className="form-control" id="inputPassword"/>
    </div>
  </div>

  <div className="mb-3  row">
    <label for="DOV" className="col-sm-2 col-form-label">DOB</label>
    <div className="col-sm-10">
      <input type="date" className="form-control" id="date"/>
    </div>
  </div>
 

    </div>
     <div className="container"> <button classNameName="btn btn-primary" onClick={Register}>Register</button><br />
     </div>
     </div>
     <Link classNameName="abc" to="/">Already Have a account? Log In</Link> 
  
  </>
  )
}
