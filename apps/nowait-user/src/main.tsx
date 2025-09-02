import { createRoot } from "react-dom/client";
import "./global.css";
import App from "./App.tsx";
import { initSentry } from "./utils/initSentry.ts";

initSentry();

createRoot(document.getElementById("root")!).render(
  <>
    <App />
  </>
);
