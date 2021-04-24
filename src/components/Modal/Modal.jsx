import React, { useEffect } from 'react';
import "./modal.css";

function Modal({ type, modalClassName, setTaskModalOpen, taskToEdit, setTaskToEdit, handleSubmitEdit }) {

  const closeModal = () => setTaskModalOpen(false);
  const pressEsc = (e) => (e.key === "Escape") && closeModal();

  const handleOutsideClick = (e) => {
    if (e.target.className.includes("modal-bg")) {
      setTaskModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", pressEsc);
    return () => document.removeEventListener("keydown", pressEsc);
  });

  const handleOnChange = (e) => {
    setTaskToEdit({ 
      ...taskToEdit,
      taskName: e.target.value
    });
  };

  if (!taskToEdit) return <></>;
  return (
    <div className={`${modalClassName}-bg modal-bg`} onClick={handleOutsideClick}>
      <div className={`${modalClassName} modal-open`}>
        <div className="close-modal-button" onClick={closeModal}>✕</div>
        <form className="inner-modal-container" onSubmit={handleSubmitEdit}>
          <h3>Edit {type}</h3>
          <input 
            type="text"
            placeholder="Edit task name"
            maxLength="76"
            value={taskToEdit.taskName}
            onChange={handleOnChange}
          />
        </form>
      </div>
    </div>
  );
}

export default Modal;