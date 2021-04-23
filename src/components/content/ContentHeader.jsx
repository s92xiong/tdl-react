import React from 'react';
import getActiveCategory from '../logic/getActiveCategory';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';

function ContentHeader({ categorySelected, handleDeleteCategory, categories }) {
  const activeCategory = getActiveCategory(categories, "getName");

  if (categorySelected && categories.length >= 1) {
    return (
      <div className="content-header">
        <h2>{activeCategory}</h2>
        { 
          (activeCategory) ? 
          <div style={{marginTop: "3px"}}>
            <FaRegEdit size={19} className="trash-icon" />
            <FaRegTrashAlt size={19} onClick={handleDeleteCategory} className="trash-icon" />
          </div>
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