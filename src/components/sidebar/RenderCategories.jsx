import React from "react";

const RenderCategories = ({ array, changeCategory }) => {
  return array.map((element, i) => {
    return (
      <li 
        key={i} 
        data-index={i}
        onClick={changeCategory}
      >
        {element}
      </li>
    );
  });
};

export default RenderCategories;