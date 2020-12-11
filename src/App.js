import React, { useRef, useState } from 'react';
import './App.css';
import Content from './components/content/Content';
import eventHandlers from './components/handlers/eventHandlers';
import Header from './components/header/Header.jsx';
import Sidebar from './components/sidebar/Sidebar';

function App() {
  const [categorySelected, setCategorySelected] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const inputFieldRef = useRef();

  const { 
    addNewCategory,
    changeCategory, 
    deleteCategory 
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