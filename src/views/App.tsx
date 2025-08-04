import { useState } from "react";
import Dashboard from "./Dashboard";
import GridView from "./GridView";
import Modal from "../components/Modal";
import {
  MODAL_HEADER,
  PAGE_DESCRIPTION,
  PAGE_HEADER,
} from "../settings/content";
import { GRID_WIDTH_PX } from "../settings/grid";
import "../styles/App.css";

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="App dark-theme">
      <div
        className="mx-auto max-w-7xl"
        style={{
          width: GRID_WIDTH_PX + "px",
        }}
      >
        <div className="content-box light-theme">
          <h1 className="centered-text">{PAGE_HEADER}</h1>
          {PAGE_DESCRIPTION}
        </div>
        <Dashboard setModalIsOpen={setModalIsOpen} />
        <GridView />
      </div>
      {modalIsOpen && (
        <Modal
          closeModalFunction={() => setModalIsOpen(false)}
          title={MODAL_HEADER}
          confirmLabel={"Reset"}
        />
      )}
    </div>
  );
}

export default App;
