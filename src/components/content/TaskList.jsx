import React from 'react';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import getActiveCategory from '../logic/getActiveCategory';
import "./styles/taskList.css";

function TaskList({ categories, categorySelected, completeTask, deleteTask, openTaskModal }) {

  const index = getActiveCategory(categories, "getIndex");
  
  // Only render the tasks if they are defined
  if (categories[index] && categorySelected) {
    return (
      <div className="task-list">
        {
          categories[index].tasks.map((task, i) => {
            // console.log(task, i);
            return (
              <div className="task-item" key={i}>
                <div className="left-div-task">
                  <i 
                    className={(task.complete) ? "fa fa-check-circle check-complete" : "fa fa-check-circle"}
                    onClick={completeTask}
                    data-index={i}
                  ></i>
                  <p className={(task.complete) ? "paragraph-complete" : "paragraph"}>{task.taskName}</p>
                </div>
                <div className="right-div-task">
                  <FaRegEdit className="task-icon" onClick={openTaskModal(task)} />
                  <FaRegTrashAlt onClick={deleteTask(task.id)} className="task-icon trash-icon" />
                </div>
              </div>
            );
          })
        }
      </div>
    );
  } else {
    return <></>;
  }
}

export default TaskList;
