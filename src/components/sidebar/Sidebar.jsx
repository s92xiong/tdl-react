import React from "react";
import RenderCategories from "./RenderCategories";
import "./styles/sidebar.css";

<<<<<<< HEAD
const Sidebar = ({ categories, categoryValue, setCategoryValue, addCategory, changeCategory }) => {
  
  const handleChange = (e) => setCategoryValue(e.target.value);
=======
const Sidebar = ({ handleSubmit, setCategoryInput, categoryInput, categories, changeCategory }) => {

  const handleCategoryInput = (e) => setCategoryInput(e.target.value);
>>>>>>> 669f3b3

  return (
    <div className="sidebar">
      <form onSubmit={addCategory}>
        <input 
          className="input-category" 
          type="text" 
<<<<<<< HEAD
          placeholder="Add a list.."
          maxLength="35"
          value={categoryValue}
          onChange={handleChange}
=======
          placeholder="＋ New list" 
          value={categoryInput}
          onChange={handleCategoryInput}
          maxLength="30"
>>>>>>> 669f3b3
        />
      </form>
      <div className="list-categories">
        <ul>
<<<<<<< HEAD
          <RenderCategories 
            categories={categories} 
            changeCategory={changeCategory}
          />
=======
          <RenderCategories categories={categories} changeCategory={changeCategory} />
>>>>>>> 669f3b3
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;