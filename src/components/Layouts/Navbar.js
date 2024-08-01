import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar(props) {
  let location = useLocation();

  return (
    <div>
      <nav className={`navbar navbar-expand-lg navbar-${props.mode === 'dark' ? 'dark' : 'light'} bg-${props.mode}`}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">{props.title}</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/Pages/Home">Home</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/settings"?"active":""}`} to="/Pages/settings">Settings</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/search"?"active":""}`} to="/Pages/Packages">Packages</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/addFeed"?"active":""}`} to="/Pages/addFeed">AddFeed</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/addFeed"?"active":""}`} to="/Pages/Profile">Profile</Link>
          </li>
         
        </ul>
       
        
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline" type="submit">Search</button>
      </form>
      <div className={`form-check form-switch text-${props.mode === 'light'? 'dark': 'light'}`}>
  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={props.toggleMode}/>
  <label className="form-check-label" htmlFor="flexSwitchCheckDefault" >Enable Dark Mode</label>
</div>
    </div>

</nav>
    </div>
  )
}
