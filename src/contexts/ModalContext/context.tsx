import { createContext, useContext } from "react";

export const ModalContext = createContext({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export const useModalContext = () => {
  return useContext(ModalContext);
};
