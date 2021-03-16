import "./index.css";

import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom";

import { App } from "./app";

ReactDOM.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>,
  document.getElementById("root")
);
