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
      <div className={'titleContainer'}>
        <div>Welcome!</div>
      </div>
      <div>This is the home page.</div>
      <div className={'buttonContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={onButtonClick}
          //value={loggedIn ? 'Log out' : 'Log in'}
        />
        {<div />}
      </div>
    </div>
  )
};

export default Home;