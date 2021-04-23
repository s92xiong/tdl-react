import React from 'react';
import getActiveCategory from '../logic/getActiveCategory';
import { FaTrashAlt } from 'react-icons/fa';

function ContentHeader({ categorySelected, handleDeleteCategory, categories }) {
  const activeCategory = getActiveCategory(categories, "getName");

  if (categorySelected && categories.length >= 1) {
    return (
      <div className="content-header">
        <h2>{activeCategory}</h2>
        { 
          (activeCategory) ? 
          <FaTrashAlt size={19} className="fa fa-trash trash-icon" />
          :
          <></>
        }
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