import { useState } from "react";
import Dashboard from "./Dashboard";
import GridView from "./GridView";
import Modal from "../components/Modal";
import { MODAL_HEADER } from "../settings/content";
import { usePathFindingDispatchContext } from "../contexts/PathFindingContext";
import { Description } from "./Description";

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatchPath = usePathFindingDispatchContext();

  return (
    <div className="bg-slate-900 text-white">
      <div className="mx-auto max-w-6xl">
        <Description />
        <Dashboard setModalIsOpen={setModalIsOpen} />
        <GridView />
      </div>
      {modalIsOpen && (
        <Modal
          closeModalFunction={() => {
            dispatchPath({
              type: "RESET_PATH",
            });
            setModalIsOpen(false);
          }}
          title={MODAL_HEADER}
          confirmLabel={"Reset"}
        />
      )}
    </div>
  );
}

export default App;
