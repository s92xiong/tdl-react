import React from "react";
import RenderCategories from "./RenderCategories";
import "./styles/sidebar.css";

const Sidebar = ({ handleSubmit, setCategoryInput, categoryInput, array, changeCategory }) => {

  const handleCategoryInput = (e) => setCategoryInput(e.target.value);

  return (
    <div className="sidebar">
      <form onSubmit={handleSubmit}>
        <input 
          className="input-category" 
          type="text" 
          placeholder="＋ New list" 
          value={categoryInput}
          onChange={handleCategoryInput}
          maxLength="30"
        />
      </form>
      <div className="list-categories">
        <ul>
          <RenderCategories array={array} changeCategory={changeCategory} />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;