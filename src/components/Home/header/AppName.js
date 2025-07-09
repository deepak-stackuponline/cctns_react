import React from "react";
import logo from "./logo.png"; 
import "./AppName.css"; 

function AppName() {
  return (
    <div className="d-flex align-items-center">
       <img src={logo} alt="App Logo" className="logo me-1" />
        <h1 className="app-name mb-0">Literary Ledger</h1>
   </div>
  );

  
}

export default AppName;
