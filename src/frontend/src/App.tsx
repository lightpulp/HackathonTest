import React, { useState, useRef } from "react";
import TopBar from './Styles/TopBar.scss';
import "./Styles/App.scss";
import "./Styles/ActiveTab.scss";
import "./Styles/MessageBubble.scss";
import { useNavigate } from 'react-router-dom';
import WaterGallonMain from "../public/Water_Gallon_Main.png";
import WaterGallonEmpty from "../public/Water_Gallon_Empty.png";
import WaterGallonFilled from "../public/Water_Gallon_Filled.png";
import BouncingArrows from "../public/Bouncing_Arrows.gif";
import StaticArrows from "../public/Static_Arrows.png";
import WaterBottle from "../public/Water_Bottle.png";
{/*import MessageBubbleBig from "../public/Message_Bubble_Big.png";
import MessageBubbleSmall from "../public/Message_Bubble_Small.png";*/}
import WaterdropLogo from "../public/Waterdrop_Logo.png";

const App: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("Overview");
  const [bottlesUsed, setBottlesUsed] = useState<number[]>([]);
  const bottleTrackingRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const addBottle = () => {
    setBottlesUsed([...bottlesUsed, bottlesUsed.length + 1]);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (tab === "Log Usage") {
      navigate('/LogUsage'); 
    } else if (tab === "Tips & Advice") {
      navigate('/Tips'); 
    } else if (tab === "Overview") {
      navigate('/App');
    } else if (tab === "Goals") {
      navigate('/Goal');
    } else if (tab === "Impact") {
      navigate('/Impact');
    }
  };

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  const handleGallonClick = () => {
    if (bottleTrackingRef.current) {
      const offset = -200; // Adjust this value to change the scroll offset
      const elementPosition = bottleTrackingRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="app-container">
      <header className="top-bar">
        {/* Hamburger Menu Button */}
        <div className={`menu-button ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div className="logo">
          <img src={WaterdropLogo} alt="Water Drop Logo" />
          <h1>WaterSaver</h1>
        </div>

        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          {["Log Usage", "Tips & Advice", "Overview", "Goals", "Impact"].map(tab => (
            <div
              key={tab}
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => {
                handleTabClick(tab);
                setMenuOpen(false); // Close menu on tab click
              }}
            >
              {tab}
            </div>
          ))}
        </nav>

        <div className="greeting" onClick={toggleDropdown}>
          <span>Hi!</span>
          <span className="dropdown-arrow">▼</span>
        </div>

        {isDropdownOpen && (
          <div className="dropdown-menu open">
            <div className="tab" onClick={() => navigate('/Profile')}>Profile</div>
            <div className="tab" onClick={() => navigate('/LogIn')}>Sign Out</div>
          </div>
        )}
      </header>

      <div className="content-wrapper">
        <main className="main-content">
          {activeTab === "Overview" && (
            <div className="overview-section">
              <div className="gallon-section" onClick={handleGallonClick}>
                <img src={WaterGallonMain} alt="Water Gallon" className="gallon-image" />
                <img src={WaterGallonEmpty} alt="Water Gallon Empty" className="gallon-empty-image" />
                <img src={WaterGallonFilled} alt="Water Gallon Filled" className="gallon-filled-image" />
              </div>

              <div className="bottle-tracking-section" ref={bottleTrackingRef}>
                <button className="add-bottle-button" onClick={addBottle}>Add Bottle</button>
                <div className="bottle-list">
                  {bottlesUsed.map((_, index) => (
                    <img key={index} src={WaterBottle} alt={`Bottle ${index + 1}`} className="bottle-image" />
                  ))}
                </div>

                <div className="scroll-indicator">
                  <p className="scroll-text">Scroll down to see your statistics</p>
                  <div className="arrow-container">
                    <img src={StaticArrows} alt="Static Arrows" className="static" />
                    <img src={BouncingArrows} alt="Bouncing Arrows" className="bouncing" />
                  </div>
                </div>

                <div className="message-bubbles">
      <div className="message-bubble">
        You are averaging <span style={{ color: 'blue' }}>1.3 gallons</span> of water daily!
      </div>
      <div className="message-bubble">
        That is equivalent to <span style={{ color: 'green' }}>14</span> <span style={{ color: 'blue' }}>350ml</span> bottles of water.
      </div>
    </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;