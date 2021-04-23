import React from 'react';
import getActiveCategory from '../logic/getActiveCategory';

function ContentHeader({ categorySelected, handleDeleteCategory, categories }) {
  const activeCategory = getActiveCategory(categories, "getName");

  if (categorySelected && categories.length >= 1) {
    return (
      <div className="content-header">
        <h2>{activeCategory}</h2>
        { (activeCategory) ? <i onClick={handleDeleteCategory} className="fa fa-trash trash-icon"></i> : <></> }
      </div> 
    );
  }

  return (
    <div className="content-header">
      <h2>You have no lists!</h2>
    </div>
  );
}

export default ContentHeader;