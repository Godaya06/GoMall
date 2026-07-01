import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { registerServiceWorker } from "./pwa/register-sw";
import { startSyncEngine } from "./offline/sync";

createRoot(document.getElementById("root")!).render(<App />);

// Kick off offline data seed + sync on every load.
startSyncEngine();

// Register the service worker (guarded — no-ops in dev/preview/iframe).
void registerServiceWorker();
