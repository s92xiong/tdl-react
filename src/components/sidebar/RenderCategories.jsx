import React from "react";
import { auth } from "../../firebase";

const RenderCategories = ({ categories, changeCategory }) => {
  return categories.map((category, i) => {
    // Only render categories that belong to the user that is currently signed in
    if (category.userID === auth.currentUser.uid) {
      return (
        <li
          className={(category.active) ? "li-category li-category-active" : "li-category"}
          key={i} 
          data-id={category.id}
          onClick={changeCategory}
        >
          {category.name}
        </li>
      );
    } else {
      return null;
    }
  });
};

export default RenderCategories;