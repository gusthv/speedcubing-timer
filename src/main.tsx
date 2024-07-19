import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").then(
      (registration) => {
        console.log("Service Worker Registered:", registration.scope);
      },
      (error) => {
        console.log("Service Worker Registration Failed:", error);
      }
    );
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <App />
  </>
);
