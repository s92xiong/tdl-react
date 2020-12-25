import React from 'react'

function ContentHeader({ categorySelected, activeCategory, handleDeleteCategory, trashBin, categories }) {
  if (categorySelected) {
    return (
      <div className="content-header">
        <h2>{activeCategory}</h2>
        <img
          onClick={handleDeleteCategory}
          className="trash-icon" 
          src={trashBin} alt=""
        />
      </div> 
    );
  } else {
    return (
      <div className="content-header">
        { (categories.length < 1) ? <h2>You have no lists!</h2> : <h2>Click on a list.</h2> }
      </div>
    );
  }
}

export default ContentHeader;