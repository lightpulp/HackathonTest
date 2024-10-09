import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Styles/App.scss";
import "./index.scss";
import WaterGallonMain from "../public/Water_Gallon_Main.png";

interface LoginProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const LogIn: React.FC<LoginProps> = ({ setLoggedIn, setEmail }) => {
  const [activeTab, setActiveTab] = useState<string>("Log In");
  const [email, updateEmail] = useState<string>('');
  const [password, updatePassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>(''); 
  const [passwordError, setPasswordError] = useState<string>('');

  const navigate = useNavigate();

  const validateForm = () => {
    setEmailError('');
    setPasswordError('');
    let isValid = true;

    if (email.trim() === '') {
      setEmailError('Please enter your email');
      isValid = false;
    } else {
      const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailPattern.test(email)) {
        setEmailError('Please enter a valid email');
        isValid = false;
      }
    }

    if (password.trim() === '') {
      setPasswordError('Please enter a password');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('The password must be 8 characters or longer');
      isValid = false;
    }

    return isValid;
  };

  const onButtonClick = () => {
    if (validateForm()) {
      setLoggedIn(true);
      setEmail(email);
      navigate('/App');
      console.log('Form is valid, proceed with authentication...');
    }
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (tab === "Home") {
      navigate('/'); 
    } else if (tab === "Sign Up") {
      navigate('/SignUp'); 
    } else if (tab === "Log In") {

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
          {["Home", "Log In", "Sign Up"].map(tab => (
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
