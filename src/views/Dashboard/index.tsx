import { type Dispatch, type SetStateAction } from "react";
import { usePathFindingContext } from "../../contexts/PathFindingContext";
import { SelectTexture } from "./SelectTexture";
import { SelectTerrain } from "./SelectTerrain";
import { ActionButton } from "./ActionButton";
import { SelectStartButton } from "./SelectStartButton";
import { SelectEndButton } from "./SelectEndButton";
import { FlexRowSpacer } from "../../components/FlexRowSpacer";

const Dashboard = ({
  setModalIsOpen,
}: {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { isPathFinderActive } = usePathFindingContext();

  return (
    <div className="flex justify-between items-center my-4">
      <SelectStartButton disabled={isPathFinderActive} />
      <FlexRowSpacer />
      <SelectEndButton disabled={isPathFinderActive} />
      <FlexRowSpacer />
      <SelectTexture disabled={isPathFinderActive} />
      <FlexRowSpacer />
      <SelectTerrain disabled={isPathFinderActive} />
      <FlexRowSpacer auto />
      <ActionButton setModalIsOpen={setModalIsOpen} />
    </div>
  );
};

export default Dashboard;
