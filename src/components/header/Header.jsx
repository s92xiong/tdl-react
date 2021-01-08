import React from "react";
import "./styles/header.css";
import SignOut from "./SignOut";
import { FaBars } from "react-icons/fa";

const Header = ({ openSidebar }) => {
  return (
    <div className="header">
      <h1>To Do</h1>
      <FaBars className="bars" onClick={openSidebar} />
      <SignOut />
    </div>
  );
};

export default Header;