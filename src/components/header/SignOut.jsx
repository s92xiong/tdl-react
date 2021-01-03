import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { auth } from "../../firebase";
import "./signOut.css";

function SignOut() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(!modalOpen);
  const closeModal = (e) => (e.target.className !== "modal") && setModalOpen(false);
  const signOut = () => {
    setModalOpen(false);
    auth.signOut();
  };

  if (auth.currentUser) {
    return (
      <div className="sign-out">
        <p>{auth.currentUser.displayName}</p>
        <OutsideClickHandler onOutsideClick={closeModal}>
          <img src={auth.currentUser.photoURL} onClick={openModal} alt="" className="user-icon"/>
        </OutsideClickHandler>
        {
          (modalOpen) &&
          <div className="modal" onClick={signOut}>Sign Out</div>
        }
      </div>
    );
  } else {
    return (
      <></>
    )
  }
}

export default SignOut;