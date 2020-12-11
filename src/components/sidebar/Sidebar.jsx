import React from "react";
import RenderLists from "./RenderLists";
import "./sidebar.css";

const Sidebar = ({ handleSubmit, handleRef, array, changeCategory }) => {
  return (
    <div className="sidebar">
      <form onSubmit={handleSubmit}>
        <input 
          className="input-category" 
          type="text" 
          placeholder="Add a list.." 
          ref={handleRef}
          maxLength="30"
        />
      </form>
      <div className="list-categories">
        <ul>
          <RenderLists 
            array={array} 
            changeCategory={changeCategory}
          />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;