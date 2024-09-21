import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./sass/main.scss";

import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/authContext/index.jsx";
import UserProvider from "./contexts/userContext/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </AuthProvider>
  </BrowserRouter>
);
