import React from "react";

const RenderCategories = ({ categories, changeCategory }) => {
  return categories.map((category, i) => {
    return (
      <li 
        key={i}
        name={category.name}
        onClick={changeCategory}
      >
        {category.name}
      </li>
    );
  })
};

export default RenderCategories;