import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from "react";
import Home from "./Home"; // Your Home component
import LogIn from "./LogIn"; // Your LogIn component
import App from "./App"; // If you have an App component
import './Styles/App.scss';
import './index.scss';
import { useEffect, useState } from 'react';

const RouterComponent: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');


  interface User {
    email: string;
    token: string;
  }
  
  useEffect(() => {

    const userString = localStorage.getItem('user');
    const user: User | null = userString ? JSON.parse(userString) : null;
  

    if (!user || !user.token) {
      setLoggedIn(false);
      return;
    }
  

    fetch('http://localhost:3080/verify', {
      method: 'POST',
      headers: {
        'jwt-token': user.token,
      },
    })
      .then((r) => r.json())
      .then((r) => {
        setLoggedIn(r.message === 'success');
        setEmail(user.email || '');
      });
  }, []);
  
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Home email="" loggedIn={false} setLoggedIn={() => {}} />} />
      <Route path="/LogIn" element={<LogIn setLoggedIn={() => { } } setEmail={function (value: React.SetStateAction<string>): void {
                  throw new Error('Function not implemented.');
              } } />} />
      {/* Add other routes here as necessary */}
      <Route path="./App" element={<App />} />
    </Routes>
        );
    </div>
  );
};

export default RouterComponent;