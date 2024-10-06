import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import RouterComponent from "./RouterComponent"; // Ensure RouterComponent handles routes
import './index.scss';
import './Styles/App.scss';

const rootElement = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <RouterComponent />
    </BrowserRouter>
  </React.StrictMode>
);
