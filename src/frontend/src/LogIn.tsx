import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Styles/App.scss";
import "./index.scss";


interface LoginProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const LogIn: React.FC<LoginProps> = ({ setLoggedIn, setEmail }) => {
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
    console.log('Form is valid, proceed with authentication...');
  };

  return (
    <div className={'mainContainer'}>
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
