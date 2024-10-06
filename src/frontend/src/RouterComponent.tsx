import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './LogIn';
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
      <BrowserRouter>
        <Routes>
          <Route
            path="./Home"
            element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          />
          <Route path="./LogIn" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default RouterComponent;