import React, { useEffect } from 'react';
import "./modal.css";

function Modal({ type, modalClassName, setTaskModalOpen }) {

  const closeModal = () => setTaskModalOpen(false);

  const handleOutsideClick = (e) => {
    if (e.target.className.includes("modal-bg")) {
      setTaskModalOpen(false);
    }
  };

  const handleSubmitEdit = () => console.log("Editing task..");

  useEffect(() => {
    document.addEventListener("keydown", closeModal)
    return () => document.removeEventListener("keydown", closeModal);
  });

  return (
    <div className={`${modalClassName}-bg modal-bg`} onClick={handleOutsideClick}>
      <div className={`${modalClassName} modal-open`}>
        <div className="close-modal-button" onClick={closeModal}>✕</div>
        <form className="inner-modal-container" onSubmit={handleSubmitEdit}>
          <h2>Edit {type}</h2>
          <input type="text" />
        </form>
      </div>
    </div>
  );
}

export default Modal;