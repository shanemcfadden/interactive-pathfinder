import { useCallback, type ChangeEventHandler } from 'react';
import { useUserActionDispatchContext } from '../contexts/UserActionContext';
import { SAMPLE_TERRAINS } from '../settings/terrains';
import {
  usePathFindingContext,
  usePathFindingDispatchContext,
} from '../contexts/PathFindingContext';

export const SelectTerrain = ({ disabled }: { disabled: boolean }) => {
  const dispatchUserAction = useUserActionDispatchContext();
  const dispatchPath = usePathFindingDispatchContext();
  const { sampleTerrain } = usePathFindingContext();

  const handleSampleTerrainChange: ChangeEventHandler<HTMLSelectElement> =
    useCallback(
      (e) => {
        e.preventDefault();
        dispatchUserAction({
          type: 'NO_ACTION',
        });

        const terrainKeyOrNone = e.target.value;
        const newTerrain = SAMPLE_TERRAINS.find(
          ({ key }) => key === terrainKeyOrNone,
        );

        if (newTerrain) {
          dispatchPath({
            type: 'USE_SAMPLE_TERRAIN',
            terrain: newTerrain,
          });
        }
      },
      [dispatchPath, dispatchUserAction],
    );

  return (
    <>
      <label htmlFor="select-sample">Sample Terrains:</label>
      <select
        id="select-sample"
        value={sampleTerrain == null ? 'none' : sampleTerrain}
        onChange={handleSampleTerrainChange}
        disabled={disabled}
      >
        <option value="none">-</option>
        {SAMPLE_TERRAINS.map(({ displayText, key }) => (
          <option value={key} key={key}>
            {displayText}
          </option>
        ))}
      </select>
    </>
  );
};
