import React from 'react'

function TaskInput({ submitTask, taskInputState, handleTaskInput }) {
  return (
    <div className="task-input">
      <form onSubmit={submitTask}>
        <input 
            type="text" 
            placeholder="Add a task.." 
            value={taskInputState}
            onChange={handleTaskInput}
            maxLength="70"
          />
      </form>
    </div>
  )
}

export default TaskInput;