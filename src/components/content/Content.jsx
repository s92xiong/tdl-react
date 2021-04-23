import React from "react";
import "./styles/content.css";
import ContentHeader from "./ContentHeader";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";

const Content = ({ categorySelected, handleDeleteCategory, categories, submitTask,
  taskInputState, handleTaskInput, completeTask, deleteTask, clearCompleted, editTask }) => {
    
    return (
    <div className="content">
      <ContentHeader 
        categorySelected={categorySelected}
        handleDeleteCategory={handleDeleteCategory}
        categories={categories}
      />

      <TaskInput 
        categories={categories}
        categorySelected={categorySelected}
        submitTask={submitTask}
        taskInputState={taskInputState}
        handleTaskInput={handleTaskInput}
        clearCompleted={clearCompleted}
      />

      <TaskList 
        categories={categories}
        categorySelected={categorySelected}
        completeTask={completeTask}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    </div>
  );
};

export default Content;