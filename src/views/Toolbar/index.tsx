import { ActionButton } from "./ActionButton";
import { FlexRowSpacer } from "@components/FlexRowSpacer";
import { SelectEndButton } from "./SelectEndButton";
import { SelectStartButton } from "./SelectStartButton";
import { SelectTerrain } from "./SelectTerrain";
import { SelectTexture } from "./SelectTexture";
import { usePathFindingContext } from "@contexts/PathFindingContext";

export const Toolbar = () => {
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
      <ActionButton />
    </div>
  );
};
