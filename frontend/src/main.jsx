// ============================================================
// MAIN.JSX — The very first file that runs when the website loads.
//
// This is the "ignition key" of the frontend. It does ONE job:
// Take our main App component and display it inside the HTML page.
//
// The HTML page (index.html) has an empty <div id="root"></div>.
// This file finds that div and fills it with our entire React application.
// ============================================================

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Our main application component (contains all sections)
import "./index.css"; // Global styles that apply to the entire website

// Find the empty "root" div in index.html and render our App inside it.
// "StrictMode" is a development helper that warns us about potential issues —
// it doesn't affect the final website users see.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
