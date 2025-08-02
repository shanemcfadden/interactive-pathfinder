import Button from "./Button";
import "../styles/Modal.css";

const Modal = ({
  closeModalFunction,
  title,
  content,
  confirmLabel = "OK",
}: {
  closeModalFunction: () => void;
  title: string;
  content?: string;
  confirmLabel?: string;
}) => (
  <>
    <div
      className="modal__overlay modal__overlay--accent-color modal__overlay--translucent"
      onClick={() => closeModalFunction()}
    ></div>
    <div className="content-box modal__content-box light-theme">
      <h3 className="centered-text">{title}</h3>
      {content && <p>{content}</p>}
      <Button onClickFn={closeModalFunction}>{confirmLabel}</Button>
    </div>
  </>
);

export default Modal;
