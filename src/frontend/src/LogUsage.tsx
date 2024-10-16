import React, { useState } from 'react';
import "./Styles/App.scss";
import "./Styles/ActiveTab.scss";
import { useNavigate } from 'react-router-dom';
import WaterGallonMain from "../public/Water_Gallon_Main.png";

const LogUsage: React.FC = () => {
    const [usage, setUsage] = useState<number | ''>('');
    const [activeTab, setActiveTab] = useState<string>("Log Usage"); // Initialize activeTab
    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsage(event.target.value ? parseFloat(event.target.value) : '');
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(`Water usage input: ${usage} liters`);
        setUsage(''); // Reset the input after submission
    };

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        if (tab === "Log Usage") {
            navigate('/LogUsage'); 
          } else if (tab === "Tips & Advice") {
            navigate('/Tips'); 
          } else if (tab === "Overview") {
            navigate('/App');
          }
          else if (tab === "Goals") {
              navigate('/App');
          }
          else if (tab === "Impact") {
              navigate('/Impact');
          }
    };

    return (
        <div className="input-container">
            <header className="top-bar">
                <div className="logo">
                    <img src={WaterGallonMain} alt="Water Drop Logo" />
                    <h1>WaterSaver</h1>
                </div>
                <nav className="nav">
                    {["Log Usage", "Tips & Advice", "Overview", "Goals", "Impact"].map(tab => (
                        <div
                            key={tab}
                            className={`tab ${activeTab === tab ? "active" : ""}`}
                            onClick={() => handleTabClick(tab)}
                        >
                            {tab}
                        </div>
                    ))}
                </nav>
                <div className="greeting">
                    <span>Hi!</span>
                    <span className="dropdown-arrow">▼</span>
                </div>
            </header>
            <h1 className="input-title">Water Usage Input</h1>
            <form className="input-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="water-usage">Daily Water Usage (in liters)</label>
                    <input
                        type="number"
                        id="water-usage"
                        name="water-usage"
                        value={usage}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter water usage"
                    />
                </div>
                <button type="submit" className="input-button">Submit</button>
            </form>
            <p className="feedback-message">Thank you for tracking your water usage!</p>
        </div>
    );
};

export default LogUsage;
