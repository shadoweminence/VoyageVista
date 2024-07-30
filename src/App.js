

import './App.css';
import Alert from './components/Alert';
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Settings from "./components/Settings";
import Packages from "./components/Packages";
import AddFeed from "./components/AddFeed";
import React,{useState} from 'react'
import{
  BrowserRouter as Router,
  Routes,
  Route,
  // Link
}from "react-router-dom";

function App() {
  const [mode, setMode] = useState("light");
  const [alert,setAlert] = useState(null);

  const showAlert = (message, type) =>{
       setAlert({
        msg: message,
       type: type
       })
       setTimeout(() => {
        setAlert(null);
       }, 1500);
  }
 
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#8e9195";
      document.body.style.color = "white";
      showAlert("Converted to dark mode","success : ");
     // document.title = "heheh";  this line can be used to change the title of the site
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
      showAlert("Converted to light mode","success : ");
    }
  }

  return (
   <>
   <Router>
    <Navbar title="VV" mode= {mode} toggleMode={toggleMode}/>
   <Alert alert={alert}/>
   <div className="container">
   <Routes>
    <Route exact path ="/" element={<Login showAlert={showAlert}/>}></Route>
    <Route exact path ="/settings" element={<Settings/>}></Route>
    <Route exact path ="/Packages" element={<Packages/>}></Route>
    <Route exact path ="/addFeed" element={<addFeed/>}></Route>
   <Route exact path ="/Register"  element={<Register showAlert={showAlert}/>}/>
   </Routes>
   </div>
   </Router>
   </>
  );
}

export default App;
