import "./App.css";
import Alert from "./components/Layouts/Alert";
import Login from "./components/Pages/Login";
import Register from "./components/Pages/Register";
import Navbar from "./components/Layouts/Navbar";
import Footer from "./components/Layouts/Footer";
import Settings from "./components/Pages/Settings";
import Packages from "./components/Pages/Packages";
import AddFeed from "./components/Pages/AddFeed";
import Home from "./components/Pages/Home";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TourpackState from "./context/tourpack/TourpackState";
import Profile from "./components/Pages/Profile";
import AddPackage from "./components/Admin/AddPackage";
import AlertProvider from "./context/Alert/AlertProvider";
import Search from "./components/Pages/Search";

function App() {
  const [mode, setMode] = useState("light");
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
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
      <AlertProvider>
        <TourpackState>
          <Router>
            <Navbar title="Voyage Vista" mode={mode} toggleMode={toggleMode} />
            <Alert alert={alert} />
            <div className="container">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Pages/Home" element={<Home />} />
                <Route path="/Pages/search" element={<Search />} />
                <Route path="/Pages/settings" element={<Settings />} />
                <Route path="/Pages/packages" element={<Packages />} />
                <Route path="/Pages/addFeed" element={<AddFeed />} />
                <Route path="/Pages/Profile" element={<Profile />} />
                <Route path="/Pages/register" element={<Register />} />

                <Route path="/Admin/AddPackage" element={<AddPackage />} />
              </Routes>
              <Footer />
            </div>
          </Router>
        </TourpackState>
      </AlertProvider>
    </>
  );
}

export default App;
