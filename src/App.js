import React, { useRef, useState } from 'react';
import './App.css';
import Content from './components/content/Content';
import Header from './components/header/Header.jsx';
import Sidebar from './components/sidebar/Sidebar';

function App() {
  const [isListSelected, setListSelected] = useState(false);
  const [currentList, setCurrentList] = useState({});
  const [listCategory, setListCategory] = useState([]);
  const inputCategoryRef = useRef();

  const addNewList = (e) => {
    e.preventDefault();
    setListCategory([...listCategory, inputCategoryRef.current.value]);
    inputCategoryRef.current.value = "";
  };

  const changeList = (e) => {
    setListSelected(true);
    const newObj = {...currentList};
    newObj.name = e.target.textContent;
    newObj.index = Number(e.target.getAttribute('data-index'));
    setCurrentList(newObj);
  };

  const deleteList = (e) => {
    const newArray = [...listCategory];
    newArray.splice(currentList.index, 1);
    setListCategory(newArray);
    setCurrentList({});
    setListSelected(false);
  };

  return (
    <div className="App">
      <Header />
      <div className="container">
        <Sidebar 
          handleSubmit={addNewList} 
          handleRef={inputCategoryRef}
          setListCategory={setListCategory}
          array={listCategory}
          changeList={changeList}
        />
        <Content
          currentList={currentList.name}
          listCategory={listCategory}
          isListSelected={isListSelected}
          handleDeleteList={deleteList}
        />
      </div>
    </div>
  );
}

export default App;