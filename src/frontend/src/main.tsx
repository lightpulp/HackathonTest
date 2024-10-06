import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import LogIn from './LogIn';
import Home from './Home';
import './index.scss';
import './Styles/App.scss';
import Login from './LogIn';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
