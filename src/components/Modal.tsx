import Button from "./Button";

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
      className="w-screen h-screen fixed top-0 left-0 bg-black opacity-50 z-100"
      onClick={() => closeModalFunction()}
    ></div>
    <div className="rounded-md m-auto p-4 fixed top-0 left-0 right-0 bottom-0 h-fit max-h-9/10 max-w-1/2 z-110 bg-white text-black">
      <h3 className="text-center">{title}</h3>
      {content && <p>{content}</p>}
      <div className="float-right">
        <Button onClickFn={closeModalFunction}>{confirmLabel}</Button>
      </div>
    </div>
  </>
);

export default Modal;
