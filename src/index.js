import React from 'react';
import { createRoot } from "react-dom/client";
import App from "./components/app/App";

import "./style/style.scss";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  // <React.StrictMode> cause bags in dev env, look through https://legacy.reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects
    <App />
  // </React.StrictMode>
);
