import React from 'react';
import "./styles/inputTask.css";

function InputTask({ taskValue, handleChange, submitTask }) {

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
