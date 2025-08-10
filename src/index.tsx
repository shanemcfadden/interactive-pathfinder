import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import { App } from "./views/App";
import { PathFindingContextProvider } from "./contexts/PathFindingContext/PathFindingContextProvider";
import { UserActionContextProvider } from "./contexts/UserActionContext/UserActionContextProvider";
import { ModalContextProvider } from "./contexts/ModalContext/ModalContextProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ModalContextProvider>
      <PathFindingContextProvider>
        <UserActionContextProvider>
          <App />
        </UserActionContextProvider>
      </PathFindingContextProvider>
    </ModalContextProvider>
  </StrictMode>,
);
