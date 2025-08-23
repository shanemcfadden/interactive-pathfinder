import { type ChangeEventHandler, useCallback, useMemo } from "react";
import { Select, type SelectOption } from "@components/Select";
import {
  usePathFindingContext,
  usePathFindingDispatchContext,
} from "@contexts/PathFindingContext";
import { SAMPLE_TERRAINS } from "@constants";
import { useUserActionDispatchContext } from "@contexts/UserActionContext";

export const SelectTerrain = ({ disabled }: { disabled: boolean }) => {
  const dispatchUserAction = useUserActionDispatchContext();
  const dispatchPath = usePathFindingDispatchContext();
  const { sampleTerrain } = usePathFindingContext();

  const handleSampleTerrainChange: ChangeEventHandler<HTMLSelectElement> =
    useCallback(
      (e) => {
        e.preventDefault();
        dispatchUserAction({
          type: "NO_ACTION",
        });

        const terrainKeyOrNone = e.target.value;
        const newTerrain = SAMPLE_TERRAINS.find(
          ({ key }) => key === terrainKeyOrNone,
        );

        if (newTerrain) {
          dispatchPath({
            type: "USE_SAMPLE_TERRAIN",
            terrain: newTerrain,
          });
        }
      },
      [dispatchPath, dispatchUserAction],
    );

  const options: SelectOption[] = useMemo(
    () => [
      { label: "-", value: "none" },
      ...SAMPLE_TERRAINS.map(({ displayText, key }) => ({
        label: displayText,
        value: key,
      })),
    ],
    [],
  );

  return (
    <Select
      id="select-terrain"
      data-testid="select-terrain"
      disabled={disabled}
      label="Sample Terrains"
      onChange={handleSampleTerrainChange}
      options={options}
      value={sampleTerrain == null ? "none" : sampleTerrain}
    />
  );
};
