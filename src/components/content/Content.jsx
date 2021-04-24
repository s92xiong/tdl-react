import React from "react";
import "./styles/content.css";
import ContentHeader from "./ContentHeader";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";

const Content = ({ categorySelected, handleDeleteCategory, categories, submitTask,
  taskInputState, handleTaskInput, completeTask, deleteTask, clearCompleted, openTaskModal, openListModal
}) => {
    
    return (
    <div className="content">
      <ContentHeader 
        categorySelected={categorySelected}
        handleDeleteCategory={handleDeleteCategory}
        categories={categories}
        openListModal={openListModal}
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
        openTaskModal={openTaskModal}
      />
    </div>
  );
};

export default Content;