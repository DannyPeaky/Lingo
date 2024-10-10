import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
// @ts-expect-error - no types available
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "./index.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

serviceWorkerRegistration.register({
  onUpdate: (registration: any) => {
    const waitingServiceWorker = registration.waiting;
    window.dispatchEvent(new CustomEvent("updateIsReady", { detail: waitingServiceWorker }));
  },
});
