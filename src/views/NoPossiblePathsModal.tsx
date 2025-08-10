import { Heading } from "../components/Heading";
import Modal from "../components/Modal";
import { usePathFindingDispatchContext } from "../contexts/PathFindingContext/context";

export const NoPossiblePathsModal = () => {
  const dispatchPath = usePathFindingDispatchContext();

  return (
    <Modal
      confirmLabel={"Reset"}
      onCloseModal={() => {
        dispatchPath({
          type: "RESET_PATH",
        });
      }}
    >
      <Heading>There are no possible paths!</Heading>
    </Modal>
  );
};
