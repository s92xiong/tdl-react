import React from "react";
import RenderCategories from "./RenderCategories";
import "./sidebar.css";

const Sidebar = ({ setInputFieldCategory, addCategory, categoryName, categories, changeCategory }) => {
  
  const handleChange = (e) => setInputFieldCategory(e.target.value);

  return (
    <div className="sidebar">
      <form onSubmit={addCategory}>
        <input 
          className="input-category" 
          type="text" 
          placeholder="Add a list.."
          maxLength="35"
          value={categoryName}
          onChange={handleChange}
        />
      </form>
      <div className="list-categories">
        <ul>
          <RenderCategories 
            categories={categories} 
            changeCategory={changeCategory}
          />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;