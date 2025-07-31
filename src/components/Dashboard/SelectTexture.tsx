import { useCallback, useMemo, type ChangeEventHandler } from 'react';
import {
  useUserActionContext,
  useUserActionDispatchContext,
} from '../../contexts/UserActionContext';
import {
  TEXTURES_ARRAY,
  TextureWeight,
  type TextureWeightValue,
} from '../../settings/textures';

export const SelectTexture = ({ disabled }: { disabled: boolean }) => {
  const userAction = useUserActionContext();
  const dispatchUserAction = useUserActionDispatchContext();

  const currentTexture = useMemo(() => {
    if (
      userAction.type === 'APPLY_TEXTURE' ||
      userAction.type === 'PREPARE_APPLY_TEXTURE'
    ) {
      return userAction.texture;
    }
    return null;
  }, [userAction]);

  const onChange: ChangeEventHandler<HTMLSelectElement> = useCallback(
    (e) => {
      e.preventDefault();

      const newValue = e.target.value === 'none' ? null : +e.target.value;

      const isTextureWeight = (
        value: number | null,
      ): value is TextureWeightValue =>
        Object.values(TextureWeight).includes(value as TextureWeightValue);

      if (isTextureWeight(newValue)) {
        dispatchUserAction({
          type: 'PREPARE_APPLY_TEXTURE',
          texture: newValue,
        });
      } else {
        dispatchUserAction({
          type: 'NO_ACTION',
        });
      }
    },
    [dispatchUserAction],
  );

  return (
    <>
      <label htmlFor="select-texture">Draw Texture:</label>
      <select
        id="select-texture"
        value={currentTexture == null ? 'none' : currentTexture.toString()}
        onChange={onChange}
        disabled={disabled}
      >
        <option value="none">-</option>
        {TEXTURES_ARRAY.map(({ weight, name, difficulty }) => (
          <option key={name} value={weight}>
            {name} ({difficulty})
          </option>
        ))}
      </select>
    </>
  );
};
