import React, { useState } from "react";
import "./Styles/App.scss";
import WaterGallonMain from "../public/Water_Gallon_Main.png";
import WaterBottle from "../public/Water_Bottle.png";
import MessageBubble from "../public/Message_Bubble_Big.png";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Overview");
  const [bottlesUsed, setBottlesUsed] = useState<number[]>([]);

  // This function adds the bottle to the tracking list
  const addBottle = () => {
    setBottlesUsed([...bottlesUsed, bottlesUsed.length + 1]);
  };

  return (
    <div className="app-container">
      {/* Top Bar */}
      <div className="top-bar">
        <div className={`tab ${activeTab === "Overview" ? "active" : ""}`} onClick={() => setActiveTab("Overview")}>
          Overview
        </div>
        <div className={`tab ${activeTab === "Log Usage" ? "active" : ""}`} onClick={() => setActiveTab("Log Usage")}>
          Log Usage
        </div>
        <div className={`tab ${activeTab === "Tips & Advice" ? "active" : ""}`} onClick={() => setActiveTab("Tips & Advice")}>
          Tips & Advice
        </div>
        <div className={`tab ${activeTab === "Goals" ? "active" : ""}`} onClick={() => setActiveTab("Goals")}>
          Goals
        </div>
        <div className={`tab ${activeTab === "Impact" ? "active" : ""}`} onClick={() => setActiveTab("Impact")}>
          Impact
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {activeTab === "Overview" && (
          <div className="overview-section">
            {/* Water Gallon Section */}
            <div className="gallon-section">
              <img src={WaterGallonMain} alt="Water Gallon" className="gallon-image" />
              <h1>Track Your Water Usage</h1>
            </div>

            {/* Bottles section */}
            <div className="bottle-tracking-section">
              <h2>Bottles You've Used</h2>
              <button onClick={addBottle}>Add Bottle</button>
              <div className="bottle-list">
                {bottlesUsed.map((bottle, index) => (
                  <img key={index} src={WaterBottle} alt={`Bottle ${index + 1}`} className="bottle-image" />
                ))}
              </div>

              {/* Messages section */}
              <div className="message-bubble">
                <img src={MessageBubble} alt="Message Bubble" className="bubble-image" />
                <p>{bottlesUsed.length} bottles used</p>
              </div>
            </div>
          </div>
        )}

        {/* Temp place holder for the other tabs */}
        {activeTab === "Log Usage" && <div><h2>Log Your Water Usage</h2><p>Functionality to log water usage will go here.</p></div>}
        {activeTab === "Tips & Advice" && <div><h2>Water-Saving Tips & Advice</h2><p>Tips and advice about saving water will go here.</p></div>}
        {activeTab === "Goals" && <div><h2>Your Water Usage Goals</h2><p>Set and track your water usage goals here.</p></div>}
        {activeTab === "Impact" && <div><h2>Impact of Your Water Usage</h2><p>View the environmental impact of your water usage here.</p></div>}
      </div>
    </div>
  );
};

export default App;
