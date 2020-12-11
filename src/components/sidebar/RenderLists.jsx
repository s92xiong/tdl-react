import React from "react";

const RenderLists = ({ array, changeList }) => {
  return array.map((element, i) => {
    return (
      <li 
        key={i} 
        data-index={i}
        className="list-category-title"
        onClick={changeList}
      >
        {element}
      </li>
    );
  });
};

export default RenderLists;