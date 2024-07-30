import React from 'react'
import { Link } from 'react-router-dom'

export default function Login(props) {
    

  

    const Logged=()=>{
        props.showAlert("Logged In","success");
    }


  return (
    <>
    <div >
      <h1>Login Form</h1>
      <div className="container my-3">
  <form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1"/>
  </div>
  <div class="mb-3 form-check">
  <Link to="/forgotPass">Forgot Password</Link>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
</div>
<Link to="/Register">Create a new account</Link>

</div>
    </>
  )
}
