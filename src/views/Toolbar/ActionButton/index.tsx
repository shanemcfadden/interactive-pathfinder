import { CancelPathButton } from "./CancelPathButton";
import { FindPathButton } from "./FindPathButton";
import { ResetPathButton } from "./ResetPathButton";
import { useState } from "react";

export const ActionButton = () => {
  const [currentInterval, setCurrentInterval] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [findPathButton, setFindPathButton] = useState<
    "findPath" | "reset" | "cancel"
  >("findPath");

  switch (findPathButton) {
    case "findPath":
      return (
        <FindPathButton
          setCurrentInterval={setCurrentInterval}
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
