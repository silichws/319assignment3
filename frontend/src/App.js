import "./App.css";
import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import Info from "./Info";
import About from "./About";


const App = () => {

  const [isDashboard, setIsDashboard] = useState(true);
  const [isInfo, setIsInfo] = useState(false);
  const [isabout, setIsAbout] = useState(false);
  

  function showDash() {
    setIsDashboard(true);
    setIsInfo(false);
    setIsAbout(false);
  }

  function showInfo() {
    setIsDashboard(false);
    setIsInfo(true);
    setIsAbout(false);
  }

  function showIsAbout() {
    setIsDashboard(false);
    setIsInfo(false);
    setIsAbout(true);
  }

  return (
    <div> 
      <div className="buttons">
      <button
          className="btn btn-md btn-primary"
          onClick={() => showDash()}
        >
          Dashboard
        </button>
        <button
          className="btn btn-md btn-primary"
          onClick={() => showInfo()}
        >
          Show Information
        </button>
        <button
          className="btn btn-md btn-primary"
          onClick={() => showIsAbout()}
        >
          About Us
        </button>
      </div>
      <div className="dashboard" style={{ display: isDashboard ? "block" : "none" }}>
        <Dashboard />
      </div>
      <div className="info" style={{ display: isInfo ? "block" : "none" }}>
      <Info />
      </div>
      <div className="about" style={{ display: isabout ? "block" : "none" }}>
      <About />
      </div>
      
      
    </div>
  );
};

export default App;
