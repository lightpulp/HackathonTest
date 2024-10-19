import React, { useState } from "react";
import "./Styles/App.scss";
import "./index.scss";
import { useNavigate } from 'react-router-dom';
import WaterGallonMain from "../public/Water_Gallon_Main.png";
import WaterdropLogo from "../public/Waterdrop_Logo.png";

interface HomeProps {
  email: string;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Home: React.FC<HomeProps> = ({ email, loggedIn, setLoggedIn }) => {
  const [activeTab, setActiveTab] = useState<string>("Home");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_FirstName: '',
    user_MiddleName: '',
    user_LastName: '',
    user_Username: '',
    user_Email: '',
    user_Password: '',
    user_Region: '',
  });

  const onButtonClick = () => {
    if (loggedIn) {
      localStorage.removeItem('user');
      setLoggedIn(false);
    } else {
      navigate('./LogIn');
    }
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (tab === "Home") {
      // Nothing to do here
    } else if (tab === "Sign Up") {
      navigate('/SignUp');
    } else if (tab === "Log In") {
      navigate('/LogIn');
    }
  };

  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/user/insert', {  // Update URL accordingly
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (result.status === 1) {
      alert(result.message);

    } else {
      alert(result.message);
    }
  };

  return (
    <div className="mainContainer">
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
          {["Home", "Log In", "Sign Up"].map(tab => (
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

      {/* User Registration Form */}
      <form onSubmit={handleSubmit}>
        <h2>Register User</h2>
        <input
          type="text"
          name="user_FirstName"
          value={formData.user_FirstName}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="user_MiddleName"
          value={formData.user_MiddleName}
          onChange={handleChange}
          placeholder="Middle Initial"
          required
        />
        <input
          type="text"
          name="user_LastName"
          value={formData.user_LastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <input
          type="text"
          name="user_Username"
          value={formData.user_Username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="email"
          name="user_Email"
          value={formData.user_Email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="user_Password"
          value={formData.user_Password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <input
          type="text"
          name="user_Region"
          value={formData.user_Region}
          onChange={handleChange}
          placeholder="Region"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Home;
