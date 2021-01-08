import React from "react";
import RenderCategories from "./RenderCategories";
import "./styles/sidebar.css";
// import { FaBars } from "react-icons/fa";

const Sidebar = ({ handleSubmit, setCategoryInput, categoryInput, categories, changeCategory, sidebarOpen }) => {

  const handleCategoryInput = (e) => setCategoryInput(e.target.value);

  return (
    <div className={sidebarOpen ? "sidebar sidebar-open" : "sidebar"}>
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
          <RenderCategories categories={categories} changeCategory={changeCategory} />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;