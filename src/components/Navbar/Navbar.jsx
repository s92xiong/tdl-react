import React from "react";
import "./styles/navbar.css";
import SignOut from "./SignOut";
import { FaBars, FaTimes } from "react-icons/fa";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = ({ openSidebar, sidebarOpen }) => {

  const [user] = useAuthState(auth);

  return (
    <div className="header">
      <h1>To Do</h1>
      { 
        (user) && 
        (sidebarOpen) ? <FaTimes size={32} className="sidebar-icon" onClick={openSidebar} />
        :
        <FaBars size={30} className="bars sidebar-icon" onClick={openSidebar} />
      }
      <SignOut />
    </div>
  );
};

export default Navbar;