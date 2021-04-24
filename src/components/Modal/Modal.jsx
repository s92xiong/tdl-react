import React from 'react';
import "./modal.css";

function Modal({ type, modalClassName, setTaskModalOpen, editInput, taskToEdit, handleSubmitEdit }) {

  const closeModal = () => setTaskModalOpen(false);

  const handleOutsideClick = (e) => {
    if (e.target.className.includes("modal-bg")) {
      setTaskModalOpen(false);
    }
  };

  // useEffect(() => {
  //   document.addEventListener("keydown", closeModal)
  //   return () => document.removeEventListener("keydown", closeModal);
  // });

  const handleOnChange = (e) => {
    editInput({ 
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
          <h2>Edit {type}</h2>
          <input type="text" value={taskToEdit.taskName} onChange={handleOnChange} />
        </form>
      </div>
    </div>
  );
}

export default Modal;