import { useState, type Dispatch, type SetStateAction } from "react";
import { FindPathButton } from "./FindPathButton";
import { CancelPathButton } from "./CancelPathButton";
import { ResetPathButton } from "./ResetPathButton";

export const ActionButton = ({
  setModalIsOpen,
}: {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [currentInterval, setCurrentInterval] = useState<number | null>(null);
  const [findPathButton, setFindPathButton] = useState<
    "findPath" | "reset" | "cancel"
  >("findPath");

  switch (findPathButton) {
    case "findPath":
      return (
        <FindPathButton
          setCurrentInterval={setCurrentInterval}
          setModalIsOpen={setModalIsOpen}
          setFindPathButton={setFindPathButton}
        />
      );
    case "cancel":
      return (
        <CancelPathButton
          currentInterval={currentInterval}
          setCurrentInterval={setCurrentInterval}
          setFindPathButton={setFindPathButton}
        />
      );
    case "reset":
      return <ResetPathButton setFindPathButton={setFindPathButton} />;
  }
};
