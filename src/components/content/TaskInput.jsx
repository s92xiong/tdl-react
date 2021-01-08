import React from 'react';
import "./styles/taskInput.css";

function TaskInput({ categorySelected, submitTask, taskInputState, handleTaskInput, clearCompleted }) {
  if (categorySelected) {
    return (
      <div className="task-input">
        <form onSubmit={submitTask}>
          <input 
              type="text" 
              placeholder="＋ Add a task" 
              value={taskInputState}
              onChange={handleTaskInput}
              maxLength="76"
            />
        </form>
        <button onClick={clearCompleted}>Clear Completed</button>
      </div>
    )
  } else {
    return <></>
  }
}

export default TaskInput;