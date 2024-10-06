import React, { useState } from "react";
import ReactDOM from 'react-dom/client';
import App from './App';
import LogIn from "./LogIn";
import './index.scss';
import './Styles/App.scss';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LogIn />
  </React.StrictMode>,
);
