import React, { useState } from 'react';
import "./Styles/App.scss";
import "./Styles/ActiveTab.scss";
import { useNavigate } from 'react-router-dom';
import WaterGallonMain from "../public/Water_Gallon_Main.png";
import WaterdropLogo from "../public/Waterdrop_Logo.png";
const Impact: React.FC = () => {
    const [usage, setUsage] = useState<number | ''>('');
    const [activeTab, setActiveTab] = useState<string>("Impact");
    const navigate = useNavigate();

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
    const [isMenuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
      setMenuOpen(prev => !prev);
    };

    return (
        <div className="app-container">
                   <header className="top-bar">
                {/* Hamburger Menu Button */}
                <div className="menu-button" onClick={toggleMenu}>
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

                    <div className="greeting">
                    <span>Hi!</span>
                    <span className="dropdown-arrow">▼</span>
                    </div>
            </header>

        <main className="main-content">
        {activeTab === "Impact" && (
                <div>
                    <h2 className="article-header">Impact of Your Water Usage</h2> 
                    <div className="article-container">
                    <header className="article-header">
                        <h1>Tapped Out: Exploring the Impacts of Water Pollution and Overuse</h1>
                        <p className="author-date">By Author Name | Date</p>
                    </header>
                    <section className="article-content">
                        <p>Water pollution and overuse are two critical issues facing our planet today...</p>
                        <img src="water-pollution.jpg" alt="Water Pollution" className="article-image" />
                        <h2 className="article-header">Understanding Water Pollution</h2>
                        <p>Water pollution is caused by the introduction of harmful contaminants into water bodies...</p>
                    </section>
                    <aside className="related-articles">
                        <h2 className="article-header">You Might Also Like</h2>
                        <ul>
                        <li><a href="/article1">Understanding Aquatic Ecosystems</a></li>
                        <li><a href="/article2">The Crisis of Clean Water Access</a></li>
                        <li><a href="/article3">Innovative Solutions for Water Conservation</a></li>
                        </ul>
                    </aside>
                    </div>
                </div>
                )}
        </main>
        </div>
    
    );
};

export default Impact;
