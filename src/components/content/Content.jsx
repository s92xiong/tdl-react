import React from "react";
import "./content.css";
import trashBin from "../../images/delete.png";

const Content = ({ isListSelected, currentList, handleDeleteList, listCategory }) => {
  return (
    <div className="content">
      {
        (isListSelected) ?
        <div className="content-header">
          <h2>{currentList}</h2>
          <img
            onClick={handleDeleteList}
            className="trash-icon" 
            src={trashBin} alt=""
          />
        </div> 
        :
        <div className="content-header">
          { (listCategory.length < 1) ? <h2>You have no lists!</h2> : <h2>Click on a list</h2> }
        </div>
      }
    </div>
  );
};

export default Content;