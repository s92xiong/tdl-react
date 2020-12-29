import React from 'react';
import "./styles/taskInput.css";

function TaskInput({ categorySelected, submitTask, taskInputState, handleTaskInput }) {
  if (categorySelected) {
    return (
      <div className="task-input">
        <form onSubmit={submitTask}>
          <input 
              type="text" 
              placeholder="Add a task.." 
              value={taskInputState}
              onChange={handleTaskInput}
              maxLength="76"
            />
        </form>
      </div>
    )
  } else {
    return <div></div>
  }
}

export default TaskInput;