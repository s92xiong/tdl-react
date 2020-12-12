import React from "react";
import "./content.css";
import ContentHeader from "./ContentHeader";

const Content = ({ categorySelected, currentCategory, handleDeleteCategory, categories }) => {
  return (
    <div className="content">
      <ContentHeader 
        categorySelected={categorySelected}
        currentCategory={currentCategory}
        handleDeleteCategory={handleDeleteCategory}
        categories={categories}
      />
    </div>
  );
};

export default Content;