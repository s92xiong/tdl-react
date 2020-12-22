import React from "react";
import RenderCategories from "./RenderCategories";
import "./styles/sidebar.css";

const Sidebar = ({ categories, categoryValue, setCategoryValue, addCategory, changeCategory }) => {
  
  const handleChange = (e) => setCategoryValue(e.target.value);

  return (
    <div className="sidebar">
      <form onSubmit={addCategory}>
        <input 
          className="input-category" 
          type="text" 
          placeholder="Add a list.."
          maxLength="35"
          value={categoryValue}
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