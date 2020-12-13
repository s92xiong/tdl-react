import React from 'react';
import "./inputTask.css";

function InputTask({ taskValue, setTaskValue, submitTask }) {

  const handleChange = (e) => setTaskValue(e.target.value);

  return (
    <form onSubmit={submitTask}>
      <input 
        type="text"
        className="input-field-task"
        placeholder="Add a task.."
        maxLength="60"
        value={taskValue}
        onChange={handleChange}
      />
    </form>
  );
}

export default InputTask;
