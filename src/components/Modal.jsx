import React from 'react';
import 'styles/Modal.css';

const Modal = ({ closeModalFunction, title, content, confirmLabel = 'OK' }) => {
  return (
    <>
      <div
        className="modal__overlay modal__overlay--accent-color modal__overlay--translucent"
        onClick={() => closeModalFunction()}
      ></div>
      <div className="content-box modal__content-box light-theme">
        <h3 className="centered-text">{title}</h3>
        {content && <p>{content}</p>}
        <button
          className="dashboard__button"
          type="button"
          onClick={closeModalFunction}
        >
          {confirmLabel}
        </button>
      </div>
    </>
  );
};

export default Modal;
