import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./sass/main.scss";

import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/authContext/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
		<BrowserRouter>
		<AuthProvider>
		<App />
		</AuthProvider>
		</BrowserRouter>

);
