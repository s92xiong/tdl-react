import React from "react";

const RenderCategories = ({ categories, changeCategory }) => categories.map((category, i) => (
  <li 
    key={i}
    name={category.name}
    onClick={changeCategory}
  >
    {category.name}
  </li>
));

export default RenderCategories;