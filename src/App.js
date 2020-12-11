import React, { useRef, useState } from 'react';
import './App.css';
import eventHandlers from './components/handlers/eventHandlers';
import Header from './components/header/Header.jsx';
import Sidebar from './components/sidebar/Sidebar.jsx';
import Content from './components/content/Content.jsx';

function App() {
  
  // Initialize state
  const [categorySelected, setCategorySelected] = useState(false);
  const [categories, setCategories] = useState([ "Work", "Documentation", "Exercise", "Groceries" ]);
  const [currentCategory, setCurrentCategory] = useState({});
  
  // Obtain a reference to the input field to submit new categories
  const inputFieldRef = useRef();

  // Get access to methods from eventHandlers.js via destructuring
  const { 
    addNewCategory, changeCategory, deleteCategory 
  } = eventHandlers(categories, setCategories, setCategorySelected, inputFieldRef, currentCategory, setCurrentCategory);

  return (
    <div className="App">
      <Header />
      <div className="container">
        <Sidebar 
          handleSubmit={addNewCategory} 
          handleRef={inputFieldRef}
          array={categories}
          changeCategory={changeCategory}
        />
        <Content
          currentCategory={currentCategory}
          categories={categories}
          categorySelected={categorySelected}
          handleDeleteCategory={deleteCategory}
        />
      </div>
    </div>
  );
}

export default App;