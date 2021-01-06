import React from "react";
import "./styles/header.css";
import SignOut from "./SignOut";

const Header = () => {
  return (
    <div className="header">
      <h1>To Do</h1>
      <SignOut />
    </div>
  );
};

export default Header;