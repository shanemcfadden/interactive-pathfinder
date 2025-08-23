import { type PropsWithChildren, useCallback, useState } from "react";
import { ModalContext } from "@contexts/ModalContext";

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
