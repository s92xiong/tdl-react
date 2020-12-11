import React from "react";
import "./content.css";
import trashBin from "../../images/delete.png";

const Content = ({ categorySelected, currentCategory, handleDeleteCategory, categories }) => {
  return (
    <div className="content">
      {
        (categorySelected) ?
        <div className="content-header">
          <h2>{currentCategory.name}</h2>
          <img
            onClick={handleDeleteCategory}
            className="trash-icon" 
            src={trashBin} alt=""
          />
        </div> 
        :
        <div className="content-header">
          { (categories.length < 1) ? <h2>You have no lists!</h2> : <h2>Click on a list.</h2> }
        </div>
      }
    </div>
  );
};

export default Content;