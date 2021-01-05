import React from 'react';

function ContentHeader({ categorySelected, activeCategory, handleDeleteCategory, categories }) {
  if (categorySelected) {
    return (
      <div className="content-header">
        <h2>{activeCategory}</h2>
        <i
          onClick={handleDeleteCategory}
          className="fa fa-trash trash-icon" 
          aria-hidden="true"
        ></i>
      </div> 
    );
  } else {
    return (
      <div className="content-header">
        {/* If there are no documents/categories, then execute the code below */}
        { (categories.length < 1) ? <h2>You have no lists!</h2> : <h2>Click on a list</h2> }
      </div>
    );
  }
}

export default ContentHeader;