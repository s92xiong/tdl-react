import React from "react";
import "./content.css";
import ContentHeader from "./ContentHeader";
import InputTask from "./InputTask";

const Content = ({ 
  categorySelected, currentCategory, deleteCategory, categories, 
  setTaskValue, submitTask, taskValue }) => {

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
        setTaskValue={setTaskValue}
        submitTask={submitTask}
      />
    </div>
  );
};

export default Content;