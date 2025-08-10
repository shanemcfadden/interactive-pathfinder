import { useCallback } from "react";
import { useModalContext } from "../contexts/ModalContext/context";
import Button from "./Button";
import { Card } from "./Card";

const Modal = ({
  onCloseModal = () => {},
  title,
  content,
  confirmLabel = "OK",
}: {
  onCloseModal?: () => void;
  title: string;
  content?: string;
  confirmLabel?: string;
}) => {
  const { isModalOpen, closeModal } = useModalContext();

  const close = useCallback(() => {
    onCloseModal();
    closeModal();
  }, [onCloseModal, closeModal]);

  return (
    <>
      {isModalOpen && (
        <>
          <div
            className="w-screen h-screen fixed top-0 left-0 bg-black opacity-50 z-100"
            onClick={close}
          />
          <div className="m-auto fixed top-0 left-0 right-0 bottom-0 h-fit max-h-9/10 w-1/2 z-110">
            <Card>
              <h3 className="text-center">{title}</h3>
              {content && <p>{content}</p>}
              <div className="flex justify-end">
                <Button onClickFn={close}>{confirmLabel}</Button>
              </div>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
