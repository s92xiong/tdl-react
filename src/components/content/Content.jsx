import React from "react";
import "./styles/content.css";
import trashBin from "../../images/delete.png";
import getActiveCategory from "../logic/getActiveCategory";
import ContentHeader from "./ContentHeader";
import TaskInput from "./TaskInput";

const Content = ({ categorySelected, handleDeleteCategory, categories,
  submitTask, taskInputState, handleTaskInput
  }) => {
  
    return (
    <div className="content">
      <ContentHeader 
        categorySelected={categorySelected}
        activeCategory={getActiveCategory(categories, "getName")}
        handleDeleteCategory={handleDeleteCategory}
        trashBin={trashBin}
        categories={categories}
      />

      <TaskInput 
        submitTask={submitTask}
        taskInputState={taskInputState}
        handleTaskInput={handleTaskInput}
      />
    </div>
  );
};

export default Content;