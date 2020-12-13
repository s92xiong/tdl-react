import React, { useEffect, useReducer, useState } from 'react';
import './App.css';
import eventHandlers from './components/logic/eventHandlers';
import Header from './components/header/Header.jsx';
import Sidebar from './components/sidebar/Sidebar.jsx';
import Content from './components/content/Content.jsx';
import reducerCategory from './components/logic/reducerCategory';

function App() {
  
  const [categories, setCategories] = useReducer(reducerCategory, [], () => {
    // Get categories from localStorage if it exists, else use an empty array
    const localData = localStorage.getItem("categories");
    return (localData) ? JSON.parse(localData) : [];
  });

  const [categorySelected, setCategorySelected] = useState(false);
  const [categoryValue, setCategoryValue] = useState("");
  const [currentCategory, setCurrentCategory] = useState("");
  const [taskValue, setTaskValue] = useState("");


  // Access eventHandler methods
  const { 
    addCategory, changeCategory, deleteCategory, submitTask,
  } = eventHandlers(
    categories, setCategories, 
    categoryValue, setCategoryValue, 
    setCategorySelected,
    currentCategory, setCurrentCategory, 
    taskValue, setTaskValue, 
  );

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);
  
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
          setTaskValue={setTaskValue}
          submitTask={submitTask}
          taskValue={taskValue}
        />
      </div>
    </div>
  );
}

export default App;