import { type Dispatch, type SetStateAction } from "react";
import "../../styles/Dashboard.css";
import { usePathFindingContext } from "../../contexts/PathFindingContext";
import { SelectTexture } from "./SelectTexture";
import { SelectTerrain } from "./SelectTerrain";
import { ActionButton } from "./ActionButton";
import { SelectStartButton } from "./SelectStartButton";
import { SelectEndButton } from "./SelectEndButton";

const Dashboard = ({
  setModalIsOpen,
}: {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { isPathFinderActive } = usePathFindingContext();

  return (
    <div className="dashboard">
      <SelectStartButton disabled={isPathFinderActive} />
      <SelectEndButton disabled={isPathFinderActive} />
      <SelectTexture disabled={isPathFinderActive} />
      <SelectTerrain disabled={isPathFinderActive} />
      <ActionButton setModalIsOpen={setModalIsOpen} />
    </div>
  );
};

export default Dashboard;
