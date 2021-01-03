import React from "react";
import "./header.css";
import SignOut from "./SignOut";

const Header = (props) => {
  return (
    <div className="header">
      <h1>To Do</h1>
      <SignOut />
    </div>
  );
};

export default Header;