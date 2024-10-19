import React, { useState, useEffect } from "react";
import "./Styles/App.scss";
import "./index.scss";
import { useNavigate } from 'react-router-dom';
import WaterdropLogo from "../public/Waterdrop_Logo.png";

interface HomeProps {
  email: string;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Configuration {
  id: number;
  key: string;
  value: string;
}

const Home: React.FC<HomeProps> = ({ email, loggedIn, setLoggedIn }) => {
  const [activeTab, setActiveTab] = useState<string>("Home");
  const [configurations, setConfigurations] = useState<Configuration[]>([]);
  const [newConfigKey, setNewConfigKey] = useState<string>("");
  const [newConfigValue, setNewConfigValue] = useState<string>("");
  const [updateConfigKey, setUpdateConfigKey] = useState<string>("");
  const [updateConfigValue, setUpdateConfigValue] = useState<string>("");
  const [deleteConfigKey, setDeleteConfigKey] = useState<string>("");

  const navigate = useNavigate();

  // Fetch configurations from the backend
  useEffect(() => {
    const fetchConfigurations = async () => {
      const response = await fetch('/configurations');
      const data = await response.json();
      setConfigurations(data.data || []);
    };
    fetchConfigurations();
  }, []);

  const insertConfiguration = async () => {
    await fetch('/configuration/insert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: newConfigKey, value: newConfigValue }),
    });
    setNewConfigKey("");
    setNewConfigValue("");
    window.location.reload();
  };

  const updateConfiguration = async () => {
    await fetch('/configuration/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: updateConfigKey, value: updateConfigValue }),
    });
    setUpdateConfigKey("");
    setUpdateConfigValue("");
    window.location.reload();
  };

  const deleteConfiguration = async () => {
    await fetch('/configuration/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: deleteConfigKey }),
    });
    setDeleteConfigKey("");
    window.location.reload();
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (tab === "Home") {
      navigate('/');
    } else if (tab === "Sign Up") {
      navigate('/SignUp');
    } else if (tab === "Log In") {
      navigate('/LogIn');
    }
  };

  return (
    <div className="mainContainer">
      <header className="top-bar">
        <div className="logo">
          <img src={WaterdropLogo} alt="Water Drop Logo" />
          <h1>WaterSaver</h1>
        </div>
        <nav className="nav">
          {["Home", "Log In", "Sign Up"].map((tab) => (
            <div
              key={tab}
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </div>
          ))}
        </nav>
      </header>

      <div className="content">
        <h2>Manage Configurations</h2>
        
        {/* Insert Configuration */}
        <div>
          <h3>Insert Configuration</h3>
          <input
            type="text"
            placeholder="Key"
            value={newConfigKey}
            onChange={(e) => setNewConfigKey(e.target.value)}
          />
          <input
            type="text"
            placeholder="Value"
            value={newConfigValue}
            onChange={(e) => setNewConfigValue(e.target.value)}
          />
          <button onClick={insertConfiguration}>Insert</button>
        </div>

        {/* Update Configuration */}
        <div>
          <h3>Update Configuration</h3>
          <input
            type="text"
            placeholder="Key"
            value={updateConfigKey}
            onChange={(e) => setUpdateConfigKey(e.target.value)}
          />
          <input
            type="text"
            placeholder="New Value"
            value={updateConfigValue}
            onChange={(e) => setUpdateConfigValue(e.target.value)}
          />
          <button onClick={updateConfiguration}>Update</button>
        </div>

        {/* Delete Configuration */}
        <div>
          <h3>Delete Configuration</h3>
          <input
            type="text"
            placeholder="Key"
            value={deleteConfigKey}
            onChange={(e) => setDeleteConfigKey(e.target.value)}
          />
          <button onClick={deleteConfiguration}>Delete</button>
        </div>

        {/* List Configurations */}
        <div>
          <h3>Current Configurations</h3>
          <ul>
            {configurations.map((config) => (
              <li key={config.id}>
                {config.key}: {config.value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
