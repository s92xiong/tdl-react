import React from "react";
import "./styles/content.css";
import ContentHeader from "./ContentHeader";
import InputTask from "./InputTask";

const Content = ({ 
  categorySelected, currentCategory, deleteCategory, categories, 
  handleChange, submitTask, taskValue }) => {

  return (
    <div className="content">
      <ContentHeader 
        categorySelected={categorySelected}
        currentCategory={currentCategory}
        deleteCategory={deleteCategory}
        categories={categories}
      />
      <InputTask
        taskValue={taskValue}
        handleChange={handleChange}
        submitTask={submitTask}
      />
    </div>
  );
};

export default Content;