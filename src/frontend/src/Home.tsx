import React, { useState } from "react";
import "./Styles/App.scss";
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Overview");
  
  const onButtonClick = () => {
    // You'll update this function later...
  }

  return (
    <div className="mainContainer">
      <header className="top-bar">
        <div className="logo">
          <img src="../public/Water_Gallon_Main.png" alt="Water Drop Logo" />
          <h1>WaterSaver</h1>
        </div>
        <nav className="nav">
          {["Log Usage", "Tips & Advice", "Overview", "Goals", "Impact"].map(tab => (
            <div
              key={tab}
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </nav>
        <div className="greeting">
          <span>Hi, Jack!</span>
          <span className="dropdown-arrow">▼</span>
        </div>
      </header>
      <div className={'titleContainer'}>
        <div>Welcome!</div>
      </div>
      <div>Water Foot Print</div>
      <div className={'buttonContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={onButtonClick}
          value={'Log in'}
        />
        {<div />}
      </div>
    </div>
  )
};

export default Home;