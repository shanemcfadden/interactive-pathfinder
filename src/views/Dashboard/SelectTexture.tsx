import { useCallback, useMemo, type ChangeEventHandler } from "react";
import {
  useUserActionContext,
  useUserActionDispatchContext,
} from "../../contexts/UserActionContext";
import {
  TEXTURES_ARRAY,
  TextureWeight,
  type TextureWeightValue,
} from "../../settings/textures";
import { Select, type SelectOption } from "../../components/Select";

export const SelectTexture = ({ disabled }: { disabled: boolean }) => {
  const userAction = useUserActionContext();
  const dispatchUserAction = useUserActionDispatchContext();

  const currentTexture = useMemo(() => {
    if (
      userAction.type === "APPLY_TEXTURE" ||
      userAction.type === "PREPARE_APPLY_TEXTURE"
    ) {
      return userAction.texture;
    }
    return null;
  }, [userAction]);

  const onChange: ChangeEventHandler<HTMLSelectElement> = useCallback(
    (e) => {
      e.preventDefault();

      const newValue = e.target.value === "none" ? null : +e.target.value;

      const isTextureWeight = (
        value: number | null,
      ): value is TextureWeightValue =>
        Object.values(TextureWeight).includes(value as TextureWeightValue);

      if (isTextureWeight(newValue)) {
        dispatchUserAction({
          type: "PREPARE_APPLY_TEXTURE",
          texture: newValue,
        });
      } else {
        dispatchUserAction({
          type: "NO_ACTION",
        });
      }
    },
    [dispatchUserAction],
  );

  const options: SelectOption[] = useMemo(
    () => [
      { label: "-", value: "none" },
      ...TEXTURES_ARRAY.map(({ weight, name, difficulty }) => ({
        label: `${name} (${difficulty})`,
        value: weight.toString(),
      })),
    ],
    [],
  );

  return (
    <Select
      id="select-texture"
      label="Draw Texture:"
      value={currentTexture == null ? "none" : currentTexture.toString()}
      disabled={disabled}
      onChange={onChange}
      options={options}
    />
  );
};
