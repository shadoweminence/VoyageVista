import './App.css';
import Alert from './components/Layouts/Alert';
import Login from "./components/Pages/Login";
import Register from "./components/Pages/Register";
import Navbar from "./components/Layouts/Navbar";
import Footer from './components/Layouts/Footer';
import Settings from "./components/Pages/Settings";
import Packages from "./components/Pages/Packages";
import AddFeed from "./components/Pages/AddFeed";
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  const [mode, setMode] = useState("light");
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
      showAlert("Converted to dark mode", "success");
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
      showAlert("Converted to light mode", "success");
    }
  };

  return (
    <>
      <Router>
        <Navbar title="VV" mode={mode} toggleMode={toggleMode} />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route path="/" element={<Login showAlert={showAlert} />} />
            <Route path="/Pages/settings" element={<Settings />} />
            <Route path="/Pages/packages" element={<Packages />} />
            <Route path="/Pages/addFeed" element={<AddFeed />} />
            <Route path="/Pages/register" element={<Register showAlert={showAlert} />} />
          </Routes>
          <Footer/>
        </div>
      
      </Router>
      </>
    
  );
}

export default App;
