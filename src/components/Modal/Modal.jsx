import React, { useEffect } from 'react';
import "./modal.css";

function Modal({ type, modalClassName, setModalOpen, inputToEdit, setInputToEdit, handleSubmitEdit }) {

  const closeModal = () => setModalOpen(false);
  const pressEsc = (e) => (e.key === "Escape") && closeModal();
  const handleOutsideClick = (e) => (e.target.className.includes("modal-bg")) && setModalOpen(false);

  useEffect(() => {
    document.addEventListener("keydown", pressEsc);
    return () => document.removeEventListener("keydown", pressEsc);
  });

  const handleOnChange = (e) => {
    setInputToEdit({ 
      ...inputToEdit,
      name: e.target.value
    });
  };

  if (!inputToEdit) return <></>;
  return (
    <div className={`${modalClassName}-bg modal-bg`} onClick={handleOutsideClick}>
      <div className={`${modalClassName} modal-open`}>
        <div className="close-modal-button" onClick={closeModal}>✕</div>
        <form className="inner-modal-container" onSubmit={handleSubmitEdit}>
          <h3>Edit {type}</h3>
          <input 
            type="text"
            placeholder="Edit name"
            maxLength="76"
            value={inputToEdit.name}
            onChange={handleOnChange}
          />
        </form>
      </div>
    </div>
  );
}

export default Modal;