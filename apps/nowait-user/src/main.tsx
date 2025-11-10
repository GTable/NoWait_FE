import { createRoot } from "react-dom/client";
import "./global.css";
import App from "./App.tsx";
import { initSentry } from "./utils/initSentry.ts";
import { perf } from "./firebaseConfig";
if (perf) console.log("Firebase Performance initialized", perf);
initSentry();

createRoot(document.getElementById("root")!).render(
  <>
    <App />
  </>
);
