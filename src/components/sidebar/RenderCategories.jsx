import React from "react";
import { auth } from "../../firebase";

const RenderCategories = ({ categories, changeCategory }) => {
  return categories.map((category, i) => {
<<<<<<< HEAD
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
=======
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
>>>>>>> 669f3b3
};

export default RenderCategories;