import React from "react";

const RenderCategories = ({ array, changeCategory }) => {
  return array.map((element, i) => {
    return (
      <li
        className={(element.active) ? "li-category li-category-active" : "li-category"}
        key={i} 
        data-id={element.id}
        onClick={changeCategory}
      >
        {element.name}
      </li>
    );
  });
};

export default RenderCategories;