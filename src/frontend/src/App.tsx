import React, { useState } from "react";
import "./Styles/App.scss";
import LogIn from "./LogIn";
import Home from "./Home";
import { useNavigate } from 'react-router-dom';
import WaterGallonMain from "../public/Water_Gallon_Main.png";
import WaterGallonEmpty from "../public/Water_Gallon_Empty.png";
import WaterGallonFilled from "../public/Water_Gallon_Filled.png";
import WaterBottle from "../public/Water_Bottle.png";
import MessageBubble from "../public/Message_Bubble_Big.png";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Overview");
  const [bottlesUsed, setBottlesUsed] = useState<number[]>([]);

  const addBottle = () => {
    setBottlesUsed([...bottlesUsed, bottlesUsed.length + 1]);
  };

  return (
    <div className="app-container">
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

      <main className="main-content">
        {activeTab === "Overview" && (
          <div className="overview-section">
            <div className="gallon-section">
              <img src={WaterGallonMain} alt="Water Gallon" className="gallon-image" />
              <div className="water-bottle-images">
                <img src={WaterGallonEmpty} alt="Empty Water Bottle" className="water-image" />
                <img src={WaterGallonFilled} alt="Filled Water Bottle" className="water-image" />
              </div>
            </div>

            <div className="bottle-tracking-section">
              <button className="add-bottle-button" onClick={addBottle}>Add Bottle</button>
              <div className="bottle-list">
                {bottlesUsed.map((_, index) => (
                  <img key={index} src={WaterBottle} alt={`Bottle ${index + 1}`} className="bottle-image" />
                ))}
              </div>

              <div className="message-bubble">
                <img src={MessageBubble} alt="Message Bubble" className="bubble-image" />
                <p>{bottlesUsed.length} bottles used</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Log Usage" && <div><h2>Log Your Water Usage</h2><p>Functionality to log water usage will go here.</p></div>}
        {activeTab === "Tips & Advice" && <div><h2>Water-Saving Tips & Advice</h2><p>Tips and advice about saving water will go here.</p></div>}
        {activeTab === "Goals" && <div><h2>Your Water Usage Goals</h2><p>Set and track your water usage goals here.</p></div>}
        {activeTab === "Impact" && <div><h2>Impact of Your Water Usage</h2><p>View the environmental impact of your water usage here.</p></div>}
      </main>
    </div>
  );
};

export default App;