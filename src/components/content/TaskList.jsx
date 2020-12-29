import React from 'react';
import getActiveCategory from '../logic/getActiveCategory';
import "./styles/taskList.css";

function TaskList({ categories, categorySelected, checkCircle }) {

  const index = getActiveCategory(categories, "getIndex");
  
  // Only render the tasks if they are defined
  if (categories[index] && categorySelected) {
    return (
      <div className="task-list">
        {
          categories[index].tasks.map((task, i) => (
            <div className="task-item" key={i}>
              <div className="left-div-task">
                <i 
                  className={
                    (task.complete) ? "fa fa-check-circle check-complete" : "fa fa-check-circle"
                  }
                  onClick={checkCircle}
                  data-index={i}
                ></i>
                <p className={
                  (task.complete) ? "paragraph-complete" : "paragraph"
                }
                >{task.taskName}</p>
              </div>
              <div className="right-div-task">
                <i className="fa fa-edit edit-icon-task" aria-hidden="true"></i>
                <i className="fa fa-trash trash-icon-task" aria-hidden="true"></i>
              </div>
            </div>
          ))
        }
      </div>
    )
  } else {
    return <div className="empty-div"></div>
  }
}

export default TaskList;
