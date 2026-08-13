/// <reference types="vite/client" />

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./app";
import "./styles.css";

const rootElement = document.getElementById("root");

if (rootElement === null) {
  throw new Error("Expected the web application root element to exist.");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
