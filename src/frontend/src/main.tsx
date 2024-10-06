import React, { useState } from "react";
import ReactDOM from 'react-dom/client';
import App from './App';
import LogIn from './LogIn';
import Home from './Home';
import RouterComponent from "./RouterComponent";
import './index.scss';
import './Styles/App.scss';
import { useNavigate } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Home email={""} loggedIn={false} setLoggedIn={function (value: React.SetStateAction<boolean>): void {
      throw new Error("Function not implemented.");
    } } />
  </React.StrictMode>,
);
