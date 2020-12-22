import React, { useEffect, useReducer, useState } from 'react';
import reducer from './components/logic/reducer';
import eventHandlers from './components/logic/eventHandlers';
import Header from './components/header/Header.jsx';
import Sidebar from './components/sidebar/Sidebar.jsx';
import Content from './components/content/Content.jsx';

import './App.css';

function App() {
  
  // Get categories from localStorage if it exists, else use an empty array
  const [categories, setCategory] = useReducer(reducer, [], () => {
    const localData = localStorage.getItem("categories");
    return (localData) ? JSON.parse(localData) : [];
  });

  const [categoryValue, setCategoryValue] = useState(""); // Category input field
  const [categorySelected, setCategorySelected] = useState(false); // Regulate UI rendering
  const [currentCategory, setCurrentCategory] = useState(""); // Renders current category that is active
  const [taskValue, setTaskValue] = useState(""); // for input field

  const { 
    // Access eventHandler methods
    addCategory, changeCategory, deleteCategory, submitTask,
  } = eventHandlers(
    categories, setCategory, 
    categoryValue, setCategoryValue, 
    setCategorySelected,
    currentCategory, setCurrentCategory,
    taskValue, setTaskValue,
  );

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
    console.table(categories);
  }, [categories]);

  const handleChange = (e) => setTaskValue(e.target.value);

  // YOUR NEXT STEPS:
    // (1) Submitting a task: use reducerCategory component to add a task to the taskList
      // (1.1) taskList should be an array
      // (1.2) Write a function that will add tasks with given props
    // (2) Render all tasks within each category, tasks per category should be in their own div
    // (3) The only task div that should be displayed is the one with the category currently active
  
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Sidebar 
          categories={categories}
          categoryValue={categoryValue}
          setCategoryValue={setCategoryValue}
          addCategory={addCategory} 
          changeCategory={changeCategory}
        />
        <Content
          // Categories props
          currentCategory={currentCategory}
          categories={categories}
          categorySelected={categorySelected}
          deleteCategory={deleteCategory}
          // Tasks props
          handleChange={handleChange}
          submitTask={submitTask}
          taskValue={taskValue}
        />
      </div>
    </div>
  );
}

export default App;