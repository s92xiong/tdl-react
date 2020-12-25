import React from "react";

const RenderCategories = ({ array, changeCategory }) => {
  return array.map((element, i) => {
    return (
      <li 
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