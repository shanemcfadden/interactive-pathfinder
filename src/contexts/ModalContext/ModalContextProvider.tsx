import { useState, useCallback, type PropsWithChildren } from "react";
import { ModalContext } from "./context";

export const ModalContextProvider = ({ children }: PropsWithChildren) => {
  const [isModalOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
