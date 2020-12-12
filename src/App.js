import React, { useReducer, useState } from 'react';
import './App.css';
import eventHandlers from './components/logic/eventHandlers';
import Header from './components/header/Header.jsx';
import Sidebar from './components/sidebar/Sidebar.jsx';
import Content from './components/content/Content.jsx';
import reducerCategory from './components/logic/reducerCategory';

function App() {

  const [categorySelected, setCategorySelected] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("");
  const [inputFieldCategory, setInputFieldCategory] = useState("");

  const [categories, setCategories] = useReducer(reducerCategory, []);

  // Access eventHandler methods
  const { 
    addNewCategory, changeCategory, deleteCategory 
  } = eventHandlers(
    categories, setCategories, setCategorySelected, inputFieldCategory, setInputFieldCategory, currentCategory, setCurrentCategory
  );
  
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Sidebar 
          setInputFieldCategory={setInputFieldCategory}
          addCategory={addNewCategory} 
          categoryName={inputFieldCategory}
          categories={categories}
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