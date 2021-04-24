import React, { useState } from "react";
import { auth } from "../../firebase";
import OutsideClickHandler from "react-outside-click-handler";
import "./styles/signOut.css";

function SignOut() {
  
  // Initialize variable state to determine if the SignOut modal is open/close
  const [modalOpen, setModalOpen] = useState(false);

  // Event handlers to open/close modal
  const openModal = () => setModalOpen(!modalOpen);
  const closeModal = (e) => (e.target.className !== "sign-out-modal") && setModalOpen(false);
  
  const signOut = () => {
    setModalOpen(false);
    auth.signOut();
  };

  // Don't show a sign out button if user is not signed in
  if (auth.currentUser) {
    return (
      <div className="sign-out">
        <p>{auth.currentUser.displayName}</p>
        <OutsideClickHandler onOutsideClick={closeModal}>
          <img src={auth.currentUser.photoURL} onClick={openModal} alt="" className="user-icon" />
        </OutsideClickHandler>
        { (modalOpen) && <div className="sign-out-modal" onClick={signOut}>Sign Out</div> }
      </div>
    );
  } else {
    return (
      <></>
    );
  }
}

export default SignOut;