import React from 'react';
import 'styles/Modal.css';

const Modal = ({
  closeModalFunction,
  title,
  content,
  confirmLabel,
  onConfirmFunction,
  onConfirmFunctionArgs = [],
}) => {
  const completeOnConfirmFunction = onConfirmFunction
    ? () => {
        onConfirmFunction(...onConfirmFunctionArgs);
        closeModalFunction();
      }
    : undefined;
  return (
    <>
      <div
        className="modal__overlay modal__overlay--accent-color modal__overlay--translucent"
        onClick={() => closeModalFunction()}
      ></div>
      <div className="modal__content-box">
        <h3>{title}</h3>
        <p>{content}</p>
        <div className="flex-container--row flex-container--content-flex-end">
          <button className="button" type="button" onClick={closeModalFunction}>
            {onConfirmFunction ? 'Cancel' : 'OK'}
          </button>
          {onConfirmFunction && (
            <button
              className="button"
              type="button"
              onClick={completeOnConfirmFunction}
            >
              {confirmLabel}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;
