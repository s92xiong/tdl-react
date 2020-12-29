import React from "react";
import "./styles/content.css";
import getActiveCategory from "../logic/getActiveCategory";
import ContentHeader from "./ContentHeader";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";

const Content = ({ categorySelected, handleDeleteCategory, categories,
  submitTask, taskInputState, handleTaskInput, checkCircle, deleteTask
  }) => {
  
    return (
    <div className="content">
      <ContentHeader 
        categorySelected={categorySelected}
        activeCategory={getActiveCategory(categories, "getName")}
        handleDeleteCategory={handleDeleteCategory}
        categories={categories}
      />

      <TaskInput 
        categorySelected={categorySelected}
        submitTask={submitTask}
        taskInputState={taskInputState}
        handleTaskInput={handleTaskInput}
      />

      <TaskList 
        categories={categories}
        categorySelected={categorySelected}
        checkCircle={checkCircle}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default Content;