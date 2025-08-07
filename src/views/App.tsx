import { useState } from "react";
import Dashboard from "./Dashboard";
import GridView from "./GridView";
import Modal from "../components/Modal";
import {
  MODAL_HEADER,
  PAGE_DESCRIPTION,
  PAGE_HEADER,
} from "../settings/content";

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="bg-slate-900 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-md my-4 px-8 bg-white text-black">
          <h1 className="text-center my-4 text-4xl">{PAGE_HEADER}</h1>
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
