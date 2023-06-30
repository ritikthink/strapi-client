import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/Fonts.css";
import "./assets/css/Index.css";
import "./assets/css/Variables.css";
import "./assets/css/Theme.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
