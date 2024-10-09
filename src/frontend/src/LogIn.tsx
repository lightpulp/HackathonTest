import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Styles/App.scss";
import "./index.scss";
import WaterGallonMain from "../public/Water_Gallon_Main.png";

interface LoginProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const LogIn: React.FC<LoginProps> = ({ setLoggedIn, setEmail }) => {
  const [activeTab, setActiveTab] = useState<string>("Overview");
  const [email, updateEmail] = useState<string>('');
  const [password, updatePassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>(''); 
  const [passwordError, setPasswordError] = useState<string>('');

  const navigate = useNavigate();

  const onButtonClick = () => {
    setEmailError('');
    setPasswordError('');
    if (email.trim() === '') {
      setEmailError('Please enter your email');
      return;
    }
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailPattern.test(email)) {
      setEmailError('Please enter a valid email');
      return;
    }
    if (password.trim() === '') {
      setPasswordError('Please enter a password');
      return;
    }

    if (password.length < 8) {
      setPasswordError('The password must be 8 characters or longer');
      return;
    }
    else {
      navigate('/App');
      console.log('Form is valid, proceed with authentication...');
    }
  };

  return (
    <div className={'mainContainer'}>
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
        <div>Login</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => updateEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => updatePassword(ev.target.value)}
          className={'inputBox'}
          type="password"
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
      </div>
    </div>
  );
};

export default LogIn;
