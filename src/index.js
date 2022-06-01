import React, { StrictMode } from "react";
import { createRoot } from 'react-dom/client';
import "./index.css";
import App from "./App";
import ReactDOM from "react-dom";


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );
