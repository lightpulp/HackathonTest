import React, { useState } from "react";
import "./Styles/App.scss";
import "./index.scss";
import { useNavigate } from 'react-router-dom';

interface HomeProps {
  email: string;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Home: React.FC<HomeProps> = ({ email, loggedIn, setLoggedIn }) => {
  const [activeTab, setActiveTab] = useState<string>("Overview");
  const navigate = useNavigate(); 
  const onButtonClick = () => {
    if (loggedIn) {

      localStorage.removeItem('user');
      setLoggedIn(false);
    } else {
      navigate('./LogIn');
    }
  };

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
      <div>This is the home page.</div>
      <div className={'buttonContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={onButtonClick}
          value={loggedIn ? 'Log out' : 'Log in'}
        />
        {loggedIn ? <div>Your email address is {email}</div> : <div />}
      </div>
    </div>
  );
};

export default Home;
